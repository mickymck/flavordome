<template>

    <div class='head-to-head-container'>
        <div class='logo-wrapper'>
            <div class='flavordome-logo'></div>
        </div>
        <div class='challengers-container' id='four-plus-challengers' v-if='this.meleeWinners.length === 4'>
            <div class='h2h-container' v-if='round === 1'>
            <p class='matchup-text'>Head to Head Matchup:<br>How much do you prefer {{this.challenger1.challengerLetter}} and {{this.challenger2.challengerLetter}}?</p>
                <div class='challenger-cards'>
                    <div class='left-challenger-section'>
                        <ChallengerCard v-bind:challenger="challenger1"/>
                        <p class='head-to-head-score'>Score: {{ 10 - value }}</p>
                    </div>
                    <p>vs</p>
                    <div class='right-challenger-section'>
                        <ChallengerCard v-bind:challenger="challenger2"/>
                        <p class='head-to-head-score'>Score: {{ value }}</p>
                    </div>
                </div>
                <div class='slider'>
                    <vue-slider v-model='value' :min='0' :max='10' tooltip='none' :interval='0.5' />
                </div>
                <div class='submit-div'>
                    <button id="submit-h2h-button" @click="collectSemiScores(challenger1, challenger2)">Submit</button>
                </div>
            </div>
            <div class='h2h-container' v-if='round === 2'>
            <p class='matchup-text'>Head to Head Matchup:<br>How much do you prefer {{this.challenger3.challengerLetter}} and {{this.challenger4.challengerLetter}}?</p>
                <div class='challenger-cards'>
                    <div class='left-challenger-section'>
                        <ChallengerCard v-bind:challenger="challenger3"/>
                        <p class='head-to-head-score'>Score: {{ 10 - value }}</p>
                    </div>
                    <p>vs</p>
                    <div class='right-challenger-section'>
                        <ChallengerCard v-bind:challenger="challenger4"/>
                        <p class='head-to-head-score'>Score: {{ value }}</p>
                    </div>
                </div>
                <div class='slider'>
                    <vue-slider v-model='value' :min='0' :max='10' tooltip='none' :interval='0.5' />
                </div>
                <div class='submit-div'>
                    <button id="submit-h2h-button" @click="collectSemiScores(challenger3, challenger4)">Submit</button>
                </div>
            </div>
            <div class='h2h-container' v-if='round === 3'>
            <p class='matchup-text'>Head to Head Matchup:<br>How much do you prefer {{this.finalist1.challengerLetter}} and {{this.finalist2.challengerLetter}}?</p>
                <div class='challenger-cards'>
                    <div class='left-challenger-section'>
                        <ChallengerCard v-bind:challenger="finalist1"/>
                        <p class='head-to-head-score'>Score: {{ 10 - value }}</p>
                    </div>
                    <p>vs</p>
                    <div class='right-challenger-section'>
                        <ChallengerCard v-bind:challenger="finalist2"/>
                        <p class='head-to-head-score'>Score: {{ value }}</p>
                    </div>
                </div>
                <h1>Choose Your Champion</h1>
                <div class='slider'>
                    <vue-slider v-model='value' :min='0' :max='10' tooltip='none' :interval='0.5' />
                </div>
                <div class='semis-submit-div'>
                    <button id="submit-h2h-button" @click="collectFinalistScores(finalist1, finalist2)">Submit</button>
                </div>
            </div>
            <div class='champ-container' v-if='round === 4'>
                <Champions></Champions>
                
            </div>
        </div>

        <div class='challengers-container' id='three-challengers' v-if='this.meleeWinners.length === 3'>
            <div class='h2h-container' v-if='round === 1'>
            <p class='matchup-text'>Head to Head Matchup:<br>How much do you prefer {{this.shortChallenger1.challengerLetter}} and {{this.shortChallenger2.challengerLetter}}?</p>
                <div class='challenger-cards'>
                    <div class='left-challenger-section'>
                        <ChallengerCard v-bind:challenger="shortChallenger1"/>
                        <p class='head-to-head-score'>Score: {{ 10 - value }}</p>
                    </div>
                    <p>vs</p>
                    <div class='right-challenger-section'>
                        <ChallengerCard v-bind:challenger="shortChallenger2"/>
                        <p class='head-to-head-score'>Score: {{ value }}</p>
                    </div>
                </div>
                <div class='slider'>
                    <vue-slider v-model='value' :min='0' :max='10' tooltip='none' :interval='0.5' />
                </div>
                <div class='submit-div'>
                    <button id="submit-h2h-button" @click="collectShortScores(shortChallenger1, shortChallenger2)">Submit</button>
                </div>
            </div>
            <div class='h2h-container' v-if='round === 2'>
            <p class='matchup-text'>Head to Head Matchup:<br>How much do you prefer {{this.shortChallenger1.challengerLetter}} and {{this.shortChallenger3.challengerLetter}}?</p>
                <div class='challenger-cards'>
                    <div class='left-challenger-section'>
                        <ChallengerCard v-bind:challenger="shortChallenger1"/>
                        <p class='head-to-head-score'>Score: {{ 10 - value }}</p>
                    </div>
                    <p>vs</p>
                    <div class='right-challenger-section'>
                        <ChallengerCard v-bind:challenger="shortChallenger3"/>
                        <p class='head-to-head-score'>Score: {{ value }}</p>
                    </div>
                </div>
                <div class='slider'>
                    <vue-slider v-model='value' :min='0' :max='10' tooltip='none' :interval='0.5' />
                </div>
                <div class='submit-div'>
                    <button id="submit-h2h-button" @click="collectShortScores(shortChallenger1, shortChallenger3)">Submit</button>
                </div>
            </div>
            <div class='h2h-container' v-if='round === 3'>
            <p class='matchup-text'>Head to Head Matchup:<br>How much do you prefer {{this.shortChallenger2.challengerLetter}} and {{this.shortChallenger3.challengerLetter}}?</p>
                <div class='challenger-cards'>
                    <div class='left-challenger-section'>
                        <ChallengerCard v-bind:challenger="shortChallenger2"/>
                        <p class='head-to-head-score'>Score: {{ 10 - value }}</p>
                    </div>
                    <p>vs</p>
                    <div class='right-challenger-section'>
                        <ChallengerCard v-bind:challenger="shortChallenger3"/>
                        <p class='head-to-head-score'>Score: {{ value }}</p>
                    </div>
                </div>
                <div class='slider'>
                    <vue-slider v-model='value' :min='0' :max='10' tooltip='none' :interval='0.5' />
                </div>
                <div class='semis-submit-div'>
                    <button id="submit-h2h-button" @click="collectShortScores(shortChallenger2, shortChallenger3)">Submit</button>
                </div>
            </div>
            <div class='champ-container' v-if='round === 4'>
                <Champions></Champions>
            </div>
        </div>

        <div class='challengers-container' id='two-challengers' v-if='this.meleeWinners.length === 2'>
            <div class='h2h-container' v-if='round === 1'>
            <p class='matchup-text'>Head to Head Matchup:<br>How much do you prefer {{this.shortChallenger1.challengerLetter}} and {{this.shortChallenger2.challengerLetter}}?</p>
                <div class='challenger-cards'>
                    <div class='left-challenger-section'>
                        <ChallengerCard v-bind:challenger="shortChallenger1"/>
                        <p class='head-to-head-score'>Score: {{ 10 - value }}</p>
                    </div>
                    <p>vs</p>
                    <div class='right-challenger-section'>
                        <ChallengerCard v-bind:challenger="shortChallenger2"/>
                        <p class='head-to-head-score'>Score: {{ value }}</p>
                    </div>
                </div>
                <div class='slider'>
                    <vue-slider v-model='value' :min='0' :max='10' tooltip='none' :interval='0.5' />
                </div>
                <div class='submit-div'>
                    <button id="submit-h2h-button" @click="collectSemiScores(shortChallenger1, shortChallenger2)">Submit</button>
                </div>
            </div>
            <div class='champ-container' v-if='round === 2'>
                <Champions></Champions>
            </div>
        </div>
    </div>
    
