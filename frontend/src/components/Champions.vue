<template>
<div class="rankings-container">
    <div class="top-four-rankings" v-show="!finalRankingsShow">
            <h1>Champions!</h1>
        <div class='champion'>
            <transition name="champion-transition" enter-active-class="animated bounceInUp">
                <h2 v-show="contestantsShowArray[3]">Champion: {{ sortedChallengers[0].challenger }}</h2>
            </transition>
        </div>
        <div class='second'>
            <transition name="fade" enter-active-class="animated bounceInUp">
                <h3 v-show="contestantsShowArray[2]">2nd: {{ sortedChallengers[1].challenger }}</h3>
            </transition>
        </div>
        <div class='third'>
            <transition name="fade" enter-active-class="animated bounceInUp">
                <h4 v-show="contestantsShowArray[1]">3rd: {{ sortedChallengers[2].challenger }} </h4>
            </transition>
        </div>
        <div class='fourth'>
            <transition name="fade" enter-active-class="animated bounceInUp">
                <h4 v-show="contestantsShowArray[0]">Loser: {{ sortedChallengers[sortedChallengers.length - 1].challenger }}</h4>
            </transition>
        </div>
        <button class="next-champion-button" @click="presentChampion">Next</button>
    </div>
    <FinalRankings v-show="finalRankingsShow" v-bind:sortedChallengers="sortedChallengers"></FinalRankings>
</div>
</template>

<script>

import FinalRankings from "./FinalRankings.vue"
require("animate.css/animate.min.css")
  export default {
    name:"Champions",
    components:{
        FinalRankings,
    },
    data: function () {
        return {
            contestantsShowArray: [false,false,false,false],
            count: 0,
            topFour:[],
            sortedChallengers:[],
            challengers:[],
            finalRankingsShow:false,
            champions:[],
            
        }
    },
    methods:{
        presentChampion:function(){
            if(this.count !== this.contestantsShowArray.length){
                this.$set(this.contestantsShowArray, this.count, !this.contestantsShowArray[this.count])
                this.count++
            }
            else{
                //move to the next screen
                this.finalRankingsShow = true;
            }
        },
    },
    created:function(){
        // this.topFour = this.$store.getters.getTopFour
        this.champions = this.$store.getters.getChampion
        this.sortedChallengers = this.$store.getters.getChallengers
        console.log(this.champions)
        let champ1Index= -1, champ2Index= -1
        for(let i = 0; i < this.sortedChallengers.length; i++){
            if(this.sortedChallengers[i].challenger === this.champions[0].challenger) champ1Index = i
            if(this.sortedChallengers[i].challenger === this.champions[1].challenger) champ2Index = i
        }
        //shifts the first and second place to the beginning of the challenger array
        let firstPlace = this.sortedChallengers.splice(champ1Index,1)
        let secondPlace = this.sortedChallengers.splice(champ2Index,1)
        this.sortedChallengers.unshift(secondPlace[0])
        this.sortedChallengers.unshift(firstPlace[0])
        console.log(this.sortedChallengers) 
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

.champion,.second,.third,.fourth{
    text-align: left;
    position: absolute;
    width:100%;
    height:5rem;
    position:relative;
}
.fourth{
    height: 1rem;
    font-size: 1rem;
}
.next-champion-button{
    margin-top: 20rem;
    justify-self:center;
}
</style>