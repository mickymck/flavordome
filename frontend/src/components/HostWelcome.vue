<template>
  <div class='host-welcome-container'>
    <div id="host-welcome">
      <div class='logo-wrapper'>
      <div class='flavordome-logo'></div>
      </div>
      <div>
        <!-- this is the first thing rendered, before the Host or Join buttons are clicked -->
        <div v-if="!tasterJoin" class='welcome-buttons'>
          <button id="host-button" @click="setupScene">Host</button>
          <button id="join-button" @click="promptJoin">Join</button>
        </div>
        <!-- if the Join button is clicked, this is the div that will be rendered, while the previous div is hidden -->
        <div v-if="tasterJoin" class='join-code-div'>
          <input type="input" class='user-input-field' id="enter-code-field" v-model='roomNum' placeholder="Enter Code" />
          <div class='join-buttons'>
            <button id="submit-code-button" @click="submitCode">Submit</button>
            <button class="cancel-button" @click="cancelJoin">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TasteTestSetup from './TasteTestSetup.vue';

export default {
  name: "HostWelcome",
  props: {
  },
  // default setting for the Host/Join decision... can be toggled if the user wishes to Join
  data: () => {
    return {
      tasterJoin: false, 
      roomNum: null
    };
  },

  methods: {
    // event emitter added to the Host button, which speaks to the App.vue and tells it to moveToSetup
    setupScene() {
      this.$emit('setupScene')
    },
    // toggles tasterJoin to render the text field div
    promptJoin: function() {
      this.tasterJoin = true;
    },
    // returns taster to the Welcome screen by toggling back to false
    cancelJoin: function() {
      this.tasterJoin = false;
    },
    submitCode: function() {
      const roomNum = this.roomNum
      this.$store.dispatch('joinSocket', roomNum)
      this.$store.commit('changeScene', 'WaitingRoom')
    }
  }
};
</script>

<style scoped>

#host-welcome {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  align-content: center;
  justify-content: center;
}

.logo-wrapper {
  max-height: 180px;
}

.welcome-buttons {
  width: 80%;
  max-width: 400px;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
}

#host-button {
  min-width: 100px;
  margin-top: 80px;
}

#join-button {
  min-width: 100px;
  margin-top: 80px;
}
/* 
#enter-code-field {
  font-size: 32px;
  width: 80%;
  max-width: 400px;
  text-align: center;
  border: 4px solid #45c3f6;
  color: #a600d8;
  margin: 0 auto 40px auto;
} */

.join-code-div {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.join-buttons {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

/* #submit-code-button {
  margin-bottom: 40px;
} */


</style>
