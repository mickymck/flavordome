<template>
  <div class="contestants-wrapper">
    <div>
      <div class='challenger-instructions'>
        What are you tasting?
      </div>
      <form v-on:submit="this.handleSubmit">
        <div class="control">
          <input type='text' name="contestant" class="user-input-field" placeholder="ex: Eagle Rare, Manchego, Krispy Kreme glazed, etc."/>
        </div>
        <div class="control">
          <button action="submit">Add Challenger</button>
        </div>
      </form>
    </div>
    <ContestantList v-bind:contestants='contestants' v-on:deleteContestant='handleDelete' v-on:submitContestants='handleLaunch'/>
    <div>
    </div>
  </div>
</template>

<script>
import ContestantList from './ContestantList.vue'

export default {
  name:'ContestantsWrapper',
  data() {
    return {
      contestants: []
    }
  },
  components: {
    ContestantList
  },
  methods: {
    handleSubmit: function(event){
      event.preventDefault()
      const form = event.target
      const formData = new FormData(form)
      form.reset()
      this.contestants.unshift(formData.get('contestant'))
    },
    handleDelete: function(contestantToDelete){
      let newContestants = this.contestants.filter(contestant => contestant !== contestantToDelete)
      this.contestants = newContestants
    },
    handleLaunch: function(){
      this.$store.commit('addChallengers', this.contestants)
      this.$store.commit('maskChallengers')
      this.$store.commit('changeScene', 'HostInstructions')
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'setupState',
        'payload':this.$store.state
      }))
      
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

.control {
  margin: 20px;
}

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

input.user-input-field {
  margin: 0;
}

</style>