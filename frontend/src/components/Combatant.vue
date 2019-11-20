<template>
  <div class='combatant'>
    {{card.challenger}}
  </div>
</template>

<script>
export default {
  name:'Combatant',
  props:{
    card:Object
  }
}
</script>

<style scoped>
  .combatant{
    background:#32ebe6;
    width:60vw;
    margin:auto;
    height:60vw;
    font-size: 5rem;
  }


</style>