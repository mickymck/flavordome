<template>
  <div class='taste-test-setup-container'>
    <div id="taste-test-setup">
      <div>
        <!-- if the taste test name has been entered, this will render -->
        <div class='taste-test-name' v-if="testNameLock">
          <!-- <h1>{{ testName }}</h1> -->
          <Categories />
        </div>
      </div>

      <!-- if the taste test name has not yet been submitted, you will have the field and buttons -->
      <div v-if="!testNameLock">

        <div class='name-instructions'>
          <h1>Name your taste test:</h1>
        </div>

        <!-- the input field delivers testName, which I render in the header once it is submitted -->
          <input type="input" v-model="testName" class="user-input-field" placeholder="ex: The Great Cheese Off" @keyup.enter="pushTestName" />
          <div class='test-name-buttons'>

            <!-- the submit button only displays when there is content in the field. once submit is clicked, pushTestName method is run, which locks the testName and renders it -->
            <button id="submit-test-name-button" @click="pushTestName" v-if="testName">Submit</button>

            <!-- if cancel button is clicked, cancelTestName is the event that our App.vue receives, and renders the HostWelcome page again -->
            <button class="cancel-button" @click="cancelTestName">Cancel</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Categories from './Categories.vue'

export default {
  name: "TasteTestSetup",
  components:{
    Categories
  },

  // testNameLock determines whether the name renders or the form renders
  data: () => {
    return {
      testName:'',
      testNameLock: false
    }
  },

  methods: {
    // returns taster to the Welcome screen by toggling back to false
    cancelTestName() {
      this.$emit('cancelTestName');
    },
    pushTestName() {
      this.$store.commit('setTestName', this.testName)
      this.testNameLock = true;
      this.$store.dispatch('createSocket')
      this.$store.state.commit('')
    },
    handleBack() {
      this.testNameLock = false
    }
  },

  activated:function(){
    this.testNameLock = false
  }
};

</script>

<style scoped>

.taste-test-name {
  color: white;
}

.name-instructions{
  font-size: 30px;
  text-align: center;
  margin: 0 auto;
  padding-top: 50px;
  color: white;
}

.user-input-field {
  margin-top: 60px;
}

.test-name-buttons {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 150px;
}

</style>