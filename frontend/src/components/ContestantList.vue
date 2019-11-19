<template>
  <ul v-if="checkContestants">
    <li v-for="(contestant, x) in contestants" v-bind:key='x'>{{contestant}}</li>
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