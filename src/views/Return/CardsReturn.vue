<template>
    <div class="mb-4">
        <CardGlobal :carts="cards" />
    </div>
</template>

<script>
    import CardGlobal from '@/components/CardGlobal.vue'
    import {
        mapState,
        mapActions
    } from 'vuex'
    export default {
        name: 'CardsReturn',
        components: {
            CardGlobal,
        },

        computed: {
            cards() {
                let allCards = [{
                        classicon: 'Shipped',
                        icon: 'bx bx-trip',
                        title: 'Order Return',
                        number: `${this.NumberOrdersReturn} / ${this.NumberOrdersShipped}`,
                        pourcentage: 5.43,
                        duration: 'Days'
                    },

                    {
                        classicon: 'income',
                        icon: 'bx bx-money',
                        title: 'Return Rate',
                        number: `${this.returnRate} %`,
                        pourcentage: 2.43,
                        duration: 'Days'
                    },

                ]

                return allCards
            },

            ...mapState('allOrder', {
                AllOrdersShipped: state => state.shipped
            }),

            ...mapState('allOrder', {
                AllOrdersReturn: state => state.return
            }),

            NumberOrdersShipped() {
                let numbers = this.AllOrdersShipped.length
                return numbers
            },

            NumberOrdersReturn() {
                let numbers = this.AllOrdersReturn.length
                return numbers
            },

            returnRate(){
                let percentage= Math.floor((this.NumberOrdersReturn/this.NumberOrdersShipped)*100)
                if(this.NumberOrdersReturn===0 && this.NumberOrdersShipped===0){
                    return 0
                }else if (this.NumberOrdersReturn===1 && this.NumberOrdersShipped===0){
                    return 0
                }
                else{
                    return percentage
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