import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    testName:'',
    challengers:[],
    scene:'HostWelcome',
    maskedChallengers:[],
    topFour:[]
  },
  mutations:{
    addChallengers(state, challengers){
      state.challengers = challengers.map(challenger => {
        return {'challenger':challenger, 'score':[]}
      })
    },
    maskChallengers(state){
      state.maskedChallengers = state.challengers.map(product => {})
    },
    changeScene(state, scene){
      state.scene = scene
    }
  },
  computed:{
    
  }
  
})