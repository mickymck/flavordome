<template>

<div class='head-to-head-container'>
    <div class='challengers-container'>
        <div class='h2h-container' v-if='round === 1'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="challenger1"/>
                <ChallengerCard v-bind:challenger="challenger2"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='submit-div'>
                <button id="submit-h2h-button" @click="addScores(challenger1, challenger2)">Submit</button>
            </div>
        </div>
        <div class='h2h-container' v-if='round === 2'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="challenger3"/>
                <ChallengerCard v-bind:challenger="challenger4"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='submit-div'>
                <button id="submit-h2h-button" @click="addScores(challenger3, challenger4)">Submit</button>
            </div>
        </div>
        <div class='h2h-container' v-if='round === 3'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="finalist1"/>
                <ChallengerCard v-bind:challenger="finalist2"/>
            </div>
            <h1>Choose Your Champion</h1>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='semis-submit-div' v-if='round <= 3'>
                <button id="submit-h2h-button" @click="addScores(finalist1, finalist2)">Submit</button>
            </div>
        </div>
        <div class='champ-container' v-if='round === 4'>
            <strong>Your champion is</strong>
            <strong>{{ champion[0].challenger }}</strong>
        </div>
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
            leftScore: null,
            rightScore: null,
            finalists: [],
            champion: []
        }
    },

    methods: {

        draftChallenger() {
            const index = Math.floor(Math.random()*this.challengers.length)
            const challenger = this.challengers.splice(index,1)
            return challenger[0]
        },

        compileScores({target}) {
            this.leftScore = 10 - target.value
            this.rightScore = parseInt(target.value)
        },

        advanceRound() {
            this.round += 1
        },

        advanceWinners() {
            if (this.round === 2) {
                let sortedChallengers = this.challengers.sort((a, b) => (b.semiAvg - a.semiAvg))
                this.finalists = sortedChallengers.slice(0,2)

                this.finalist1 = this.finalists[0]
                this.finalist2 = this.finalists[1]
            }

            if (this.round === 3) {
                let sortedFinalists = this.finalists.sort((a, b) => (b.champAvg - a.champAvg))
                this.champion = sortedFinalists.slice(0,1)
            }
            return
        },

        addScores(challengerA, challengerB) {
            challengerA.semiScores.push(this.leftScore)
            challengerA.semiAvg = challengerA.semiScores.reduce((a, b) => a+b, 0)/challengerA.semiScores.length
            this.challengers.push(challengerA)

            challengerB.semiScores.push(this.rightScore)
            challengerB.semiAvg = challengerB.semiScores.reduce((a, b) => a+b, 0)/challengerB.semiScores.length
            this.challengers.push(challengerB)

            this.advanceWinners()

            this.advanceRound()
        }
    },

    created:function(){
        this.challengers = this.$store.getters.getTopFour
        this.challenger1 = this.draftChallenger()
        this.challenger2 = this.draftChallenger()
        this.challenger3 = this.draftChallenger()
        this.challenger4 = this.draftChallenger()
        // this.currentChallengers = [this.challenger1, this.challenger2]
    }
}
</script>

<style scoped>

.h2h-container {
    display: flex;
    flex-direction: column;
}

.challengers-container {
    display: flex;
    flex-direction: column;
    margin: 150px auto 150px auto;
    width: 90%;
    max-width: 800px;
}

.challenger-cards {
    display: flex;
    justify-content: space-between;
}

</style>