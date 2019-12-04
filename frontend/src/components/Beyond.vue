<template>
  <div class='drag-list'>
    <ul>
      <draggable :list='challengers'>
        <li v-for='challenger in challengers' :key='challenger.challenger' class='challenger-card'>
          <span class='draggee'>{{challenger.challenger}}</span>
        </li>
      </draggable>
    </ul>
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
          xAxes:[{
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
    this.challengers = this.$store.getters.getChallengers.map(a=>a)
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
    max-height:10rem;
    max-width:50vw;
    margin:auto;
    position:relative;
  }
</style>