</template>

<script>

import ChallengerCard from './ChallengerCard.vue'
import Champions from './Champions.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/material.css'

export default {
    name: "HeadToHead",

    components: {
        ChallengerCard,
        Champions,
        VueSlider
    },

    props: [

    ],

    data: () => {
        return {
            challengers: [],
            shortChallengers: [],
            meleeWinners: [],
            round: 1,
            value: 5,
            finalists: [],
            champion: [],
            scale: 100
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

            this.value = 5
        },

        collectSemiScores(challengerA, challengerB) {
            challengerA.rating = 10 - this.value
            challengerB.rating = this.value

            this.$store.commit('addSemiScores', challengerA)
            this.$store.commit('addSemiScores', challengerB)

            this.challengers.push(challengerA)
            this.challengers.push(challengerB)

            this.advanceRound()
        },

        collectShortScores(challengerA, challengerB) {
            challengerA.rating = 10 - this.value
            challengerB.rating = this.value

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

.slider{
  width:50vw;
  margin:1rem auto;
}
.vue-slider-rail{
  background-color:#ff73d5;
}

.h2h-container {
    display: flex;
    flex-direction: column;
}

.matchup-text {
    color: white;
    font-weight: 700;
    font-size: 20px;
    width: 90%;
    max-width: 800px;
    margin: 0 auto;
}

.head-to-head-score {
    font-weight: 700;
    font-size: 20px;
    margin-top: 20px;
}

.challengers-container {
    display: flex;
    flex-direction: column;
    margin: 20px auto 150px auto;
    width: 95%;
    max-width: 800px;
}

.challenger-cards {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
}

</style>