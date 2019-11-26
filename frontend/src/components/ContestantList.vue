<template>
  <div class='contestants-list-wrapper'>
    <div v-if="contestants.length > 0">
      <!-- <div v-if="contestants.length >= 4"> -->
        <!-- <button id='ready-to-taste-button' v-on:click="$emit('submitContestants')">I'm Ready to Taste</button> -->

      <div class='contestant-list'>
        <ul>
          <li v-for="contestant in contestants" v-bind:key='contestant' class='challenger-card'>
            {{contestant}}
            <button id='delete-button' v-on:click="$emit('deleteContestant', contestant)">
              X
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class='bottom-taste-button' v-if="contestants.length > 1">
      <button id='ready-to-taste-button' v-on:click="$emit('submitContestants')">I'm Ready to Taste</button>
    </div>
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

<style scoped>

.contestants-list-wrapper {
  display: flex;
  flex-direction: column;
}

.bottom-taste-button {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

#ready-to-taste-button {
  position: absolute;
  bottom: 10px;
  font-size: 20px;
  background-color: #eaeaea;
}

#delete-button {
  /* position: absolute; */
  right: 30px;
  font-size: 14px;
  background: none;
  border: none;
  color: #a600d8;
  font-weight: 800;
}

#delete-button:hover {
  cursor: pointer;
  color: #ff73d5;
}

.contestant-list {
  display: inline-block;
  width: 90%;
  margin: 20px auto 0 auto;
  text-align: left;
  font-size: 20px;
  overflow: scroll;
  height: 195px;
}

</style>