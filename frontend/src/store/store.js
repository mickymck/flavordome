import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    testName:'',
    challengers:[],
    scene:'HostWelcome',
    numberMask:[],
    letterMask:[],
    topFour:[],
    finalists: [],
    champion: [],
    playerCount: 1,
    role:'guest'
  },
<<<<<<< HEAD
  mutations: {
    addChallengers(state, challengers) {
=======
  mutations:{
    addChallengers(state, challengers){
      state.role = 'host'
>>>>>>> 5e19f8bd1cc7e68fd67e1ded5f81c4e575326b9c
      state.challengers = challengers.map(challenger => {
        return {
          'challenger':challenger,
          'scores':[],
          challengerNumber: null,
          challengerLetter: '',
          average: null,
          semiScores: [],
          semiAvg: null,
          finalScores: [],
          finalAvg: null,
          rank:'',
        }
      })
    },
    maskChallengers(state){
      // state.maskedChallengers = state.challengers.map(product => {})

      let challengerGoBetween = state.challengers.slice(0)

      let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

      while (challengerGoBetween.length > 0) {
        let randomChallengerIndex = Math.floor(Math.random()*challengerGoBetween.length)
        let selectedChallenger = challengerGoBetween[randomChallengerIndex]
        state.numberMask.push(selectedChallenger)
        challengerGoBetween.splice(challengerGoBetween.indexOf(selectedChallenger), 1)

        for (let challenger of state.challengers) {
          challenger.challengerNumber = state.numberMask.indexOf(challenger)+1
        }
      }

      let letterGoBetween = state.numberMask.slice(0)

      while (letterGoBetween.length > 0) {
        let randomChallengerIndex = Math.floor(Math.random()*letterGoBetween.length)
        let selectedChallenger = letterGoBetween[randomChallengerIndex]
        state.letterMask.push(selectedChallenger)
        letterGoBetween.splice(letterGoBetween.indexOf(selectedChallenger), 1)

        for (let challenger of state.challengers) {
          challenger.challengerLetter = alphabet[state.letterMask.indexOf(challenger)]
        }
      }
    },
    changeScene(state, scene) {
      state.scene = scene
    },
    addPlayer(state){
      state.playerCount += 1
    },
    addScore(state, submission){
      for (let challenger of state.challengers){
        if (challenger.challenger === submission.challenger) {
          challenger.scores.push(submission.rating)
          challenger.average = challenger.scores.reduce((a, b) => a + b, 0) / challenger.scores.length
        }
      }
    },
    addSemiScores(state, semiChallenger) {
      for (let challenger of state.challengers) {
        if (challenger.challenger === semiChallenger.challenger) {
          challenger.semiScores.push(semiChallenger.rating)
          challenger.semiAvg = challenger.semiScores.reduce((a, b) => a + b, 0) / challenger.semiScores.length
        }
      }
    },
    addFinalistScores(state, finalChallenger) {
      for (let challenger of state.challengers) {
        if (challenger.challenger === finalChallenger.challenger) {
          challenger.finalScores.push(finalChallenger.rating)
          challenger.finalAvg = challenger.finalScores.reduce((a, b) => a + b, 0) / challenger.finalScores.length
        }
      }
    },
    setTopFour(state) {
      let sorted = state.challengers.sort((a, b) => (b.average - a.average))
      state.challengers = sorted
      state.topFour = sorted.slice(0, 4)
    },
    openSocket(state, socket){
      state.newSocket = socket
    },
    printData(state, payload){
      console.log(payload)
    },
    setFinalists(state){
      let sorted = state.challengers.sort((a, b) => (b.semiAvg - a.semiAvg))
      state.finalists = sorted.slice(0, 2)
    },
    setChampion(state) {
      let sorted = state.finalists.sort((a, b) => (b.finalAvg - a.finalAvg))
      state.champion = sorted.slice(0,1) 
    },
    setupState(state, payload){
    state.testName = payload.testName
    state.challengers = payload.challengers
    }, 
    saveRoomNumber(state, roomNum){
      state.roomNum = roomNum
    }
  },
  getters: {
    getTopFour(state) {
      return state.topFour.slice()
    },
    getFinalists(state) {
      return state.finalists.slice()
    },
    getChampion(state) {
      return state.champion.slice()
    },
    getChallengersByNumber(state){
      return state.challengers.sort((a,b)=> (a.challengerNumber - b.challengerNumber)).slice()
    },
    getRole(state){
      return state.role
    }
  },
  actions:{
    createSocket({commit, dispatch, state}){
      const roomNum = Math.floor(100000 + Math.random()*900000)
      
      const newSocket = new WebSocket(
        'ws://' + window.location.host +
        '/ws/' + roomNum + '/'
      )
      newSocket.onopen = function(event){
        commit('saveRoomNumber', roomNum)
      }
      newSocket.onmessage = function(event) {
        dispatch('handleSocket', (JSON.parse(event.data)))
      }
      commit('openSocket', newSocket)
    },
    joinSocket({commit, dispatch}, roomNum){
      const newSocket = new WebSocket(
        'ws://'+ window.location.host + 
        '/ws/' + roomNum + '/'
      )
      newSocket.onopen = function(event){
        newSocket.send(JSON.stringify({
          'method':'addPlayer',
          'payload':null
        }))
      }
      newSocket.onmessage = function(event){
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