<template>
    <div class="block2" v-if="details.ID">
        <div class="block2__heading-container">
            <h2>{{$t("block2.heading", [`${details.name}`])}} </h2>
        </div>
        <div class="block2__info-wrappper content-container content-container--padded content-container--right">
            <div class="block2__column" >
                <div class="block2__row" v-for="key in keys1" :key="key">
                    <p>{{$t(`block2.${key}`)}}</p>
                     <p v-if="key=='country'"> {{$t(`block2.countryCroatia`)}} </p>
                    <p v-else>{{details[key] ? details[key] : $t(`block2.no_info`)}}</p>
                </div>
                
            </div>
            <div class="block2__column">
                <div class="block2__row" v-for="key in keys2" :key="key">
                    <p>{{$t(`block2.${key}`)}}</p>
                    <p v-if="key=='phone'"> <a :href="`tel:${details[key]}`">{{details[key] ? details[key] : $t(`block2.no_info`)}} </a></p>
                    <p v-else-if="key=='email'"><a :href="`mailto:${details[key]}`">{{details[key] ? details[key] : $t(`block2.no_info`)}} </a></p>
                    <p v-else-if="key=='web'"><a :href="`${details[key]}`">{{details[key] ? details[key] : $t(`block2.no_info`)}} </a></p>
                    <p v-else >{{details[key] ? details[key] : $t(`block2.no_info`)}}</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import EventBus from '../event-bus';
export default {
    props: {
        keys1:{
            type: Array,
            default: ()=> ['governor', 'viceGovernor', 'address', 'zipCode', 'country']
        },
        keys2: {
            type: Array,
            default: ()=> ['web', 'email', 'phone', 'fax'] 
        }
    },
    mounted () {
        EventBus.$on('details_update', this.updateData)
    },
    data() {
        return {
            details: {}
        }
    },
    methods: {
        updateData(details) {
            this.details = details
        }
    },
    computed: {
       
    }
}
</script>

<style>

</style>