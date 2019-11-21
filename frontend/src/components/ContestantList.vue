<template>
  <div v-if="contestants.length > 0">
    <div v-if="contestants.length >= 4">
      <button v-on:click="$emit('submitContestants')">Lock in FlavorDome Challengers</button>
    </div>
    <ul>
      <li v-for="contestant in contestants" v-bind:key='contestant'>
        {{contestant}}
        <button v-on:click="$emit('deleteContestant', contestant)">
          Remove
        </button>
      </li>
    </ul>
    
  </div>
</template>


<script>
export default {
  name:'ContestantList',
  methods: {
    
  },
  props:{
    contestants: Array
  }
}
</script>