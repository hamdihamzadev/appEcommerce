<template>
    <b-container fluid class="confirmedorders" >
        <h1 class="mb-4"> <strong>Orders confirmed</strong> </h1>
        <CardsConfirmed/>
        <TableConfirmed/>
       
    </b-container>
</template>

<script>

import CardsConfirmed from '@/views/Confirmed/CardsConfirmed.vue'
import TableConfirmed from '@/views/Confirmed/TableConfirmed.vue'


export default{
    name:'ConfirmedOredrs',
    components:{
        CardsConfirmed,
        TableConfirmed,
       
    }

}

</script>

<style scoped>
.chartconfirmation{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>