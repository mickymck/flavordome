<template>
  <div class='combatant'>
    <div>
      {{card.challengerLetter}}
    </div>
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
    display:flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items:center;
  }


</style>