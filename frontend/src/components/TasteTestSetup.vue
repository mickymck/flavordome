<template>
  <div class="container" id="taste-test-setup">
    <div>
      <!-- if the taste test name has been entered, this will render -->
      <div v-if="testNameLock">
        <h1>{{ testName }}</h1>
        <Categories />
      </div>
    </div>

    <!-- if the taste test name has not yet been submitted, you will have the field and buttons -->
    <div v-if="!testNameLock">

      <!-- the input field delivers testName, which I render in the header once it is submitted -->
        <input type="input" v-model="testName" id="taste-test-name-field" placeholder="Taste Test Name" @keyup.enter="pushTestName" />
        <div class='test-name-buttons'>

          <!-- the submit button only displays when there is content in the field. once submit is clicked, pushTestName method is run, which locks the testName and renders it -->
          <button id="submit-test-name-button" @click="pushTestName" v-if="testName">Submit</button>

          <!-- if cancel button is clicked, cancelTestName is the event that our App.vue receives, and renders the HostWelcome page again -->
          <button id="cancel-button" @click="cancelTestName">Cancel</button>
        </div>
      </div>
    </div>
</template>

<script>
import Categories from './Categories.vue'

export default {
  name: "TasteTestSetup",
  props: {
    testName: '',
  },
  components:{
    Categories
  },

  // testNameLock determines whether the name renders or the form renders
  data: () => {
    return {
    testNameLock: false
    }
  },

  methods: {
    // returns taster to the Welcome screen by toggling back to false
    cancelTestName() {
      this.$emit('cancelTestName');
      },
    pushTestName() {
      this.testNameLock = true;
      
      }
    }

};

</script>

<style scoped>

#taste-test-name-field {
  font-size: 28px;
  width: 80%;
  height: 50px;
  max-width: 400px;
  text-align: center;
  border: 4px solid #45c3f6;
  color: #a600d8;
  margin: 200px auto 40px auto;
}

.test-name-buttons {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

#submit-test-name-button {
  margin-bottom: 40px;
}

</style>