<template>
    <div class="block1 content-container content-container--padded">
        <div class="block1__heading-container">
            <h1>{{$t("block1.heading1")}} <b>{{$t("block1.heading2")}}</b></h1>
        </div>
        <div class="block1__flex-container">
            <form class="block1__form-container">
                <div class="block1__input-fields-container">
                    <label for="county">{{$t('block1.county_label')}}</label>
                    
                    <Select2 ref="countyValue" v-model="countyValue" :settings="countySelectSettings" :options="countyOptions" @change="changeCounty" id="county" name="county" :required="true" />
                    <label for="town">{{$t('block1.town_label')}}</label>
                    <Select2 ref="townValue" v-model="townValue" :settings="townSelectSettings" :options="townOptions" @select="townUpdate" id="town" name="town" :required="true"/>
                </div>
                <div class="block1__button-container">
                    <button class="btn btn-primary" @click="submitData">
                        {{$t('block1.submit_button_text')}}
                    </button>
                </div>
            </form>
            <div class="block1__svg-container">
                <div class="block1__svg-background"></div>
            </div>
        </div>
      </div>
</template>

<script>
import $ from "jquery";
import Select2 from 'v-select2-component';
import axios from 'axios'
import EventBus from '../event-bus';
export default {
    components: {
        Select2, 
        EventBus
    },
    props: {
        initialListURL: {
            type: String,
            default: 'https://tehcon.com.hr/api/CroatiaTownAPI/list.php'
        },
        initialDetailsUrl: {
            type: String,
            default: 'https://tehcon.com.hr/api/CroatiaTownAPI/details.php'
        }
    },
    data() {
        return {
            countyValue: [],
            townValue: [],
            detailsUrl: this.initialDetailsUrl,
            // la.search = 'v=1&z=2'
            countyOptions: [],
            townOptions: [],
            entityType: '',
            entityID: '',
            detailsData: {}
            
        }
    }, 
    methods: {
        initOptions() {
            let vm = this
            axios.get(this.initialListURL)
            .then(response => {
                let countyResults =  response.data.counties.map((county)=> ({
                        id: county.ID,
                        text: county.name  
                    })
                )
                countyResults =  countyResults.sort((a, b)=>a.text.localeCompare(b.text))
                vm.countyOptions = countyResults
                
                let townResults = response.data.towns.concat(response.data.communities)
                townResults = townResults.map((entity)=> ({
                        id: `${entity.ID}-${entity.name}`,
                        text: entity.name,
                        entityID: entity.ID,
                        countyID: entity.countyID,
                        entityType: entity.entityType

                        }
                    ))
                townResults =  townResults.sort((a, b)=>a.text.localeCompare(b.text))
                vm.townOptions =  townResults
            }).catch(err=>console.log(err))
        },

        changeCounty(value) {
            if (!value.length){
                this.townValue = []
            }
            
        },
 
        townUpdate(newValue) {
            if (!this.countyValue.length){
                this.countyValue = [newValue.countyID]
            }
            if (newValue.entityID){

                this.entityType = newValue.entityType;
                this.entityID = newValue.entityID;
            } else {
                this.entityType = '';
                this.entityID = '';
            }
           
        },  
        submitData(e) {
            e.preventDefault()
            const vm = this
            if (this.entityType && this.entityID){
                let url = this.initialDetailsUrl;
                url =url.concat(`?entityType=${this.entityType}&ID=${this.entityID}`)
                axios.get(url)
                .then(response => {
                    vm.detailsData = response.data
                    vm.emitData()
                })
                .catch(error=> console.error(error))
            }
        },
        emitData() {
            EventBus.$emit('details_update', this.detailsData);
        } 
    },
    mounted() {
        this.initOptions()

        
    },
    computed: {
        
        countySelectSettings() {
            const settings = {
                minimumResultsForSearch: -1,
                escapeMarkup: markup => markup,
                placeholder: this.$root.$options.i18n.t('block1.county_placeholder'),
                multiple: true,
                maximumSelectionLength: 1,
            }
            return settings
        },
        townSelectSettings() {
            const vm = this
            const settings = {
                minimumResultsForSearch: -1,
                escapeMarkup: markup => markup,
                placeholder: this.$root.$options.i18n.t('block1.town_placeholder'),
                multiple: true,
                maximumSelectionLength: 1,
                data: this.townOptions,
                matcher: function(params, data) {
                    if (vm.countyValue.length){
                        if (data.countyID != vm.countyValue[0] ){
                            return null
                        }  
                    }
                    if ($.trim(params.term) === '') {
                        return data;
                    }
                    if (typeof data.text === 'undefined') {
                        return null;
                    }
                    if (data.text.toLowerCase().indexOf(params.term.toLowerCase()) > -1) {
                        return data;
                    }
                    return null;
                }
            }
            return settings
        }
    }
}
</script>
