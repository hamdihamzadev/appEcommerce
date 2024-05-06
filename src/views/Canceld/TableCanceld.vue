<template>

    <div class="tabelCanceld mt-4">
        <TableGlobal 
        :orders="ordersCancled"
        :options="options" 
        @remove-order="removeorder"
        sentenceorders="No order canceld today"
         />
    </div>

</template>


<script>
    import {
        mapState,
        mapActions
    } from 'vuex'
    import TableGlobal from '@/components/TableGlobal.vue'

    export default {
        name: 'TableCanceld',
        components: {
            TableGlobal
        },
        data() {
            return {
                options: ['Confirmed', 'Canceled'],
            }
        },
        computed: {
            // GET DATA CANCELD FROM VUEX 
            ...mapState('OrderCancelled', {
                StoreOrdersCanceld: state=>state
            }),

            ordersCancled(){
                let allOrdersCanceld=[]
                Object.values(this.StoreOrdersCanceld).forEach(tableCtg=>{
                    tableCtg.length>0 ? tableCtg.forEach(order=>{allOrdersCanceld.push(order)}) : ''
                })

              return  allOrdersCanceld.sort((orderA , orderB)=>{ return orderA.ref - orderB.ref })
            }
        },

    

         methods:{
        // GET ACTION ORDER CANCELD 
        ...mapActions('OrderCancelled',['ac_fetchOrdersCancelled','ac_RemoveOrderCancelled','ac_addOrderCancelled']),
        //REMOVE ORDER CANCELD
        removeorder(data){
           for(const categoryKey in this.StoreOrdersCanceld){
            this.StoreOrdersCanceld[categoryKey].forEach(order=>{
                order.date === data.date ? this.ac_RemoveOrderCancelled({ category: categoryKey,date: data.date }) : ''
            })
           }
        }
         },

         mounted(){
            this.ac_fetchOrdersCancelled()
         }
    }
</script>



<style>
    .tabelCanceld {
        border-radius: 12px;
    }
</style>