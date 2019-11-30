<template>
    <div class="host-instructions-two-container">
        <div v-show="!friendReadyClicked && !setupComplete">
            <p class='instruction-text'>Now set up note cards nearby with a letter for every number, starting with A. Bring one friend back into the room and...</p>
            <p class='scream-text'>GIVE THAT FRIEND YOUR PHONE</p>
            <p class='instruction-text-dark'>Friend? Tell your host to leave the room for a minute.</p>
            <button id='ready-for-setup' @click='readyForLetterSetup'>Ready</button>
        </div>
        <div v-show="friendReadyClicked && !setupComplete" id='number-to-letter-container'>
            <div>
                <p class='instruction-text'>Move each numbered container to go with the corresponding letter:</p>
                <ul>
                    <li v-for='challenger in letterMask' v-bind:key='challenger.challenger' class='challenger-card' id='number-to-letter-card'>
                        {{challenger.challengerLetter}}) {{challenger.challengerNumber}}
                    </li>
                </ul>
            </div>
            <p class='instruction-text-dark'>Now give that phone back to your host.</p>
            <button @click='finishSetup' id='step-two-complete-button'>Done</button>
        </div>
        <div v-show='setupComplete' class='final-host-message'>
            <h1>BRING YOUR FRIENDS BACK</h1>
            <p class='instruction-text'>Have everybody join the taste test by entering the Taste Test Code:</p>
            <p class='scream-text'>{{this.testCode}}</p>
            <p class='instruction-text-pink'>Current Taste Tester Count: {{this.playerCount}}</p>
            <p class='instruction-text-dark'>Once everybody has joined...</p>
            
            <button v-show='this.letterMask.length >= 4' @click='startMelee' class='enter-flavordome-button'>Enter Flavordome</button>

            <button v-show='this.letterMask.length < 4' @click='straightToHeadToHead' class='enter-flavordome-button-small'>Enter Flavordome</button>
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

        straightToHeadToHead: function() {
            this.$store.commit('setDirectHeadToHead')
            this.$store.commit('changeScene', "HeadToHead")
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

h1 {
    color: white;
    padding-top: 20px;
}

.host-instructions-two-container p {
    margin-top: 0;
}

#number-to-letter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

ul {
    margin: 40px auto 20px auto;
}

#number-to-letter-card {
    display: flex;
    justify-content: space-around;
    width: 50%;
    padding: 5px;
    margin: 0 auto;
}

#step-two-complete-button {
    margin-top: 30px;
}

.enter-flavordome-button {
    margin: 30px auto;
}

</style>