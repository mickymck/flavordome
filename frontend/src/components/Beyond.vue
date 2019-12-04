<template>
  <div class='beyond-wrapper'>
    <div class='drag-list' v-show='!rankingsSent'>
      
      <ul>
        <draggable :list='challengers'>
          <li v-for='(challenger, index) in challengers' :key='challenger.challenger' class='challenger-card'>
            <span class='draggee'>{{index+1}})  {{challenger.challenger}}</span>
          </li>
        </draggable>
      </ul>
      <button @click='sendRankings'>Submit Rankings</button>
    </div>
    <div class='chart-wrapper' v-show='rankingsSent'>
      <div class='logo-wrapper'>
        <div class='flavordome-logo'></div>
      </div>
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
        legend:{
          display:false
        },
        layout:{
          padding:{
            top:20,
            right:15
          }
        },
        scales:{
          xAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        }
      },
      challengers:[],
      rankingsSent:false
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
      this.rankingsSent=true
    },
    calculatePoint:function(i, intervalSize, colorRangeInfo){
      const { colorStart, colorEnd, useEndAsStart } = colorRangeInfo
      return (useEndAsStart ? (colorEnd - i*intervalSize): (colorStart + i*intervalSize))
    },
    interpolateColors:function(dataLength, colorScale, colorRangeInfo){
      const {colorStart, colorEnd} = colorRangeInfo
      const colorRange = colorEnd-colorStart
      const intervalSize = colorRange/dataLength
      let i, colorPoint
      let colorArray = []
      
      for (i =0;i< dataLength; i++){
        colorPoint = this.calculatePoint(i, intervalSize, colorRangeInfo)
        colorArray.push(colorScale(colorPoint))
      }
      return colorArray
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
          data: this.$store.getters.getAvgScore,
          background
        }]
      }
    }
  }
}
</script>

<style scoped>
  .draggee{
    padding:.5rem;
  }
  
  .drag-list{
    padding-top:2rem;
    max-width:80vw;
    margin:auto;
  }
  
  .chart-wrapper{
    max-width:60vw;
    margin:auto;
    position:relative;
  }
  .beyond-wrapper{
    padding-top:1rem
  }
</style>