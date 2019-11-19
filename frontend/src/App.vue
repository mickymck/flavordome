<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to FLAVORDOME"/> -->
    <Categories/>
    <!-- <CategoryCard/> -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Categories from './components/Categories.vue'
// import CategoryCard from './components/CategoryCard.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Categories,
    // CategoryCard,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
