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
        <button id="submit-h2h-button" @click="scoreMatchup(rating)">Submit</button>
        <!-- <button id="submit-h2h-button" @click="advanceRound">Submit</button> -->
    </div>
</div>
    
</template>

<script>

import ChallengerCard from './ChallengerCard.vue'

const challengers = [
    {name: 'beer', rating: 0},
    {name: 'water', rating: 0},
    {name: 'milk', rating: 0},
    {name: 'gin', rating: 0}
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
            round: 1,
            score: ''
        }
    },

    methods: {
        draftChallenger() {
            const challenger1 = challengers[Math.floor(Math.random()*challengers.length)]
            challengers.splice(challengers.indexOf(challenger1), 1)
            console.log(challenger1)
            return challenger1
        },
        advanceRound() {
            this.round += 1
        },
        log({target}) {
            this.score = target.value
            console.log(score)
            return score
        }
    },

    created:function(){
        this.challenger1 = this.draftChallenger()
        this.challenger2 = this.draftChallenger()
        this.challenger3 = this.draftChallenger()
        this.challenger4 = this.draftChallenger()
        this.getSliderValue()
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