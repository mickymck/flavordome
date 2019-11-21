<template>

<div class='head-to-head-container'>
    <div id='slider-value'>
        score: {{ score }}
    </div>
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
    <div class='slider'>
        <input type="range" min="0" max="10" value="5" id="matchupRating" @input="log">
    </div>
    <div class='semis-submit-div' v-if='round <= 3'>
        <button id="submit-h2h-button" @click="advanceRound">Submit</button>
    </div>
</div>
    
</template>

<script>

import ChallengerCard from './ChallengerCard.vue'

export default {
    name: "HeadToHead",

    components: {
        ChallengerCard,
    },

    props: [

    ],

    data: () => {
        return {
            challengers: [],
            round: 1,
            score: ''
        }
    },

    methods: {
        draftChallenger() {
            const index = Math.floor(Math.random()*this.challengers.length)
            const challenger = this.challengers.splice(index,1)
            return challenger[0]
        },
        advanceRound() {
            this.round += 1
        },
        log({target}) {
            this.score = target.value
        }
    },

    created:function(){
        this.challengers = this.$store.getters.getTopFour
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