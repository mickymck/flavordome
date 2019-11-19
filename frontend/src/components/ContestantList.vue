<template>
  <ul v-if="checkContestants">
    <li v-for="contestant in contestants" v-bind:key='contestant'>{{contestant}}</li>
  </ul>
</template>

<script>
export default {
  name:'ContestantList',
  methods: {
    checkContestants: () => {
      return this.props.contestants.length > 0
    }
  },
  props:{
    contestants: Array
  }
}
</script>