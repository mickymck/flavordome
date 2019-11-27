<template>
    <transition name="fade" enter-active-class="animated fadeInUp">
    <div class="final-rankings">
            <h1>FINAL RANKINGS!</h1>
            <ul>
                <li v-for="(challenger,index) in sortedChallengers"> 
                        <div v-if="index == 0" class="champion animated flash infinite delay-2s slow" transition="champ">
                            <div class="rank-container">
                                <div class="rank-col">
                                    <h2>{{ ordinal_suffix(index+1) }}</h2>
                                </div>
                                <div class="name-col">
                                    <h2>........  {{ challenger.challenger }}</h2>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <div class="rank-container">
                            <div class="rank-col">
                                <h3> {{ ordinal_suffix(index+1) }}</h3>
                            </div>
                            <div class="name-col">
                                <h3>........  {{ challenger.challenger }}</h3>
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
  props:['sortedChallengers'],
  methods: {
    ordinal_suffix:function(i) {
        var j = i % 10
        var k = i % 100
        if (j == 1 && k != 11) {
            return i + "st"
        }
        if (j == 2 && k != 12) {
            return i + "nd"
        }
        if (j == 3 && k != 13) {
            return i + "rd"
        }
        return i + "th"
    },
  },
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