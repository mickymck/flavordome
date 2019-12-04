<template>
<div class="rankings-container">
    <div class="top-four-rankings" v-show="!showFinalRankings">
            <h1>Champions!</h1>
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
                <transition name="fade" enter-active-class="animated bounceInUp">
                    <h2 v-show="revealFirst">Champion: {{ sortedChallengers[0].challenger }} ({{ sortedChallengers[0].challengerLetter }})</h2>
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
                    <h4 v-show="revealThird">3rd: {{ sortedChallengers[2].challenger }} ({{ sortedChallengers[2].challengerLetter }})</h4>
                </transition>
            <!-- </div> -->
        </div> 
        <!-- <div class='loser' v-if='gteFourChallengers'> -->
        <div class='loser'>
            <transition name="fade" enter-active-class="animated bounceInUp">
                <h4 v-show="revealLoser">Loser: {{ sortedChallengers[sortedChallengers.length - 1].challenger }} ({{ sortedChallengers[sortedChallengers.length - 1].challengerLetter }})</h4>
            </transition>
        </div>
        <button v-if='role === "host"' class="next-champion-button" @click="presentChampion">Next</button>
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
        // let champ1Index= -1, champ2Index= -1

        //shifts the first and second place to the beginning of the challenger array
        // if(this.sortedChallengers.length > 2){
        //     for(let i = 0; i < sortedChallengers.length; i++){
        //         if(sortedChallengers[i].challenger === champions[0].challenger) champ1Index = i
        //         if(sortedChallengers[i].challenger === champions[1].challenger) champ2Index = i
        //     }
        //     let firstPlace = sortedChallengers.splice(champ1Index,1)
        //     let secondPlace = sortedChallengers.splice(champ2Index,1)
        //     sortedChallengers.unshift(secondPlace[0])
        //     sortedChallengers.unshift(firstPlace[0])
        // }
        // this.$store.commit("setupFinalReveal", totalShown, sortedChallengers)
        // this.$store.watch(
        //     (state)=>{
        //         return this.$store.state.finalReveal['loser']
        //     }
        // )
        // for(let i = 0; i < totalShown; i++) this.contestantsShowArray.push(false)
        // this.sortedChallengers = sortedChallengers
        // console.log(this.$store.finalRankingsShow) 
        // console.log(this.$store.finalRevealChallengers) 
    }
  }
</script>

<style scoped>
*{
    box-sizing:border-box;
    margin:0;
    padding:0;
}

.rankings-container{
    padding: 1rem 2rem 2rem 1rem;
    width:100%;
    height:100%;
}

.champion,.second,.third,.loser{
    text-align: left;
    position: absolute;
    width:100%;
    height:5rem;
    position:relative;
}
.loser{
    height: 1rem;
    font-size: 1rem;
}
.next-champion-button{
    margin-top: 5rem;
    justify-self:center;
}
</style>