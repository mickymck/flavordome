<template>
  <ul v-if="checkContestants">
    <li v-for="contestant in contestants" v-bind:key='contestant'>
      {{contestant}}
      <button v-on:click="$emit('deleteContestant', contestant)">
        Remove
      </button>
    </li>
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