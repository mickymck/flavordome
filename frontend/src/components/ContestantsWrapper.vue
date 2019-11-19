<template>
  <div class="contestants-wrapper">
    <div>
      <form v-on:submit="this.handleSubmit">
        <div class="control">
          <label>Add contestants</label>
          <input type='text' name="contestant" />
        </div>
        <div class="control">
          <button action="submit">ENROLL CONTESTANT</button>
        </div>
      </form>
    </div>
    <ContestantList v-bind:contestants='contestants' />
  </div>
</template>

<script>
import ContestantList from './ContestantList.vue'

export default {
  name:'ContestantsWrapper',
  data() {
    return {
      contestants: ['hello']
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
      window.console.log()
      this.contestants.unshift(formData.get('contestant'))
    },
    handleDelete: function(event)
  }
}
</script>