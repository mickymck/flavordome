<template>
  <div class='cat-and-challenger-wrapper'>
    <div class="category-wrapper">
      <div class='cat-instructions' v-show="!categorySelected">
        Choose a category, or create your own:
      </div>
      <div class='categories'>
        <div class="category-card" v-show="!categorySelected" v-for="category in categories" :key="category">
          <CategoryCard v-bind:categoryName="category" v-on:selectCategory='handleSelection'></CategoryCard>
        </div>
      </div>
      <div class="custom-card" v-show="!categorySelected">
        <form v-on:submit="this.createCustomCategory">
          <input type="text" name="customCategoryName" class="user-input-field" placeholder="Create Category" maxlength="20">
          <br>
          <button id="submit-button" type="submit">Submit</button>
          <!-- <input type="submit" value="Submit"> -->
        </form>
      </div>
    </div>
    <div class='contestants' v-show="categorySelected">
        <!-- <h1>{{ category }}</h1> -->
      <ContestantsWrapper></ContestantsWrapper>
    </div>
  </div>
</template>

<script>
  import CategoryCard from './CategoryCard.vue'
  import ContestantsWrapper from './ContestantsWrapper.vue'

  const categoryNames = [
    'Chips',
    'Beer',
    'Hot Dogs',
    'Cheese',
    'BBQ Sauce',
    'Chocolate',
    'Ice-cream',
    'Donuts',
    'Bourbon',
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

.cat-and-challenger-wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  margin-bottom: 40px;
}

.categories{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* align-content: space-around; */
}

.category-wrapper {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: 800px;
}

.cat-instructions {
  font-size: 20px;
  text-align: center;
  margin: 0 auto 20px auto;
}

/* form{
  margin-top:10px;
} */

input.user-input-field {
  font-size: 20px;
  width: 90%;
  height: 50px;
  max-width: 400px;
  text-align: center;
  border: 2px solid #a600d8;
  color: #a600d8;
  margin: 50px auto 40px auto;
}

.contestants {
  margin: 0;
}

input{
  text-align: center;
  width: 100px;
  height:2.25rem;

}
</style>