<template>
  <div class='melee-rating-container'>
    <div class='logo-wrapper'>
      <div class='flavordome-logo'></div>
    </div>
    <div>
      <p class='instruction-text'>Test the taste of Challenger {{currentCard.challengerLetter}}</p>
      <div class='arena'>
        <Combatant v-bind:card='currentCard'/>
      </div>
      <form v-on:submit='handleSubmit'>
        <div class='slider'>
          <div class='rating-tag'>
            Your Rating:
          </div>
          <vue-slider v-model='cardRating' :min='0' :max='10' tooltip='always' :interval='0.5' />
        </div>
        <div class='submit'>
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Combatant from './Combatant.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/material.css'

export default {
  name:'MeleeRating',
  components:{
    Combatant,
    VueSlider
  },

  data: () => {
    return {
      // currentCard:null,
      // remainingCards:[],
      cardRating:5
    }
  },

  computed:{
    currentCard(){
      return this.$store.getters.getCurrentChallenger
    }
  },

  methods:{
    handleSubmit:function(event){
      event.preventDefault()
      this.augmentScore(this.cardRating)
      if (this.$store.state.lastMeleeRound === true){
        this.resolveMelee()
      } else {
        this.countMeleeScores()
        this.cardRating = 5
      }
      
    },
    
    augmentScore:function(rating){
      if (this.currentCard !== null){
        this.currentCard.rating=rating
        this.$store.state.newSocket.send(JSON.stringify({
          'method':'addScore',
          'payload':this.currentCard
        }))
      }
    },

    countMeleeScores:function(){
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'notifyReady',
        'payload': null
      }))
      this.$store.commit('changeScene', "WaitingRoomMelee")
    },

    resolveMelee:function(){
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'notifyReady',
        'payload':null
      }))
      this.$store.commit('changeScene', "PreFinals")
    }
  }
}
</script>

<style scoped>

.arena {
  margin-top: 20px;
}

.slider{
  width:50vw;
  margin:1rem auto;
}
.rating-tag{
  margin-bottom: 2.5rem
}
.vue-slider-rail{
  background-color:#ff73d5
}

.melee-top-text {
  margin-top: 0;
  padding-top: 20px;
}

</style>