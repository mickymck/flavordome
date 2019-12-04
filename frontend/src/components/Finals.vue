<template>

    <div class='head-to-head-container'>
        <div class='logo-wrapper'>
            <div class='flavordome-logo'></div>
        </div>
        <div class='challengers-container' id='four-plus-challengers'>
            <div class='h2h-container'>
                <p class='matchup-text'>Choose Your Champion</p>
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
                <div class='slider'>
                    <vue-slider v-model='value' :min='0' :max='10' tooltip='none' :interval='0.5' />
                </div>
                <div class='semis-submit-div'>
                    <button id="submit-h2h-button" @click="collectFinalistScores(finalist1, finalist2)">Submit</button>
                </div>
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
    name: "Finals",
    components: {
        ChallengerCard,
        Champions,
        VueSlider
    },
    data:() => {
        return{
            value:5
        }
    },
    methods:{
        collectFinalistScores(finalistA, finalistB) {
            // finalistA.rating = this.leftScore
            // finalistB.rating = this.rightScore
            finalistA.rating = 10 - this.value
            finalistB.rating = this.value
            this.$store.state.newSocket.send(JSON.stringify({
                'method':'addFinalistScores',
                'payload': finalistA
            }))
            this.$store.state.newSocket.send(JSON.stringify({
                'method':'addFinalistScores',
                'payload': finalistB
            }))
            console.log("got here")
            this.$store.state.newSocket.send(JSON.stringify({
                'method':'readyRankings',
                'payload':null
            }))
            // this.$store.commit('addFinalistScores', finalistA)
            // this.$store.commit('addFinalistScores', finalistB)

            this.$store.commit('changeScene','RankingsWaitingRoom')
        },
    },
    computed:{
        finalist1(){
            return this.$store.getters.getFinalists[0]
        },
        finalist2(){
            return this.$store.getters.getFinalists[1]
        }
    },
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
    color: gold;
    text-shadow: 1px 1px 3px grey;
    font-weight: 700;
    font-size: 1.5px;
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
    margin-top: 40px;
}
.slider{
    margin-top: 1.5rem;
}

</style>