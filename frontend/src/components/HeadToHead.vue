<template>

<div class='head-to-head-container'>
    <div class='challengers-container' id='five-plus-challengers' v-if='this.meleeWinners.length === 4'>
        <div class='h2h-container' v-if='round === 1'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="challenger1"/>
                <ChallengerCard v-bind:challenger="challenger2"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='submit-div'>
                <button id="submit-h2h-button" @click="collectSemiScores(challenger1, challenger2)">Submit</button>
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
                <button id="submit-h2h-button" @click="collectSemiScores(challenger3, challenger4)">Submit</button>
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
            <div class='semis-submit-div'>
                <button id="submit-h2h-button" @click="collectFinalistScores(finalist1, finalist2)">Submit</button>
            </div>
        </div>
        <div class='champ-container' v-if='round === 4'>
            <strong>Your champion is</strong>
            <strong>{{ champion[0].challenger }}</strong>
        </div>
    </div>

    <!-- <div class='challengers-container' id='four-challengers' v-if='this.shortChallengers.length === 4'>
        <div class='h2h-container' v-if='round === 1'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="shortChallenger1"/>
                <ChallengerCard v-bind:challenger="shortChallenger2"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='submit-div'>
                <button id="submit-h2h-button" @click="collectSemiScores(shortChallenger1, shortChallenger2)">Submit</button>
            </div>
        </div>
        <div class='h2h-container' v-if='round === 2'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="shortChallenger3"/>
                <ChallengerCard v-bind:challenger="shortChallenger4"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='submit-div'>
                <button id="submit-h2h-button" @click="collectSemiScores(shortChallenger3, shortChallenger4)">Submit</button>
            </div>
        </div>
        <div class='h2h-container' v-if='round === 3'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="shortChallenger1"/>
                <ChallengerCard v-bind:challenger="shortChallenger3"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='submit-div'>
                <button id="submit-h2h-button" @click="collectSemiScores(shortChallenger1, shortChallenger3)">Submit</button>
            </div>
        </div>
        <div class='h2h-container' v-if='round === 4'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="shortChallenger2"/>
                <ChallengerCard v-bind:challenger="shortChallenger4"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='submit-div'>
                <button id="submit-h2h-button" @click="collectSemiScores(shortChallenger2, shortChallenger4)">Submit</button>
            </div>
        </div>
        <div class='h2h-container' v-if='round === 5'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="shortChallenger1"/>
                <ChallengerCard v-bind:challenger="shortChallenger4"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='submit-div'>
                <button id="submit-h2h-button" @click="collectSemiScores(shortChallenger1, shortChallenger4)">Submit</button>
            </div>
        </div>
        <div class='h2h-container' v-if='round === 6'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="shortChallenger2"/>
                <ChallengerCard v-bind:challenger="shortChallenger3"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='submit-div'>
                <button id="submit-h2h-button" @click="collectSemiScores(shortChallenger2, shortChallenger3)">Submit</button>
            </div>
        </div>
        <div class='champ-container' v-if='round === 7'>
            <strong>Your champion is</strong>
            <strong>{{ champion[0].challenger }}</strong>
        </div>
    </div> -->

    <div class='challengers-container' id='three-challengers' v-if='this.meleeWinners.length === 3'>
        <div class='h2h-container' v-if='round === 1'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="shortChallenger1"/>
                <ChallengerCard v-bind:challenger="shortChallenger2"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='submit-div'>
                <button id="submit-h2h-button" @click="collectShortScores(shortChallenger1, shortChallenger2)">Submit</button>
            </div>
        </div>
        <div class='h2h-container' v-if='round === 2'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="shortChallenger1"/>
                <ChallengerCard v-bind:challenger="shortChallenger3"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='submit-div'>
                <button id="submit-h2h-button" @click="collectShortScores(shortChallenger1, shortChallenger3)">Submit</button>
            </div>
        </div>
        <div class='h2h-container' v-if='round === 3'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="shortChallenger2"/>
                <ChallengerCard v-bind:challenger="shortChallenger3"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='semis-submit-div'>
                <button id="submit-h2h-button" @click="collectShortScores(shortChallenger2, shortChallenger3)">Submit</button>
            </div>
        </div>
        <div class='champ-container' v-if='round === 4'>
            <strong>Your champion is</strong>
            <strong>{{ champion[0].challenger }}</strong>
        </div>
    </div>

    <div class='challengers-container' id='two-challengers' v-if='this.meleeWinners.length === 2'>
        <div class='h2h-container' v-if='round === 1'>
            <div class='challenger-cards'>
                <ChallengerCard v-bind:challenger="shortChallenger1"/>
                <ChallengerCard v-bind:challenger="shortChallenger2"/>
            </div>
            <div class='slider'>
                <input type="range" min="0" max="10" value="5" id="matchupRating" @input="compileScores">
            </div>
            <div class='submit-div'>
                <button id="submit-h2h-button" @click="collectSemiScores(shortChallenger1, shortChallenger2)">Submit</button>
            </div>
        </div>
        <div class='champ-container' v-if='round === 2'>
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
            shortChallengers: [],
            meleeWinners: [],
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

        draftShortChallenger() {
            const index = Math.floor(Math.random()*this.shortChallengers.length)
            const shortChallenger = this.shortChallengers.splice(index,1)
            return shortChallenger[0]
        },

        compileScores({target}) {
            this.leftScore = 10 - target.value
            this.rightScore = parseInt(target.value)
        },

        advanceRound() {

            if (this.meleeWinners.length === 4) {
                if (this.round === 2) {
                    this.resolveSemis()
                    this.finalist1 = this.finalists[0]
                    this.finalist2 = this.finalists[1]
                    this.round += 1
                }
                else if (this.round === 3) {
                    this.resolveFinals()
                    this.round += 1
                }
                else this.round += 1
            }

            if (this.meleeWinners.length === 3) {
                if (this.round === 3) {
                    this.resolveShortChallenge()
                    this.round += 1
                }
                else this.round += 1
                }

            if (this.meleeWinners.length === 2) {
                this.resolveShortChallenge()
                this.round += 1
            }
        },

        collectSemiScores(challengerA, challengerB) {
            challengerA.rating = this.leftScore
            challengerB.rating = this.rightScore

            this.$store.commit('addSemiScores', challengerA)
            this.$store.commit('addSemiScores', challengerB)

            this.challengers.push(challengerA)
            this.challengers.push(challengerB)

            this.advanceRound()
        },

        collectShortScores(challengerA, challengerB) {
            challengerA.rating = this.leftScore
            challengerB.rating = this.rightScore

            this.$store.commit('addSemiScores', challengerA)
            this.$store.commit('addSemiScores', challengerB)

            this.advanceRound()
        },

        collectFinalistScores(finalistA, finalistB) {
            finalistA.rating = this.leftScore
            finalistB.rating = this.rightScore

            this.$store.commit('addFinalistScores', finalistA)
            this.$store.commit('addFinalistScores', finalistB)

            this.advanceRound()
        },

        resolveSemis(){
            this.$store.commit('setFinalists')
            this.finalists = this.$store.getters.getFinalists
        },

        resolveFinals(){
            this.$store.commit('setChampion')
            this.champion = this.$store.getters.getChampion
        },

        resolveShortChallenge(){
            this.$store.commit('setShortChallengeChamp')
            this.champion = this.$store.getters.getChampion
        }
    },

    created:function(){

        this.challengers = this.$store.getters.getTopFour
        if (this.challengers.length === 4) {
            this.challenger1 = this.draftChallenger()
            this.challenger2 = this.draftChallenger()
            this.challenger3 = this.draftChallenger()
            this.challenger4 = this.draftChallenger()
            this.meleeWinners = [this.challenger1, this.challenger2, this.challenger3, this.challenger4]
        }

        this.shortChallengers = this.$store.getters.getChallengersByNumber
            if (this.shortChallengers.length === 3){
                this.shortChallenger1 = this.draftShortChallenger()
                this.shortChallenger2 = this.draftShortChallenger()
                this.shortChallenger3 = this.draftShortChallenger()
                this.meleeWinners = [this.challenger1, this.challenger2, this.challenger3]
            } else if (this.shortChallengers.length === 2){
                this.shortChallenger1 = this.draftShortChallenger()
                this.shortChallenger2 = this.draftShortChallenger()
                this.meleeWinners = [this.challenger1, this.challenger2]
        }
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