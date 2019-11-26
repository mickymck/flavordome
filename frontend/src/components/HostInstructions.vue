<template>
    <div class="container">
        <div v-show="!readyClicked">
            <h1>Set Up the Taste Test</h1>
            <p>Line up your serving containers (plates, bowls, cups, etc.) and number each one, starting with #1. Now...</p>
            <p class='scream-text'>MAKE EVERYONE LEAVE THE ROOM</p>
            <button id='ready-for-setup' @click='readyForSetup'>Ready</button>
        </div>
        <div v-show="readyClicked">
            <div class='challenger-number-sorting'>
                <p>Here's where to put each of your challengers:</p>
                <ul>
                    <li v-for='challenger in challengersToMask' v-bind:key='challenger.challenger' class='challenger-card'>
                        {{challenger.challengerNumber}}) {{challenger.challenger}}
                    </li>
                </ul>
            </div>
            <button @click='instructionsStepTwo' id='ready-for-step-two-button'>Step Two</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'HostInstructions',
    
    data: () => {
        return {
        challengersToMask:[],
        readyClicked: false
        }
    },

    methods:{
        instructionsStepTwo: function() {
            this.$store.commit('changeScene',"HostInstructionsTwo")
        },

        readyForSetup: function() {
            this.readyClicked = true;
        },
    },

    created(){
        this.challengersToMask = this.$store.getters.getChallengersByNumber
    }
}
</script>

<style scoped>

.challenger-number-sorting {
    width: 90%;
    margin: 20px auto 0 auto;
    text-align: left;
    font-size: 20px;
}

#ready-for-step-two-button {
    margin-top: 20px;
}

</style>