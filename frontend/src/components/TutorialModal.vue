<template>
  <transition name='modal-fade'>
    <div class='modal-backdrop'>
      <div class='modal'>
        <div class='tutorial'>
          THE TUTORIAL GOES HERE
        </div>
        <button @click='closeModal'>Close</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name:'TutorialModal',
  methods:{
    closeModal(){
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>
  .modal-backdrop{
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    background-color:rgba(0,0,0,.35);
    display:flex;
    justify-content: center;
    align-items: center;
  }
  .modal{
    background: #ffffff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display:flex;
    flex-direction: column;
  }
  .modal-fade-enter, .modal-fade-leave-active{
    opacity: 0;
  }
  .modal-fade-enter-active, .modal-fade-leave-active{
    transition: opacity .5s ease;
  }
  
</style>