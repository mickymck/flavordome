<template>

    <div class="challenger-card">
        {{ challenger }}
    </div>
    
</template>

<script>

module.exports = {
    props: {
        challenger:String
    },
    data: () => {
        return {
        }
    },
}

</script>

<style scoped>

.challenger-card {
    text-align: center;
    width: 150px;
    height: 150px;
    background-color: #32ebe6;
}

</style>