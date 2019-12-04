<template>
  <div class='combatant-container'>
    <div class='combatant'>
      <div>
        {{card.challengerLetter}}
      </div>
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
    width:30vw;
    margin:auto;
    height:30vw;
    max-width: 200px;
    max-height: 200px;
    font-size: 5rem;
    display:flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items:center;
    
    background: white;
    border-top: 60px solid #a600d8;
    border-right: 60px solid #32ebe6;
    border-bottom: 60px solid #ff73d5;
    border-left: 60px solid #45c3f6;
    color: #a600d8;
  }


</style>