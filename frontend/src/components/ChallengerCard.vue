<template>

    <div class="challenger-card">
        {{ challenger.challenger }}
    </div>
    
</template>

<script>

module.exports = {
    props: {
        challenger:Object
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