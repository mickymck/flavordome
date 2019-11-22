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
    },
    openSocket(state, socket){
      state.newSocket = socket
    },
    printData(state, payload){
      console.log(payload)
    }
  },
  getters:{
    getTopFour(state){
      return state.topFour.slice()
    }
  },
  actions:{
    createSocket({commit, dispatch, state}){
      const newSocket = new WebSocket(
        'ws://' + window.location.host +
        '/ws/' + '1234' + '/'
      )
      newSocket.onmessage = function(event) {
        dispatch('handleSocket', (JSON.parse(event.data)))
      }
      commit('openSocket', newSocket)
    },
    handleSocket({commit, state}, data){
      console.log("now logging")
      console.log(data)
      commit(data.method, data.payload)
    }
  }
})