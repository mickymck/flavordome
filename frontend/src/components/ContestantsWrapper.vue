<template>
  <div class="contestants-wrapper">
    <div>
      <form v-on:submit="this.handleSubmit">
        <div class="control">
          <label>What will you be tasting?</label>
          <input type='text' name="contestant" placeholder="lagavulin"/>
        </div>
        <div class="control">
          <button action="submit">ENROLL CHALLENGER</button>
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
      this.$store.commit('changeScene',"MeleeRating")
    }
  }
}
</script>