<template>
    <div class="container">
        <div v-show="!friendReadyClicked && !setupComplete">
            <p>Now set up note cards nearby with a letter for every number, starting with A. Bring one friend back into the room and...</p>
            <p class='scream-text'>GIVE THAT FRIEND YOUR PHONE</p>
            <p>Friend? Tell your host to leave the room for a minute.</p>
            <button id='ready-for-setup' @click='readyForLetterSetup'>Ready</button>
        </div>
        <div v-show="friendReadyClicked && !setupComplete" id='number-to-letter-container'>
            <div>
                <p>Move each numbered container to go with the corresponding letter:</p>
                <ul>
                    <li v-for='challenger in letterMask' v-bind:key='challenger.challenger' class='challenger-card' id='number-to-letter-card'>
                        {{challenger.challengerLetter}}) {{challenger.challengerNumber}}
                    </li>
                </ul>
            </div>
            <p>Now give that phone back to your host.</p>
            <button @click='finishSetup' id='step-two-complete-button'>Done</button>
        </div>
        <div v-show='setupComplete' class='final-host-message'>
            <p class='scream-text'>IT IS TIME...</p>
            <h2>...for your friends to join!</h2>
            <h1>Your taste test code is:  {{this.testCode}}</h1>
            <div><h3>Current Judge Count: {{this.playerCount}}</h3></div>
            <button @click='startMelee' id='enter-flavordome-button'>Enter The Flavordome</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'HostInstructionsTwo',
    
    data: () => {
        return {
            challengersToMask:[],
            friendReadyClicked: false,
            setupComplete: false,
        }
    },

    methods:{
        startMelee: function() {
            // this.$store.commit('changeScene', "MeleeRating")
            this.$store.state.newSocket.send(JSON.stringify({
                'method':'setupState',
                'payload':this.$store.state
            }))
            this.$store.state.newSocket.send(JSON.stringify({
                'method':'changeScene', 'payload':"MeleeRating"}))
        },

        readyForLetterSetup: function() {
            this.friendReadyClicked = true;
        },

        finishSetup: function() {
            this.setupComplete = true;
        }
    },
    computed:{
        playerCount:function(){
            return this.$store.getters.getPlayerCount
        },
        testCode:function(){
            return this.$store.getters.getRoomNum
        }
    },
    created(){
        this.letterMask = this.$store.state.letterMask.slice()
    }
}
</script>

<style scoped>

#number-to-letter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

ul {
    margin: 40px auto;
}

#number-to-letter-card {
    display: flex;
    justify-content: space-around;
    width: 50%;
    padding: 5px;
    margin: 0 auto;
}

#step-two-complete-button {
    margin-top: 40px;
}

.final-host-message {
    margin-top: 80px;
}

#enter-flavordome-button {
    margin: 80px auto;
}

</style>