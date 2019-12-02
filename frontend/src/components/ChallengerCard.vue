<template>
    <div class='challenger-card-container'>
        <div class="challenger-square">
            <div class="challenger-detail">
                {{ challenger.challengerLetter }}
            </div>
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

.challenger-square {
    width:20vw;
    margin:auto;
    height:20vw;
    max-width: 150px;
    max-height: 150px;
    font-size: 3rem;
    display:flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items:center;
    
    background: white;
    border-top: 30px solid #a600d8;
    border-right: 30px solid #32ebe6;
    border-bottom: 30px solid #ff73d5;
    border-left: 30px solid #45c3f6;
    color: #a600d8;
}

</style>