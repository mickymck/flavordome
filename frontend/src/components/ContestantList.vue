<template>
  <div class='contestant-list-container'>
    <div class='contestants-list-wrapper'>
      <div v-if="contestants.length > 0">
        <!-- <div v-if="contestants.length >= 4"> -->
          <!-- <button id='ready-to-taste-button' v-on:click="$emit('submitContestants')">I'm Ready to Taste</button> -->
        <div class='challengers-and-button'>
          <div class='contestant-list'>
            <ul>
              <li v-for="contestant in contestants" v-bind:key='contestant' class='challenger-card'>
                {{contestant}}
                <button class='delete-x' v-on:click="$emit('deleteContestant', contestant)">
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
}

.challengers-and-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

#ready-to-taste-button {
  font-size: 20px;
}

.delete-x {
  right: 30px;
  font-size: 14px;
  background: none;
  border: none;
  color: #ff73d5;
  font-weight: 800;
  box-shadow: none;
  padding: 0;
  margin: 0;
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
  height: 250px;
}

</style>