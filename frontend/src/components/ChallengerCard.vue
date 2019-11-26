<template>

    <div class="challenger-card">
        <div class="challenger-detail">
            {{ challenger.challengerLetter }}
        </div>
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
    display:flex;
    flex-direction: column;
    text-align: center;
    width: 150px;
    height: 150px;
    background-color: #32ebe6;
    align-items:center;
    justify-content: center;
}

</style>