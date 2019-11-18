<template>
  <div class="container" id="hostWelcome">
    <h1>{{ msg }}</h1>
    <p>FlavorDome logo</p>
    <button id='host-button' @click='startTestSetup'>Host</button>
    <button id='join-button' @click='promptJoin'>Join</button>
  </div>
</template>

<script>

export default {
  name: 'HostWelcome',
  props: {
    msg: String
  },
  methods: {
      startTestSetup: function() {
          alert('setup')
      },
      promptJoin: function() {
          alert('join')
      }
  }
}
</script>

<style scoped>

a {
  color: #42b983;
}

</style>
