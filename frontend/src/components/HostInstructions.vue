<template>
    <div class="container">
        <div>
            <h1>Host Instructions</h1>
        </div>
        <div>
            <ul>
                <li v-for='challenger in challengersToMask' v-bind:key='challenger.challenger'>
                    {{challenger.challenger}} ----------> {{challenger.challengerNumber}}
                </li>
            </ul>
        </div>
        <button @click='instructionsStepTwo'>Step Two</button>
    </div>
</template>

<script>
export default {
    name:'HostInstructions',
    
    data: () => {
        return {
        challengersToMask:[]
        }
    },

    methods:{
        instructionsStepTwo: function() {
            this.$store.commit('changeScene',"HostInstructionsTwo")
        }
    },

    created(){
        this.challengersToMask = this.$store.getters.getChallengersByNumber
    }
}
</script>

<style scoped>

</style>