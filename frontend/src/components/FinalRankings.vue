<template>
    <transition name="fade" enter-active-class="animated fadeInUp">
    <div class="final-rankings">
        <div class="title">
            <h1>FINAL RANKINGS!</h1>
        </div>
            <ul>

                <li v-for="(challenger,index) in sortedChallengers"> 
                        <div v-if="index == 0" class="champion animated flash infinite delay-2s slow">
                             <div class="rank-container">
                                <div class="rank-col">
                                    <h2> {{ ordinal_suffix(index+1) }}</h2>
                                </div>
                                <div class="name-col">
                                    <h2>{{ challenger.challenger }}</h2>
                                </div>
                            </div>
                            <!-- <div class="rank-container">
                                <h2>{{ ordinal_suffix(index+1) }} {{ challenger.challenger }}</h2>
                                <h2>........  {{ challenger.challenger }}</h2>
                            </div> -->
                        </div>
                        <div v-else>
                            <div class="rank-container">
                                <div class="rank-col">
                                    <h3> {{ ordinal_suffix(index+1) }}</h3>
                                </div>
                                <div class="name-col">
                                    <h3>{{ challenger.challenger }}</h3>
                                </div>
                            </div>
                        </div>
                </li> 
            </ul>
            <transition leave-active-class="animated zoomOutRight">
                <div class="email-container" v-if="!emailSent" >
                    <h3>Send Results to your email!</h3>
                    <input class="user-input-field email-input" type="text" placeholder="example@gmail.com" ref="email"><br>
                    <button @click="send_results">Send Results</button>
                </div>
            </transition>
            <div class="confirmation animated slideInLeft email-confirmation" v-if="emailSent">
                <h2>Email Sent!</h2>
            </div>
    </div>
    </transition>
</template>

<script>

require("animate.css/animate.min.css")

export default {
  name:'FinalRankings',
  computed:{
      sortedChallengers(){
          return this.$store.getters.getFinalRevealChallengers
      }
  },
  data: function () {
      return{
        emailSent:false
      }
  },
  methods: {
    ordinal_suffix:function(i) {
        var j = i % 10
        var k = i % 100
        if (j == 1 && k != 11) {
            return i + "st"
        }
        if (j == 2 && k != 12) {
            return i + "nd"
        }
        if (j == 3 && k != 13) {
            return i + "rd"
        }
        return i + "th"
    },
    send_results:function(){
        let rankedSortedChallengers = []
        let component = this
        this.sortedChallengers.forEach(function(challenger,index) {
            let rank = index+1
            rankedSortedChallengers.push(component.ordinal_suffix(rank) + " " + challenger.challenger)
        })
        console.log(rankedSortedChallengers)
        
        fetch('email/',{
          method:'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify({
            'email':this.$refs.email.value,
            'email-string':rankedSortedChallengers,
          })
        }).then(res => res.json())
        .then(res=>{
            console.log(res)
            if(res['ok']){
                this.emailSent = true
                console.log("email sent!")
            }
        })
    },
  },
}
</script>

<style scoped>
ul{
    color:white;
}
li{
    list-style-type: none;
    text-shadow: 1px 1px 1px black;
    color: gold;
}
input{
    margin-top:1rem !important;
}
h1{
    color:gold;
}
.title{
    margin: 1rem;
    text-shadow: 1px 1px 1px black;
    width:100%
}
.email-container{
    margin-top: 2rem
}
.email-confirmation{
    margin-top:1rem;
    text-shadow: 1px 1px 5px wheat;
    color: lightslategray;
}
.rank-container{
    width:100%;
    display:flex;
}
.rank-col{
    width:30%;
}
.name-col{
    width:70%;
    text-align: left;

}
</style>