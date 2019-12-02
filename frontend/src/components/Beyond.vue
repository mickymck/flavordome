<template>
  <div>
    <draggable :list='challengers'>
      <transition-group>
        <div v-for='challenger in challengers' :key='challenger'><p>{{challenger}}</p></div>
      </transition-group>
    </draggable>
    <button>Submit Rankings</button>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components:{
    draggable
  },
  data:()=>{
    return{
      challengers:[
        "candy",
        "canes",
        "candycanes",
        "syrup",
        "marshmallows",
        "sugar"
      ]
    }
  }
}
</script>