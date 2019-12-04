<template>
  <transition name='modal-fade'>
    <div class='modal-backdrop'>
      <div class='modal'>
        <p class='delete-x' @click='closeModal'>X</p>
        <div class='tutorial'>
          <video src="https://flavordome.s3.us-east-2.amazonaws.com/flavordome_demo_video_2.mp4" poster="https://flavordome.s3.us-east-2.amazonaws.com/flavordome-logo-small.png" height="500px" autoplay controls preload="auto">
          </video>
        </div>
        <!-- <button @click='closeModal'>Close</button> -->
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
  .delete-x {
    display: flex;
    justify-content: flex-end;
    font-size: 20px;
    color: #ff73d5;
    font-weight: 900;
    padding: 0;
    margin-right: 8px;
    margin-top: 8px;
}
.delete-x:hover {
  cursor: pointer;
}
  
</style>