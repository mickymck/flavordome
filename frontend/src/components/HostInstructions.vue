<template>
    <div class="host-instructions-container">
        <TutorialModal v-show="modalVisible" @closeModal='closeModal'/>
        <div class='first-instructions'>
            <div v-show="!readyClicked">
                <h1>Taste Test Setup</h1>
                <p class='instruction-text'>Line up your serving containers (plates, bowls, cups) and number each one, starting with #1. Now...</p>
                <p class='scream-text'>MAKE EVERYONE LEAVE THE ROOM</p>
                <button id='ready-for-setup' @click='readyForSetup'>Ready</button>
            </div>
        </div>
        <div v-show="readyClicked">
            <div class='challenger-number-sorting'>
                <p class='instruction-text'>Here's where to put each of your challengers:</p>
                <ul class='numbered-challenger-cards'>
                    <li v-for='challenger in challengersToMask' v-bind:key='challenger.challenger' class='challenger-card'>
                        {{challenger.challenger}} → {{challenger.challengerNumber}}
                    </li>
                </ul>
            </div>
            <button @click='instructionsStepTwo' id='ready-for-step-two-button'>Step Two</button>
            <!-- <button @click='goBeyond'>Beyond</button> -->
        </div>
        <!-- <p class='go-back-text' @click='editChallengers'>Edit Taste Test</p> -->
        <p @click='showModal' class='instruction-text-dark' id='tutorial-link'>Watch the Setup Tutorial?</p>
    </div>
</template>

<script>
import TutorialModal from './TutorialModal.vue'
export default {
    name:'HostInstructions',
    components:{
        TutorialModal
    },
    data: () => {
        return {
            challengersToMask:[],
            readyClicked: false,
            modalVisible: false
        }
    },

    methods:{
        instructionsStepTwo: function() {
            this.$store.commit('changeScene',"HostInstructionsTwo")
        },

        readyForSetup: function() {
            this.readyClicked = true;
        },
        goBeyond: function() {
            this.$store.state.newSocket.send(JSON.stringify({
                method:'changeScene',
                payload:"Beyond"
            }))
        },
        // editChallengers: function() {
        //     this.$store.commit('changeScene', "ContestantsWrapper")
        // },
        closeModal:function(){
            this.modalVisible = false;
        },
        showModal:function(){
            this.modalVisible = true;
        }
    },

    created(){
        this.challengersToMask = this.$store.getters.getChallengersByNumber
    }
}
</script>

<style scoped>

h1 {
    padding-top: 20px;
}

#tutorial-link {
    text-align: right;
    color: #a600d8;
    padding-top: 40px;
    font-size: 18px;
    font-weight: 500;
}

#tutorial-link:hover {
    cursor: pointer;
}

.first-instructions {
    font-size: 20px;
    color: white;
    max-width: 800px;
    margin: 0 auto;
}

.challenger-number-sorting {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    max-width: 800px;
}

.numbered-challenger-cards {
    margin-top: 20px;
}

.number-assignment-text {
    color: white;
    padding-top: 20px;
}

.challenger-number-sorting p {
    margin-top: 0;
}
.challenger-card{
    text-align:center;
}

</style>