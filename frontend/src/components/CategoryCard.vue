<template>
    <div class="category-card">
        <h1>{{ categoryName }}</h1>
    </div>
</template>

<script>
module.exports = {
    props: ['categoryName'],
    data:function(){
        return{

        }
    }
}
</script>

<style scoped>
*{
    box-sizing:border-box;
    margin:0;
    /* padding:0; */
}
.category-card{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 5px;
    height:100px;
    width:100px;
    background-color: #45c3f6;
    margin:5px;
    display:table;
}
.category-card h1{
    font-size: 1.25rem;
    display:table-cell;
    vertical-align: middle;
}

.category-card:hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

</style>