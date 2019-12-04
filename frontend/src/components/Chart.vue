

<script>
import {HorizontalBar, mixins} from 'vue-chartjs'
const {reactiveProp} = mixins
export default {
  name:'Chart',
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props:{
    chartData:{
      type:Object,
      default:null
    },
    options:{
      type:Object,
      default:null,
    }
  },
  mounted(){
    this.renderChart(this.chartData, this.options)
  },
}
</script>

<style scoped>
  canvas{
    background:rgba(255,255,255, 0.5)
  }
</style>