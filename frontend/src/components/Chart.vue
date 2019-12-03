

<script>
import {HorizontalBar} from 'vue-chartjs'
export default {
  name:'Chart',
  extends: HorizontalBar,
  props:{
    chartData:{
      type:Object,
      default:null
    },
    options:{
      type:Object,
      default:null
    }
  },
  mounted(){
    this.renderBarChart()
  },
  computed:{
    averages: function(){
      return 
    }
  },
  methods:{
    renderBarChart: function(){
      this.renderChart(
        
      )
    }
  },
  watch:{
    chartData(){
      this.$data._chart.update()
    }
  }
}
</script>