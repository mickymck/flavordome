<template>
    <transition name="fade" enter-active-class="animated fadeInUp">
    <div class="final-rankings">
            <h1>FINAL RANKINGS!</h1>
            <ul>
                <li v-for="challenger in sortedChallengers"> 
                        <div v-if="challenger.rank === '1st'" class="champion animated flash infinite delay-2s slow" transition="champ">
                            <div class="rank-container">
                                <div class="rank-col">
                                    <h2>{{ challenger.rank }}</h2>
                                </div>
                                <div class="name-col">
                                    <h2>........  {{ challenger.name }}</h2>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="rank-container">
                            <div class="rank-col">
                                <h3> {{ challenger.rank }}</h3>
                            </div>
                            <div class="name-col">
                                <h3>........  {{ challenger.name }}</h3>
                            </div>
                        </div>
                        </div>
                </li> 
            </ul>
    </div>
    </transition>
</template>

<script>

require("animate.css/animate.min.css")

export default {
  name:'FinalRankings',
  data: function () {
        return {
            contestants:[
                {rank:'1st',name:'Skinny Pop'},
                {rank:'2nd',name:'Butter Popcorn'},
                {rank:'3rd',name:'Loser Popcorn'},
                {rank:'4th',name:'Movie Popcorn'},
                {rank:'5th',name:'TV Popcorn'},
                {rank:'6th',name:'Kettle Corn'},
                {rank:'7th',name:'Pop Chips'},
                {rank:'8th',name:'Poop Chips'},
            ]
        }
    },
  methods: {
  },
  props: ['sortedChallengers']

}
</script>

<style scoped>
li{
    list-style-type: none;
}
.rank-container{
    width:100%;
    display:flex;
}
.rank-col{
    width:25%;
}
.name-col{
    width:75%;
    text-align: left;

}
</style>