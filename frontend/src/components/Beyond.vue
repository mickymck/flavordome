<template>
  <div class='drag-list'>
    <draggable :list='challengers'>
      <transition-group>
        <div v-for='challenger in challengers' :key='challenger.challenger'>
          <span class='draggee'>{{challenger.challenger}}</span>
        </div>
      </transition-group>
    </draggable>
    <button @click='sendRankings'>Submit Rankings</button>
    <div class='chart-wrapper'>
      <Chart :chartData='chartData' :options='options' />
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Chart from './Chart.vue'

export default {
  components:{
    draggable,
    Chart
  },
  data(){
    return{
      options:{
        responsive:true,
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        }
      },
      challengers:[]
    }
  },
  methods:{
    sendRankings:function(event){
      const length = this.challengers.length
      for(let [i, challenger] of this.challengers.entries()){
        challenger.rating = length - i
      }
      this.$store.state.newSocket.send(JSON.stringify({
        method:"bulkRanking",
        payload:this.challengers
      }))
    }
  },
  created(){
    this.challengers = this.$store.getters.getChallengers
  },
  computed:{
    chartData(){
      return {
        labels:this.$store.getters.getChallengers.map(a=>a.challenger),
        datasets: [{
          data: this.$store.getters.getAvgScore
        }]
      }
    }
  }
}
</script>

<style scoped>
  .draggee{
    background:white;
    padding:.5rem;
    margin-bottom:.5rem;
  }
  
  .drag-list{
    padding-top:2rem;
  }
  
  .chart-wrapper{
    height:10rem;
  }
</style>