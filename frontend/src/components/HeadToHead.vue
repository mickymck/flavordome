<template>

<div class='head-to-head-container'>
    <div class='challengers-container'>
        <div class='h2h-container' v-if='round === 1'>
            <ChallengerCard v-bind:challenger="challenger1"/>
            <ChallengerCard v-bind:challenger="challenger2"/>
        </div>
        <div class='h2h-container' v-if='round === 2'>
            <ChallengerCard v-bind:challenger="challenger3"/>
            <ChallengerCard v-bind:challenger="challenger4"/>
        </div>
        <div class='champ-container' v-if='round === 3'>
            <div class='h2h-container'>
                <ChallengerCard />
                <ChallengerCard />
            </div>
            <h1>Choose Your Champion</h1>
        </div>
    </div>
    <div class='semis-submit-div' v-if='round <= 3'>
        <button id="submit-h2h-button" @click="advanceRound">Submit</button>
    </div>
</div>
    
</template>

<script>

import ChallengerCard from './ChallengerCard.vue'

const challengerNames = [
    'beer',
    'water',
    'milk',
    'gin'
]

export default {
    name: "HeadToHead",

    components: {
        ChallengerCard,
    },

    props: [

    ],

    data: () => {
        return {
            challenger1: [],
            challenger2: [],
            challenger3: [],
            challenger4: [],
            round: 1
        }
    },

    methods: {
        draftChallenger() {
            const challenger1 = challengerNames[Math.floor(Math.random()*challengerNames.length)]
            challengerNames.splice(challengerNames.indexOf(challenger1), 1)
            console.log(challenger1)
            return challenger1
        },
        advanceRound() {
            this.round += 1
        }
    },

    created:function(){
        
        this.challenger1 = this.draftChallenger()
        this.challenger2 = this.draftChallenger()
        this.challenger3 = this.draftChallenger()
        this.challenger4 = this.draftChallenger()
    }
}
</script>

<style scoped>

.h2h-container {
    display: flex;
    justify-content: space-between;
    width: 90%;
    max-width: 800px;
    margin: 0 auto;
}

.challengers-container {
    margin: 150px auto 150px auto;
}

.champ-container {
    display: flex;
    flex-direction: column;
    margin-bottom: -87px;
}

</style>