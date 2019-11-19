<template>
  <div class="categories" >
      <div class="category-card" v-show="!categorySelected" v-for="category in categories" :key="category">
        <CategoryCard v-bind:categoryName="category" v-on:selectCategory='handleSelection'></CategoryCard>
      </div>
      <div class="custom-card" v-show="!categorySelected">
        <form v-on:submit="this.createCustomCategory">
          <input type="text" name="customCategoryName" placeholder="Custom Name" maxlength="10">
          <br>
          <input type="submit" value="Submit">
        </form>
      </div>
      <div class='contestants' v-show="categorySelected">
        <h1>{{ category }}</h1>
        <ContestantsWrapper></ContestantsWrapper>
      </div>
  </div>
</template>

<script>
  import CategoryCard from './CategoryCard.vue'
  import ContestantsWrapper from './ContestantsWrapper.vue'

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

  export default {
    name:"Categories",
    components:{
        CategoryCard,
        ContestantsWrapper,
    },
    data: function () {
        return {
          categories: categoryNames,
          categorySelected: false,
          category:"",

        }
    },
    methods:{
      handleSelection: function(categoryName){
        this.categorySelected = !this.categorySelected
        this.category = categoryName
      },
      createCustomCategory: function(event){
        event.preventDefault();
        const form = event.target
        const formData = new FormData(form)
        this.category = formData.get('customCategoryName')
        this.categorySelected = !this.categorySelected
      }
    },
      
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