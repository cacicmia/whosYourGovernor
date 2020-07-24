<template>
    <div class="block1 content-container content-container--padded">
        <div class="block1__heading-container">
            <h1>{{$t("block1.heading1")}} <b>{{$t("block1.heading2")}}</b></h1>
        </div>
        <div class="block1__flex-container">
            <div class="block1__form-container">
                <div class="block1__input-fields-container">
                    <label for="county">{{$t('block1.county_label')}}</label>
                    
                    <Select2 ref="countyValue" v-model="countyValue" :settings="countySelectSettings" id="county" name="county" @change="changecounty" :key="`county-${townTrigger}`" />
                    <label for="town">{{$t('block1.town_label')}}</label>
                    <Select2 ref="townValue" v-model="townValue" :settings="townSelectSettings" @select="townUpdate" id="town" name="town" :key="`town${countyTrigger}`"/>
                </div>
                <div class="form__button-container">
                    <button class="btn btn-primary">
                        {{$t('block1.submit_button_text')}}
                    </button>
                </div>
            </div>
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
export default {
    components: {
        Select2
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
            countyFromTown: '',
            townValue: [],
            countyTrigger: false,
            townTrigger: false,
            // countyURL: this.initialListURL,
            // townURL:this.initialListURL,
            countyOptions: [],
            detailsUrl: this.initialDetailsUrl
            // la.search = 'v=1&z=2'
        }
    }, 
    methods: {
        fetchCountyOptions(search, loading) {
            let vm = this
            let url = this.countyURL
            axios.get(url).then((response) => {
                vm.countyOptions = response.data.counties.map((county)=> ({
                    id: county.ID,
                    text: county.name  
                }
                ))
                console.log(response.data)
            }).catch(err=>console.log(err))
            //check vue axios
        },
        changecounty(e) {
            console.log(e)
        },
 
       
        townUpdate(newValue) {
            this.countyFromTown = newValue.countyID
            this.countyValue = [newValue.countyID]
            // this.countyValue.push(newValue.countyID)
            // console.log(this.countyValue, $(this.$refs.countyValue))
            // this.countyTriggerFlag = true; 
            // $(this.$refs.countyValue).find('input').trigger('change')
        },
        
    },
    mounted() {
        console.log( this.$root.$options);
        // this.fetchCountyOptions()
    },
    computed: {
        
        countyURL() {
            let url = this.initialListURL;
            url = url.concat('?entityType=1')
            return url
        },
      
        countySelectSettings() {
            let term = ''
            const vm = this
            const settings = {
                minimumResultsForSearch: -1,
                escapeMarkup: markup => markup,
                placeholder: this.$root.$options.i18n.t('block1.county_placeholder'),
                multiple: true,
                maximumSelectionLength: 1,
                ajax: {
                url: this.countyURL,
                    data: function (params) {
                        term = params.term
                        return '';
                    },
                   
                    processResults: function(data){
                        let results= data.counties.map((county)=> ({
                                id: county.ID,
                                text: county.name  
                            }
                            ))
                            results = results.sort((a, b)=>a.text.localeCompare(b.text))
                           
                            if (term){
                                results = results.filter((result=>result.text.toLowerCase().includes(term.toLowerCase())))
                            }
                            if (vm.townValue.length){
                                results = results.map(result=>{
                                    console.log('processresults county',result.id == vm.countyFromTown )
                                    if (result.id == vm.countyFromTown){
                                        return {
                                            ...result,
                                            selected: true
                                        }
                                    } else {
                                        return result
                                    }
                                }) 
                            }
                        return {
                            results: results
                        }
                    }
                }

            }
            return settings
        },
        townSelectSettings() {
            let term =''
            const vm = this
            let settings = {
                minimumResultsForSearch: -1,
                escapeMarkup: markup => markup,
                placeholder: this.$root.$options.i18n.t('block1.town_placeholder'),
                multiple: true,
                maximumSelectionLength: 1,
                ajax: {
                    url: this.initialListURL,
                    data: function (params) {
                        term = params.term
                        return '';
                    },
                    processResults: function(data){                        
                        let results = data.towns.concat(data.communities)
                        results = results.map((entity)=> ({
                                id: entity.ID,
                                text: entity.name,
                                countyID: entity.countyID

                                }
                            ))
                        results = results.sort((a, b)=>a.text.localeCompare(b.text)) 
                        if (vm.countyValue.length){
                            results = results.filter(result=>result.countyID == vm.countyValue[0])
                        }
                        if (term){
                            results = results.filter(result=>result.text.toLowerCase().includes(term.toLowerCase()))
                        }
                        return {
                            results: results
                        }
                    }
                }, 
            }
            return settings
        }
    }
}
</script>
