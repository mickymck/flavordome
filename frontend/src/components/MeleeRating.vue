<template>
  <div>
    THIS IS THE MELEE
    <div class='arena'>
      <!-- <Combatant card='currentCard'/> -->
    </div>
    <div class='slider'>
      <!-- <Slider /> -->
    </div>
    <div class='submit'>
      <!-- <Submit /> -->
    </div>
  </div>
</template>

<script>


export default {
  name:'MeleeRating',
  components:{
    // Combatant,
    // Slider,
    // Submit
  },
  data: () => {
    return {
      currentCard:null,
      remainingCards:[]
    }
  },
  methods:{
    onSubmit:function(event){
      event.preventDefault()
      this.augmentScore()
      if (this.remainingCards.length === 0){
        this.resolveMelee()
      } else {
        randCardIndex = Math.floor(Math.random()*this.remainingCards.length)
        this.currentCard = this.remainingCards.splice(randCardIndex,1)
      }
    }
  },
  created(){
    
  }
}
</script>