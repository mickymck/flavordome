<template>
  <div class="categories">
      <div class="category-card" v-for="category in categories" :key="category">
        <CategoryCard v-bind:categoryName="category"></CategoryCard>
      </div>
      <div class="custom-card">
        <form>
          <input placeholder="Custom Name" maxlength="10">
          <br>
          <input type="submit" value="Submit">
        </form>
      </div>
  </div>
</template>

<script>
import CategoryCard from './CategoryCard.vue'

const categoryNames = [
  'Chips',
  'Beers',
  'Wines',
  'Cheeses',
  'Sauces',
  'Pastas',
  'Ice-cream',
  'Donuts',
  'Scotch',
]

export default{
  components:{
      CategoryCard,
  },
  data: function () {
      return {
        categories: categoryNames
      }
  }
    
}
</script>

<style scoped>
.categories{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* align-content: space-around; */
}

form{
  margin-top:10px;
}
input{
  text-align: center;
  width: 100px;
  height:2.25rem;

}
</style>