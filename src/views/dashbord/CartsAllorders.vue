<template>
    <div class="analytnewOrder">
        <CardGlobal :carts="cards" />
    </div>
</template>

<script>
    import CardGlobal from '@/components/CardGlobal.vue'
    import {
        mapActions,
        mapState,
    } from 'vuex'
    export default {
        name: 'CartsAllorders',
        components: {
            CardGlobal
        },

        computed: {
            cards() {
                let allcards = [{
                        classicon: 'allorders',
                        icon: 'bx bx-shopping-bag',
                        title: 'All Orders',
                        number: this.newOrder,
                        pourcentage: 2.43
                    },
                    {
                        classicon: 'income',
                        icon: 'bx bx-money',
                        title: 'Sales',
                        number: this.sales,
                        dollar: '$',
                        pourcentage: 2.43
                    },
                    {
                        classicon: 'views',
                        icon: 'bx bx-show',
                        title: 'All Views',
                        number: this.viewsStore,
                        pourcentage: 2.43
                    },

                ]
                return allcards
            },

            ...mapState('views',{
                viewsStore:state=>state.views
            }),
            ...mapState('allOrder', {
                AllNewOrders: state => state.new
            }),

            newOrder(){
                let numbersOrders=this.AllNewOrders.length
                return numbersOrders
            },

            sales(){
                let totalSales=this.AllNewOrders.reduce((accu,order)=>{
                    return accu + order.total
                },0)
                return totalSales
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