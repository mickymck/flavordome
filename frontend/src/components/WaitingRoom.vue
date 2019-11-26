<template>
  <div>
    <div>
      <p> logo here? something animated? </p>
    </div>
    <div>
      <h3>Waiting for other users</h3>
    </div>
    <div>
      YOURE THE HOST
      <button @click ='forceNext'>Force Next Round</button>
    </div>
  </div>
</template>

<script>
export default {
  name:'WaitingRoom',
  data:() =>{
    return{
      
    }
  },
  computed:{
    role(){
      return this.$store.getters.getRole()
    } 
  },
  methods:{
    forceNext:(event) => {
      this.$store.state.newSocket.send(JSON.stringify({
        'method':'changeScene',
        'payload':''
      }))
    }
  }
}
</script>

<style scoped>

</style>