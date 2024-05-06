<template>
    <div class="carts-confirmed">
        <CardGlobal :carts="cards" />
    </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
    import CardGlobal from '@/components/CardGlobal.vue'
    export default {
        name: 'CardsConfirmed',
        components: {
            CardGlobal,
        },

        computed: {
            
            cards() {
                let allCrads = [

                    {
                        classicon: 'Order-Confirmed',
                        icon: 'bx bx-package',
                        title: 'Order Confirmed',
                        number: `${this.orderConfirmed} / ${this.newOrder}`,
                        pourcentage: 3.20,
                        duration: 'Today'

                    },
                    {

                        classicon: 'confirmation-rate',
                        icon: 'bx bx-chart',
                        title: 'Confirmation Rate',
                        number: `${this.confirmationRate} %`,
                        pourcentage: 3.20,
                        duration: 'Today'
                    }
                ]
                return allCrads
            },

            ...mapState('allOrder', {
                AllNewOrders: state => state.new
            }),
            ...mapState('allOrder', {
                AllOrdersConfirmed: state => state.confirmed
            }),

            newOrder(){
                let numbersOrders=this.AllNewOrders.length
                return numbersOrders
            },

            orderConfirmed(){
                let numbersOrders=this.AllOrdersConfirmed.length
                return numbersOrders
            },

            confirmationRate(){
                let confirmation= Math.floor((this.orderConfirmed / this.newOrder)*100)
                if(this.orderConfirmed ===0 && this.newOrder===0){
                    return 0
                }else if(this.orderConfirmed ===1 && this.newOrder===0){
                    return 0
                }
                else{
                    return confirmation
                }
              
            }

        },

        methods:{
            ...mapActions('allOrder',['ac_fetchAllorders'])
        },

        mounted(){
            this.ac_fetchAllorders()
        }

      
    }
</script>