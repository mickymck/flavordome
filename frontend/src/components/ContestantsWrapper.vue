<template>
  <div class='contestants-wrapper-container'>
    <div class="contestants-wrapper">
      <div>
        <div class='challenger-instructions'>
          <h1>What are you tasting?</h1>
        </div>
        <form v-on:submit="this.handleSubmit">
          <div class="control">
            <input type='text' v-model='contestant' name="contestant" class="user-input-field" v-if='category.message' :placeholder="[[category.message]]">
            <input type='text' v-model='contestant' name="contestant" class="user-input-field" v-if='!category.message' placeholder="ex: Mom's Famous Beef Chili">
          </div>
          <div class="control">
            <button action="submit">Add Challenger</button>
          </div>
        </form>
      </div>
      <ContestantList v-bind:contestants='contestants' v-on:deleteContestant='handleDelete' v-on:submitContestants='handleLaunch'/>
      <p v-if='contestants.length === 0' class='go-back-text' @click='goBack'>Go Back</p>
    </div>
  </div>
</template>

<script>
import ContestantList from './ContestantList.vue'
import CategoryCard from './CategoryCard.vue'
import Categories from './Categories.vue'

export default {
  name:'ContestantsWrapper',

  props:['category'],

  data() {
    return {
      contestants: [],
      contestant:''
    }
  },
  components: {
    ContestantList
  },
  methods: {

    handleSubmit: function(event){
      event.preventDefault()
      this.contestant = this.contestant.trim()
      if (this.contestant){
        this.contestants.unshift(this.contestant)
        this.contestants = [...new Set(this.contestants)]
        this.contestant=''
      }
    },
    goBack: function(){
      this.$emit('goBack')
    },
    handleDelete: function(contestantToDelete){
      let newContestants = this.contestants.filter(contestant => contestant !== contestantToDelete)
      this.contestants = newContestants
    },
    handleLaunch: function(){
      this.$store.commit('addChallengers', this.contestants)
      this.$store.commit('maskChallengers')
      this.$store.commit('changeScene', 'HostInstructions')
      // this.$store.state.newSocket.send(JSON.stringify({
      //   'method':'setupState',
      //   'payload':this.$store.state
      // }))
      
      // this.$store.state.newSocket.send(JSON.stringify({
      //   'method': 'addChallengers',
      //   'payload': this.contestants
      // }))
      // this.$store.state.newSocket.send(JSON.stringify({
      //   'method': 'maskChallengers',
      //   'payload': null
      // }))
      // this.$store.state.newSocket.send(JSON.stringify({
      //   'method': 'changeScene',
      //   'payload': "HostInstructions"
      // }))
    }

  }
}
</script>

<style scoped>

.contestants-wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 auto 50px auto;
}

.challenger-instructions{
  font-size: 20px;
  text-align: center;
  margin: 20px auto 0 auto;
}

button {
font-size: 20px;
}

.user-input-field {
  margin-top: 60px;
}

</style>