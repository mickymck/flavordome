<template>
<div class="rankings-container">
    <div class="top-four-rankings" v-show="!finalRankingsShow">
            <h1>Champions!</h1>
        <div class='champion'>
            <transition name="champion-transition" enter-active-class="animated bounceInUp">
                <h2 v-show="contestantsShowArray[3]">Champion: {{ sortedChallengers[0] }}
            </transition>
        </div>
        <div class='second'>
            <transition name="fade" enter-active-class="animated bounceInUp">
                <h3 v-show="contestantsShowArray[2]">2nd: {{ sortedChallengers[1] }}</h3>
            </transition>
        </div>
        <div class='third'>
            <transition name="fade" enter-active-class="animated bounceInUp">
                <h4 v-show="contestantsShowArray[1]">3rd: {{ sortedChallengers[2] }} </h4>
            </transition>
        </div>
        <div class='fourth'>
            <transition name="fade" enter-active-class="animated bounceInUp">
                <h4 v-show="contestantsShowArray[0]">Loser: {{ sortedChallengers[sortedChallengers.length - 1] }}</h4>
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
            sortedChallengers:[],
            exampleContestants:[
                //eventually receive these as props
                //I also want champion to infinitely flash
                'Skinny Pop',
                'Organic Pop',
                'Butter Popcorn',
                'Loser Popcorn',
            ],
            finalRankingsShow:false,
            
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
        this.sortedChallengers = this.$store.getters.getChallengers
        console.log(sortedChallengers)
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