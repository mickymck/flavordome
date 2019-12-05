<template>
<div class="rankings-container">
    <div class="top-four-rankings" v-show="!showFinalRankings">
            <h1 class="title">{{this.testName}} Results</h1>
        <div class='champion'>
            <!-- <div v-if="contestantsShowArray.length <= 2">
                <transition name="fade" enter-active-class="animated bounceInUp">
                    <h2 v-show="contestantsShowArray[1]">Champion: {{ sortedChallengers[0].challenger }}</h2>
                </transition>
            </div>
            <div v-if="contestantsShowArray.length === 3">
                <transition name="fade" enter-active-class="animated bounceInUp">
                    <h2 v-show="contestantsShowArray[2]">Champion: {{ sortedChallengers[0].challenger }}</h2>
                </transition>
            </div>
            <div v-else> -->
                <transition name="fade" enter-active-class="animated bounceInUp ">
                    <h2 v-show="revealFirst">1st: {{ sortedChallengers[0].challenger }} ({{ sortedChallengers[0].challengerLetter }})</h2>
                </transition>
            <!-- </div> -->
        </div>
        <div class='second'>
                <!-- <div v-if="contestantsShowArray.length <= 2">
                    <transition name="fade" enter-active-class="animated bounceInUp">
                        <h3 v-show="contestantsShowArray[0]">2nd: {{ sortedChallengers[1].challenger }}</h3>
                    </transition>
                </div>
                <div v-if="contestantsShowArray.length === 3">
                    <transition name="fade" enter-active-class="animated bounceInUp">
                        <h3 v-show="contestantsShowArray[1]">2nd: {{ sortedChallengers[1].challenger }}</h3>
                    </transition>
                </div>
                <div v-else> -->
                    <transition name="fade" enter-active-class="animated bounceInUp">
                        <h3 v-show="revealSecond">2nd: {{ sortedChallengers[1].challenger }} ({{ sortedChallengers[1].challengerLetter }})</h3>
                    </transition>
                <!-- </div> -->
        </div>
        <!-- <div class='third' v-if='gteThreeChallengers'> -->
        <div class='third'>
            <!-- <div v-if="contestantsShowArray.length === 3">
                <transition name="fade" enter-active-class="animated bounceInUp">
                    <h4 v-show="contestantsShowArray[0]">3rd: {{ sortedChallengers[2].challenger }}</h4>
                </transition>
            </div>
            <div v-else> -->
                <transition name="fade" enter-active-class="animated bounceInUp">
                    <h3 v-show="revealThird">3rd: {{ sortedChallengers[2].challenger }} ({{ sortedChallengers[2].challengerLetter }})</h3>
                </transition>
            <!-- </div> -->
        </div> 
        <!-- <div class='loser' v-if='gteFourChallengers'> -->
        <div class='loser'>
            <transition name="fade" enter-active-class="animated bounceInUp">
                <h4 v-show="revealLoser">Loser: {{ sortedChallengers[sortedChallengers.length - 1].challenger }} ({{ sortedChallengers[sortedChallengers.length - 1].challengerLetter }})</h4>
            </transition>
        </div>
        <button v-if='role === "host" && loserButton && !thirdPlaceButton' class="next-champion-button" @click="presentChampion">Reveal the Worst</button>
        <button v-if='role === "host" && thirdPlaceButton && !secondPlaceButton' class="next-champion-button" @click="presentChampion">Reveal 3rd Place</button>
        <button v-if='role === "host" && secondPlaceButton && !championButton' class="next-champion-button" @click="presentChampion">Reveal 2nd Place</button>
        <button v-if='role === "host" && championButton' class="next-champion-button" @click="presentChampion">The Champion</button>
        <button v-if='role === "host" && completeRankingsButton' class="next-champion-button" @click="presentChampion">Complete Rankings</button>

    </div>
    <FinalRankings v-show="showFinalRankings"></FinalRankings>
</div>
</template>

<script>

import FinalRankings from "./FinalRankings.vue"
import { mapState } from 'vuex'
require("animate.css/animate.min.css")
  export default {
    name:"Champions",
    components:{
        FinalRankings,
    },
    data: function () {
        return {
            contestantsShowArray: [],
            count: 0,
            topFour:[],
            // sortedChallengers:[],
            challengers:[],
            showChampions:true,
            champions:[],
            gteThreeChallengers:false,
            gteFourChallengers:false,
            loserButton:true,
            thirdPlaceButton:false,
            secondPlaceButton:false,
            championButton:false,
            completeRankingsButton:false,
            testName: ''
        }
    },
    computed:mapState({
        // revealLoser: 'finalReveal["loser"]',
        revealLoser: state => state.finalReveal['loser'],
        revealThird: state => state.finalReveal['third'],
        revealSecond: state => state.finalReveal['second'],
        revealFirst: state => state.finalReveal['first'],
        sortedChallengers: state => state.finalRevealChallengers,
        showFinalRankings: state => state.showFinalRankings,
        role: state => state.role,
    }),
    methods:{
        presentChampion:function(){
            if(this.revealLoser) this.secondPlaceButton = true
            if(this.revealThird) this.championButton = true
            if(this.revealSecond) this.completeRankingsButton = true
            if(this.revealFirst){
                this.$store.state.newSocket.send(JSON.stringify({
                    'method':'sendShowFinalRankings',
                    'payload':null
                }))
            }  
            this.$store.state.newSocket.send(JSON.stringify({
                'method':'revealNext',
                'payload':null
            }))
        },
    },
    created:function(){
        // this.topFour = this.$store.getters.getTopFour
        this.testName = this.$store.getters.getTestName
        let champions = this.$store.getters.getChampion //returns top two challengers
        let sortedChallengers = this.$store.getters.getChallengers
        let totalShown = 2
        if(this.sortedChallengers.length === 3){
            this.gteThreeChallengers = true;
            totalShown = 3
        }
        else if(this.sortedChallengers.length > 3){
            this.gteThreeChallengers = true;
            this.gteFourChallengers = true;
            totalShown = 4
            console.log(totalShown)
        }
    }
  }
</script>

<style scoped>
*{
    box-sizing:border-box;
    margin:0;
    padding:0;
}
/* .title{
    margin: 1rem;
    font-size: 3rem;
    color:white
} */
.rankings-container{
    padding: 1rem 1rem 1rem 1rem;
    width:100%;
    height:100%;
}

.champion,.second,.third,.loser{
    width:100%;
    height:5rem;
    position:relative;
    font-size: 1.5rem;
    text-align: center;
}
.champion{
    color: white;
    text-shadow: 1px 1px 10px gold;
    margin: 3rem 0 2rem 0;
}
.next-champion-button{
    margin-top: 1rem;
    padding: 0.5rem;
    justify-self:center;
}
</style>