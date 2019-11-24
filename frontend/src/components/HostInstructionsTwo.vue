<template>
    <div class="container">
        <div>
            <h1>Host Instructions Step Two</h1>
        </div>
        <div>
            <ul>
                <li v-for='challenger in letterMask' v-bind:key='challenger'>
                    {{challenger.challengerLetter}} ----------> {{challenger.challengerNumber}}
                </li>
            </ul>
        </div>
        <button @click='startMelee'>Enter Flavordome</button>
    </div>
</template>

<script>
export default {
    name:'HostInstructionsTwo',
    
    data: () => {
        return {
        challengersToMask:[]
        }
    },

    methods:{
        startMelee: function() {
            this.$store.commit('changeScene',"MeleeRating")
        }
    },

    created(){
        this.letterMask = this.$store.state.letterMask.slice()
    }
}
</script>

<style scoped>

</style>