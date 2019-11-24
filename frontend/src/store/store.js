import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    testName:'',
    challengers:[],
    scene:'HostWelcome',
    maskedChallengers:[],
    topFour:[],
    finalists: [],
    champion: []
  },
  mutations:{
    addChallengers(state, challengers){
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
          finalAvg: null
      }
      })
    },
    maskChallengers(state){
      // state.maskedChallengers = state.challengers.map(product => {})
      // state.maskedChallengers = state.challengers.slice(0)

      // const challengerIndex = Math.floor(Math.random()*this.remainingCards.length)
      // this.currentCard = this.remainingCards.splice(randCardIndex,1)[0]

      let challengerGoBetween = state.challengers.slice(0)
      let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

      while (challengerGoBetween.length > 0) {
        let randomChallengerIndex = Math.floor(Math.random()*challengerGoBetween.length)
        let selectedChallenger = challengerGoBetween[randomChallengerIndex]
        state.maskedChallengers.push(selectedChallenger)
        challengerGoBetween.splice(challengerGoBetween.indexOf(selectedChallenger), 1)
      }

      for (let challenger of state.challengers) {
        challenger.challengerNumber = state.maskedChallengers.indexOf(challenger)+1
      }

      while (state.maskedChallengers.length > 0) {
        let randomLetterIndex = Math.floor(Math.random()*state.maskedChallengers.length)
        let selectedLetter = alphabet[randomLetterIndex]
        console.log(selectedLetter)
        for (let challenger of state.challengers) {
          challenger.challengerLetter = selectedLetter
        }
        state.maskedChallengers.splice(state.maskedChallengers.indexOf(selectedLetter), 1)
      }

      // for (let challenger of challengerGoBetween) {
      //   // if (selectedChallenger === state.maskedChallengers[-1]) {
      //   //   challengerGoBetween.splice(challengerGoBetween.indexOf(challenger, 1))
      //   // }
      //   // challengerGoBetween.splice(challengerGoBetween.indexOf('state.maskedChallengers[-1]', 1))
      //   challengerGoBetween.splice(selectedChallenger, 1)

        // state.maskedChallengers.splice((randomChallengerIndex),1)
        // challenger.challengerNumber = state.maskedChallengers.indexOf(challenger)+1
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
    addSemiScores(state, semiChallenger) {
      for (let challenger of state.challengers) {
        if (challenger.challenger === semiChallenger.challenger) {
          challenger.semiScores.push(semiChallenger.rating)
          challenger.semiAvg = challenger.semiScores.reduce((a, b) => a+b, 0)/challenger.semiScores.length
        }
      }
    },
    addFinalistScores(state, finalChallenger) {
      for (let challenger of state.challengers) {
        if (challenger.challenger === finalChallenger.challenger) {
          challenger.finalScores.push(finalChallenger.rating)
          challenger.finalAvg = challenger.finalScores.reduce((a, b) => a+b, 0)/challenger.finalScores.length
        }
      }
    },
    setTopFour(state){
      let sorted = state.challengers.sort((a, b) => (b.average - a.average))
      state.topFour = sorted.slice(0,4)
    },
    setFinalists(state){
      let sorted = state.challengers.sort((a, b) => (b.semiAvg - a.semiAvg))
      state.finalists = sorted.slice(0,2) 
    },
    setChampion(state){
      let sorted = state.finalists.sort((a, b) => (b.finalAvg - a.finalAvg))
      state.champion = sorted.slice(0,1) 
    }
  },
  getters:{
    getTopFour(state){
      return state.topFour.slice()
    },
    getFinalists(state){
      return state.finalists.slice()
    },
    getChampion(state){
      return state.champion.slice()
    }
  }
})