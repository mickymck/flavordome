<template>
  <div>
    THIS IS THE MELEE
    <div class='arena'>
      <Combatant v-bind:card='this.currentCard'/>
    </div>
    <form v-on:submit='handleSubmit'>
      <div class='slider'>
        <input type="range" min=0 max=10 name="rating" />
      </div>
      <div class='submit'>
        <button type="submit">SUBMIT</button>
      </div>
    </form>
  </div>
</template>

<script>
import Combatant from './Combatant.vue'

export default {
  name:'MeleeRating',
  components:{
    Combatant
  },
  data: () => {
    return {
      currentCard:null,
      remainingCards:[]
    }
  },
  methods:{
    handleSubmit:function(event){
      event.preventDefault()
      let form = event.target
      let formData = new FormData(form)
      this.augmentScore(formData.get('rating'))
      if (this.remainingCards.length === 0){
        this.currentCard = null
        this.resolveMelee()
      } else {
        this.chooseCard()
      }
    },
    chooseCard:function(){
      const randCardIndex = Math.floor(Math.random()*this.remainingCards.length)
      this.currentCard = this.remainingCards.splice(randCardIndex,1)[0]
    },
    augmentScore:function(rating){
      if (this.currentCard !== null){
        this.currentCard.rating=rating
        this.$store.commit('addScore',this.currentCard)
      }
    },
    resolveMelee:function(){
      this.$store.commit('setTopFour')
      this.$store.commit('changeScene', "HeadToHead")
    }
  },
  created(){
    this.remainingCards = this.$store.state.challengers.slice()
    this.chooseCard()
  }
}
</script>