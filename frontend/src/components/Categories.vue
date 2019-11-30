<template>
  <div class='categories-container'>
    <div class='cat-and-challenger-wrapper'>
      <div class="category-wrapper">

        <!-- if a category has not been selected, show this cat selection message -->
        <div class='cat-instructions' v-show="!categorySelected">
          <h1>Choose a category,<br>or create your own:</h1>
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
  </div>
</template>

<script>
  import CategoryCard from './CategoryCard.vue'
  import ContestantsWrapper from './ContestantsWrapper.vue'

  const categoryNames = [
    {name: 'Chips',
    message: 'ex: Cape Cod Salt and Vinegar'},

    {name: 'Bourbon',
    message: 'ex: Eagle Rare'},

    {name: 'Cheese',
    message: 'ex: Aged Cheddar'},

    {name: 'Gummies',
    message: 'ex: Haribo Gummy Fruit Salad'},

    {name: 'BBQ Sauce',
    message: "ex: Stubb's Original"},

    {name: 'Chocolate',
    message: 'ex: Godiva 70% Dark'},

    {name: 'Ice Cream',
    message: 'ex: Turkey Hill Naturals Vanilla Bean'},

    {name: 'Hot Dogs',
    message: 'ex: Hebrew National'},

    {name: 'Beer',
    message: 'ex: Wicked Weed Pernicious IPA'}

    // 'Chips',
    // 'Bourbon',
    // 'Cheese',
    // 'Gummies',
    // 'BBQ Sauce',
    // 'Chocolate',
    // 'Ice-cream',
    // 'Hot Dogs',
    // 'Gummies',
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
  margin: 0 auto;
}

.cat-instructions {
  font-size: 20px;
  text-align: center;
  margin: 0 auto 20px auto;
  padding-top: 20px;
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
  margin: 20px auto 0 auto;
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