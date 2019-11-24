<template>
    <div class="container">
        <div>
            <h1>Host Instructions</h1>
        </div>
        <div>
            <ul>
                <li v-for='challenger in challengersToMask' v-bind:key='challenger'>
                    {{challenger.challengerNumber}} ----------> {{challenger.challenger}}
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
        this.challengersToMask = this.$store.state.numberMask.slice()
    }
}
</script>

<style scoped>

</style>