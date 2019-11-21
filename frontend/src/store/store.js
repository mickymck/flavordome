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
        return {'challenger':challenger, 'scores':[], average:null}
      })
    },
    maskChallengers(state){
      state.maskedChallengers = state.challengers.map(product => {})
    },
    changeScene(state, scene){
      state.scene = scene
    },
    addScore(state, submission){
      for (let challenger of state.challengers){
        if (challenger.challenger === submission.challenger) {
          challenger.scores.push(submission.rating)
          challenger.average = challenger.scores.reduce((a, b) => a+b, 0)/challenger.scores.length
        }
      }
    },
    setTopFour(state){
      let sorted = state.challengers.sort((a, b) => (b.average - a.average))
      state.topFour = sorted.slice(0,4)
    }
  },
  getters:{
    getTopFour(state){
      return state.topFour.slice()
    }
  }
})