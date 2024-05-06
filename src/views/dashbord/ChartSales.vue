<template>
    <div class="chart-views">
        <div class="headline">
            <h6 class="title">Total Revenue in this year</h6>
            <h3 class="order-sexmonths">{{ totalRevenueYear }} $</h3>
        </div>
        <canvas id="myviews"></canvas>
    </div>

</template>

<script>
    import Chart from 'chart.js/auto';
    import { mapState ,mapActions} from 'vuex';
    export default {

        name: 'ChartSales',
        computed: {
            ...mapState('allOrder', {
                newOrders: state => state.new
            }),
            OrdersYear() {
                let ordersAllMonths = []
                for (let i = 0; i < 12; i++) {
                    let ordersMonth = this.newOrders.filter(order => order.date.split('/')[1] === (i + 1).toString())
                    let revenue= ordersMonth.reduce((accu,order)=> accu+order.total ,0)
                    ordersAllMonths.push(revenue)
                }
                return ordersAllMonths
            },

            totalRevenueYear(){
                let revenue=this.OrdersYear.reduce((accu,month)=> accu+month , 0)
                return revenue
            }
        },
        methods: {
            ...mapActions('allOrder',['ac_fetchAllorders']),
            canvas() {
                const ctx = document.getElementById('myviews');
                const data = {
                    
                    labels: [

                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'

                    ],
                    datasets: [{
                        label: 'Total Sales',
                        data: this.OrdersYear,
                        fill: false,
                        borderColor: '#365cf5',
                        tension: 0.1
                    }]
                };
                new Chart(ctx, {
                    type: 'line',
                    data: data,
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                })
            }
        },
  
        mounted() {
            this.ac_fetchAllorders()
            this.canvas()
        }
    }
</script>

<style scoped>
    .chart-views {
        background: #14142D;
        padding: 41px 40px;
        border-radius: 12px;
    }

    #myviews {
        height: 20%;
        width: 30%;
    }

    .headline .title {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 10px;
    }

    .headline .order-sexmonths {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 15px;
    }
</style>