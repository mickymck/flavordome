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
    shuffledTopFour:[],
    finalists: [],
    champion: [],//the top two challengers
    playerCount: 1,
    role:'guest',
    roomNum:'',
    readyCount:0,
    categoryChoice:[],
    remainingChallengers:[], //remaining challengers to rate in Melee rating populates in stateSetup
    currentChallenger:null,
    finalReveal: {
      'loser':false,
      'third':false,
      'second':false,
      'first':false,
    },
    finalRevealChallengers:[],
    lastMeleeRound: false,
    showFinalRankings:false,

  },
  mutations:{
    addChallengers(state, challengers){
      state.role = 'host'
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
      //setup state.remainingChalleters
      // Durstenfield Shuffle algorithm
      let shuffledArray = state.challengers.slice()
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      //setup state.currentChallenger
      state.currentChallenger = shuffledArray.pop()
      state.remainingChallengers = shuffledArray
    },
    changeScene(state, scene) {
      state.scene = scene
    },
    grabCategory(state, category){
      state.categoryChoice = category
    },
    notifyReady(state){
      state.readyCount += 1
      if (state.readyCount === state.playerCount && state.role === 'host' && state.remainingChallengers.length !== 0){
        state.currentChallenger = state.remainingChallengers.pop()
        if (state.remainingChallengers.length === 0) {
          state.lastMeleeRound = true
          state.newSocket.send(JSON.stringify({
            'method':'sendLastMeleeRound', 
            'payload':state.lastMeleeRound
          }))
        }

        state.newSocket.send(JSON.stringify({
          'method':'sendNextChallenger', 
          'payload':state.currentChallenger
        }))
        
        state.newSocket.send(JSON.stringify({
          'method':'changeScene', 
          'payload': 'MeleeRating'
        }))
      }
    },

    forceMelee(state){
      state.readyCount += 1

      if (state.role === 'host'){

        state.currentChallenger = state.remainingChallengers.pop()

        if (state.remainingChallengers.length === 0) {
          state.lastMeleeRound = true
          state.newSocket.send(JSON.stringify({
            'method':'sendLastMeleeRound', 
            'payload':state.lastMeleeRound
          }))
        }

        state.newSocket.send(JSON.stringify({
          'method':'sendNextChallenger', 
          'payload':state.currentChallenger
        }))
        
        state.newSocket.send(JSON.stringify({
          'method':'changeScene', 
          'payload': 'MeleeRating'
        }))
      }
    },

    readyFinals(state){
      state.readyCount +=1
    },
    readyRankings(state){
      state.readyCount +=1
    },
    addPlayer(state){
      if (state.role === 'host'){
        state.playerCount += 1
        state.newSocket.send(JSON.stringify({
          'method':'setPlayers',
          'payload':state.playerCount
        }))
        state.newSocket.send(JSON.stringify({
          method:'setupState',
          payload: state
        }))
      }
    },
    removePlayer(state){
      if (state.role === 'host'){
        state.playerCount -= 1
        state.newSocket.send(JSON.stringify({
          'method':'setPlayers',
          'payload':state.playerCount
        }))
      }
    },
    setTestName(state, testName){
      state.testName = testName
    },
    setCategory(state, category){
      state.category = category
    },
    setPlayers(state, hostCount){
      if (state.role !== 'host'){
        state.playerCount = hostCount
      }
    },
    addScore(state, submission){
      for (let challenger of state.challengers){
        if (challenger.challenger === submission.challenger) {
          challenger.scores.push(submission.rating)
          challenger.average = challenger.scores.reduce((a, b) => a + b, 0) / challenger.scores.length
        }
      }
    },
    resetMeleeScoreCount(state){
      state.readyCount = 0
    },
    bulkRanking(state, rankedChallengers){
      state.challengers.map(challenger => {
        for (let incoming of rankedChallengers){
          if (challenger.challenger === incoming.challenger){
            challenger.scores.push(incoming.rating)
            challenger.average = challenger.scores.reduce((a, b) => a + b, 0) / challenger.scores.length
          }
        }
        return challenger
      })
    },
    addSemiScores(state, semiChallenger) {
      for (let challenger of state.challengers) {
        if (challenger.challenger === semiChallenger.challenger) {
          challenger.semiScores.push(semiChallenger.rating)
          challenger.semiAvg = challenger.semiScores.reduce((a, b) => a + b, 0) / challenger.semiScores.length
        }
      }
    },
    // sendSemiScores(state, semiChallenger, score){
    //   for (let challenger of state.challengers) {
    //     if (challenger.challenger === semiChallenger.challenger) {
    //       challenger.semiScores.push(semiChallenger.rating)
    //       challenger.semiAvg = challenger.semiScores.reduce((a, b) => a + b, 0) / challenger.semiScores.length
    //     }
    //   }
    // },
    addFinalistScores(state, finalChallenger) {
      for (let challenger of state.challengers) {
        // if (challenger.challenger === finalChallenger.challenger) {
        if (challenger.challenger === finalChallenger.challenger) {
          challenger.finalScores.push(finalChallenger.rating)
          challenger.finalAvg = challenger.finalScores.reduce((a, b) => a + b, 0) / challenger.finalScores.length
        }
      }
    },
    setTopFour(state){
        let sorted = state.challengers.sort((a, b) => (b.average - a.average))
        state.challengers = sorted
        state.topFour = sorted.slice(0,4)
    },
    shuffleTopFour(state){
      let shuffledArray = state.topFour.slice()
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      } 
      state.shuffledTopFour = shuffledArray
    },
    setupSemifinals(state, payload){
      state.topFour = payload.topFour
      state.shuffledTopFour = payload.shuffledTopFour
      state.readyCount = 0
    },
    setupFinals(state,payload){
      state.finalists = payload.finalists
      state.readyCount = 0
    },
    setDirectHeadToHead(state){
      state.topFour = state.challengers.slice()
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
    // setChampions(state) {
    //   let sorted = state.finalists.sort((a, b) => (b.finalAvg - a.finalAvg))
    //   let sortedChallengers = state.challengers.slice()
    //   let champion1 = sorted[0], champion2 =sorted[1]
    //   let champ1Index= null, champ2Index= null
    //   if(sortedChallengers.length > 2){
    //     for(let i = 0; i < sortedChallengers.length; i++){
    //         if(sortedChallengers[i].challenger === champion1.challenger) champ1Index = i
    //         if(sortedChallengers[i].challenger === champion2.challenger) champ2Index = i
    //     }
    //     let firstPlace = sortedChallengers.splice(champ1Index,1)
    //     let secondPlace = sortedChallengers.splice(champ2Index,1)
    //     sortedChallengers.unshift(secondPlace[0])
    //     sortedChallengers.unshift(firstPlace[0])
    //   }
    //   state.finalRevealChallengers = sortedChallengers
    // },
    setShortChallengeChamp(state){
      let sorted = state.challengers.sort((a, b) => (b.semiAvg - a.semiAvg))
      state.champion = sorted.slice()
    },
    setupState(state, payload){
      state.testName = payload.testName
      state.challengers = payload.challengers
      state.remainingChallengers = payload.remainingChallengers 
      state.currentChallenger = payload.currentChallenger
    }, 
    saveRoomNumber(state, roomNum){
      state.roomNum = roomNum
    },
    sendNextChallenger(state, nextChallenger){
      state.currentChallenger = nextChallenger
      state.readyCount = 0
    },
    chooseNextChallenger(state){
      state.currentChallenger = state.remainingChallengers.pop()
    },
    sendLastMeleeRound(state, lastMeleeRound){
      state.lastMeleeRound = lastMeleeRound
    },
    
    setupFinalReveal(state){
      let sorted = state.challengers.slice().sort((a, b) => (b.finalAvg - a.finalAvg))
      let sortedChallengers = state.challengers.filter(challenger => challenger.finalAvg === null).sort((a,b) => (b.average - a.average))
      // for(let c of sorted){console.log(c.challengerLetter)}
      state.champion = sorted.slice(0,2) 
      let champion1 = sorted[0], champion2 = sorted[1]
      let champ1Index= null, champ2Index= null
      // console.log("sorted challengers should not have any with finalAvg")
      // for(let c of sortedChallengers){console.log(c.challengerLetter)}
      sortedChallengers.unshift(champion2)
      sortedChallengers.unshift(champion1)
      // console.log("sorted challengers after all unshifts")
      // for(let c of sortedChallengers){console.log(c.challengerLetter)}
      state.finalRevealChallengers = sortedChallengers
    },
    revealNext(state){
      for(let index in state.finalReveal){
        if(state.finalReveal[index] === false){
          state.finalReveal[index] = true
          break
        }
      }
    },
    sendShowFinalRankings(state){
      state.showFinalRankings = true
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
    },
    getChallengers(state){
      return state.challengers.map(a => a)
    },
    getAvgScore(state){
      return state.challengers.map(a => a.average)
    },
    getPlayerCount(state){
      return state.playerCount
    },
    getRoomNum(state){
      return state.roomNum
    },
    getReadyPlayers(state){
      return state.readyCount
    },
    getCurrentChallenger(state){
      return state.currentChallenger
    },
    getShuffledTopFour(state){
      return state.shuffledTopFour.slice()
    },
    getFinalRevealChallengers(state){
      return state.finalRevealChallengers.slice()
    },
    getFirstReveal(state){
      return state.finalReveal['first']
    },
    getSecondReveal(state){
      return state.finalReveal['second']
    },
    getThirdReveal(state){
      return state.finalReveal['third']
    },
    getLoserReveal(state){
      return state.finalReveal['loser']
    },
    getTestName(state){
      return state.testName
    }
  },
  actions:{
    createSocket({commit, dispatch, state}){
      const roomNum = Math.floor(100000 + Math.random()*900000)
      
      const newSocket = new WebSocket(
        'wss://' + window.location.host +
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
        'wss://'+ window.location.host + 
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