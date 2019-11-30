<template>
    <div class='category-card-container'>
        <div class="category-card">
            <h1 v-on:click="$emit('selectCategory',categoryName)">{{ categoryName.name }}</h1>
        </div>
    </div>
</template>

<script>
module.exports = {
    props: ['categoryName'],
    data:function(){
        return{

        }
    },
}
</script>

<style scoped>
*{
    box-sizing:border-box;
    margin:0;
    /* padding:0; */
}
/* .category-card{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    height:100px;
    width:100px;
    background-color: #45c3f6;
    margin:5px;
    display:table;
} */

.category-card{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    height:100px;
    width:100px;
    margin:5px;
    display:table;
    padding: 5px 5px;
    background: white;
    border: 2px solid #32ebe6;
    color: #a600d8;
    border-radius: 5px;
    transition: transform .1s ease-out;
}

.category-card h1{
    font-size: 1rem;
    display:table-cell;
    vertical-align: middle;
}

.category-card:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    transform: scale(1.1);
    cursor: pointer;
}

</style>