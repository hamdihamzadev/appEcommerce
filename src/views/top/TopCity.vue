<template>
    <section id="top-city" class="p-4">

        <div class="d-flex justify-content-between align-items-center mt-5 mb-5" id="row-filter">
            <div class="d-flex justify-content-between align-items-center gap-2" id="btns-filter">

                <!-- select month -->
                <b-dropdown variant="primary" size="sm">
                    <template #button-content>
                        <b-icon icon="calendar-date" aria-hidden="true"></b-icon> {{ MonthSelecte }}
                    </template>
                    <b-dropdown-group class="small">
                        <b-dropdown-item-button @click="sendMonth(month)" v-for="month in allMonths" :key="month.id">
                            {{ month }}
                        </b-dropdown-item-button>
                    </b-dropdown-group>
                </b-dropdown>

                 <!-- type filter-->
                <b-dropdown id="type-filter" size="sm">
                    <template #button-content>
                        <b-icon icon="filter" aria-hidden="true"></b-icon> Filter 
                    </template>
                    <b-dropdown-group header="Choose filter" class="small">
                        <b-dropdown-item-button @click="chooseFilter(item)" v-for="item in filter" :key="item.id">
                            <b-icon :icon="TypeFilter=== item ? 'check' : null" aria-hidden="true"></b-icon>
                            {{ item }}
                        </b-dropdown-item-button>
                    </b-dropdown-group>
                </b-dropdown>

                 <!-- filter by number -->
                <div>
                    <b-button @click="toggleFormFilter" id="btn-numberfilter" size="sm">
                        <b-icon icon="pencil" aria-hidden="true"></b-icon> More : {{ numberFilter }}
                        {{ TypeFilter }}
                    </b-button>

                    <div id="container-form" class="position-fixed z-3" v-show="formFilter">
                        <b-form>
                            <p class="mb-2" id="para-form">Change number {{ TypeFilter }} to filter</p>
                            <div class="d-flex mb-4" id="group-search">
                                <div id="container-bag" class="d-flex align-items-center justify-content-center  ">
                                    <b-icon :icon="IcontypeFilter" aria-hidden="true" id="icon-bag"></b-icon>
                                </div>
                                <b-form-input id="input-filter" type="number" placeholder="200 " v-model="numberInput"
                                    :state="stateInput">
                                </b-form-input>
                            </div>

                            <b-button type="submit" variant="primary" class="me-1" size="sm" id="btn-changeFilter"
                                @click="changeNumber">Filter</b-button>
                            <b-button type="reset" size="sm" variant="outline-danger" @click="closeForm">Close
                            </b-button>

                        </b-form>
                    </div>
                </div>


            </div>
            <p class="mb-0 d-none d-sm-block ">The top city have over <strong>{{ numberFilter }} {{ TypeFilter }} </strong> the month
                of {{ MonthSelecte }}
            </p>
        </div>
        <!------  SHOW PRODUCTS ------>
        <div id="all-products" class="mt-2" >
            <div id="product" class=" position-relative mb-4 " v-for="(product,index) in productsFilter "
                :key="product.id" :per-page="perPage" :current-page="currentPage" >
                <div id="classment" class="position-absolute" >
                    <p>{{ index+1 }}</p>
                </div>
                <h6 id="name-city">
                    <i class='bx bx-trip'></i> <SPAN><strong>{{ product.name }} </strong></SPAN>
                </h6>
                <b-row id="row-statistics">
                    <b-col  class="d-flex gap-3 ">
                        <div id="icon-money"><i class='bx bx-money'></i></div>
                        <div>
                            <h6 id="number-statis"><strong>{{ product.sales }} </strong></h6>
                            <p id="title-statistics">Sales</p>
                        </div>
                    </b-col>
                    <b-col   class="d-flex gap-3 ">
                        <div id="icon-orders"><i class='bx bx-shopping-bag'></i></div>
                        <div>
                            <h6 id="number-statis"><strong>{{ product.orders }}</strong> </h6>
                            <p id="title-statistics">Orders</p>
                        </div>
                    </b-col>
                    <b-col class="d-flex gap-3 ">
                        <div id="icon-category"><i class='bx bx-store-alt'></i></div>
                        <div>
                            <h6 id="number-statis"><strong>{{ product.topCategory }}</strong> </h6>
                            <p id="title-statistics">Top Category {{ TypeFilter }}</p>
                        </div>
                    </b-col>
                    <b-col class="d-flex gap-3 ">
                        <div id="icon-percentage"><i class='bx bx-pie-chart-alt-2'></i></div>
                        <div>
                            <h6 id="number-statis">
                                <b-progress max="100">
                                    <b-progress-bar :value="product.percentage" :label="`${product.percentage}%`">
                                    </b-progress-bar>
                                </b-progress>
                            </h6>
                            <p id="title-statistics">Percentage {{ TypeFilter }}</p>
                        </div>
                    </b-col>

                </b-row>
            </div>
        </div>

        <b-pagination v-model="currentPage" :total-rows="productsFilter.length" :per-page="perPage"
            aria-controls="product">
        </b-pagination>
    </section>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        name: 'TopCity',
        data() {
            return {
                allMonths: [

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
                filter: ['Orders', 'Sales'],
                MonthSelecte: '',
                TypeFilter: 'Orders',
                numberFilter: 1,
                formFilter: false,
                numberInput: '',
                stateInput: null,
                perPage: 3,
                currentPage: 1,
            }
        },

        computed: {

            // STORE NEW ORDERS
            ...mapState('DelivredOrders', {
                storeOrdersDelivred: state => state
            }),

            CurrentMonth() {
                let newdate = new Date()
                let month = (newdate.getMonth() + 1).toString()
                return month
            },

            IcontypeFilter() {
                if (this.TypeFilter === 'Orders') {
                    return 'bag'
                } else {
                    return 'cash-stack'
                }
            },

            // ---------- START SHOW PRODUCTS IN FILTER
            ordersMonth() {
                let orders = {}

                for (const categoryKey in this.storeOrdersDelivred) {

                    let filterOrders = this.storeOrdersDelivred[categoryKey].filter(order => {
                        return order.date.split('/')[1] === (this.allMonths.indexOf(this.MonthSelecte) + 1)
                            .toString()
                    })

                    Object.defineProperty(orders, categoryKey, {
                        value: filterOrders,
                        writable: true,
                        enumerable: true,
                        configurable: true
                    })
                }

                return orders
            },

            salesAllOrders() {
                let sales = Object.values(this.ordersMonth).flatMap(innerArray => innerArray).reduce((accu, order) =>
                    accu + order.total, 0)
                return sales
            },

            numberAllOrders() {
                let orders = Object.values(this.ordersMonth).flatMap(innerArray => innerArray).length
                return orders
            },

            namesCity() {
                let allCity = []
                for (const categoryKey in this.ordersMonth) {
                    this.ordersMonth[categoryKey].forEach(order => {
                        allCity.push(order.city)
                    })
                }
                let uniqueNames = [...new Set(allCity)]
                return uniqueNames
            },

            // FILTER BY SALES
            FilterBySales() {
                let productsFilter = []
                this.namesCity.forEach(city => {
                    if (this.SalesCity(city) >= this.numberFilter) {
                        let objCity = {
                            name: city,
                            orders: this.AllOrdersCity(city),
                            sales: this.SalesCity(city),
                            topCategory: this.TopCategorySales(city).category,
                            percentage: Math.round(this.SalesCity(city) / this.salesAllOrders * 100)
                        }
                        productsFilter.push(objCity)
                    }
                })
                return productsFilter.sort((cityA, cityB) => cityB.sales - cityA.sales)
            },

            // FILTER BY ORDERS
            FilterByOrders() {
                let productsFilter = []
                this.namesCity.forEach(city => {
                    if (this.AllOrdersCity(city) >= this.numberFilter) {
                        let objCity = {
                            name: city,
                            orders: this.AllOrdersCity(city),
                            sales: this.SalesCity(city),
                            topCategory: this.TopCategoryOrders(city).category,
                            percentage: Math.round(this.AllOrdersCity(city) / this.numberAllOrders * 100)
                        }
                        productsFilter.push(objCity)
                    }
                })
                return productsFilter.sort((cityA, cityB) => cityB.orders - cityA.orders)
            },

            // SEND PROUCTS FILTER WITH CONDITION
            productsFilter() {
                if (this.TypeFilter === 'Orders') {
                    return this.FilterByOrders
                } else {
                    return this.FilterBySales
                }
            },

        },

        methods: {
            ...mapActions('DelivredOrders', ['ac_fetchOrdersDelivered']),
            // SELECT MONTH
            sendMonth(month) {
                this.MonthSelecte = month

            },

            // SELECT CHOOSE FILTER
            chooseFilter(item) {
                this.TypeFilter = item
            },

            // CHANGE NUMBER FILTER
            toggleFormFilter() {
                this.formFilter = true
            },

            closeForm() {
                this.formFilter = false
            },

            changeNumber(event) {
                event.preventDefault()
                if (this.numberInput !== '') {
                    this.stateInput = null
                    this.closeForm()
                    this.numberFilter = this.numberInput

                } else {
                    this.stateInput = false
                }

            },

            //  METHODS FILTER
            SalesCity(city) {
                let totalSales = []
                for (const categoryKey in this.ordersMonth) {
                    let sales = this.ordersMonth[categoryKey].filter(order => order.city === city)
                        .reduce((accu, order) => accu + order.total, 0)
                    totalSales.push(sales)
                }
                return totalSales.reduce((accu, sales) => accu + sales, 0)
            },

            AllOrdersCity(city) {
                let allOrder = []
                for (const categoryKey in this.ordersMonth) {
                    let orders = this.ordersMonth[categoryKey].filter(order => order.city === city).length
                    allOrder.push(orders)
                }
                return allOrder.reduce((accu, order) => accu + order, 0)
            },

            TopCategoryOrders(city) {

                let ordersCityanyCategory = []
                for (const categoryKey in this.ordersMonth) {
                    let filterCategory = this.ordersMonth[categoryKey].filter(order => order.city === city)
                    let objfilter = {
                        category: categoryKey,
                        numberOrders: filterCategory.length
                    }
                    ordersCityanyCategory.push(objfilter)
                }

                let TopCategory = ordersCityanyCategory.sort((a, b) => b.numberOrders - a.numberOrders)[0]
                return TopCategory

            },

            TopCategorySales(city) {

                let salesCityanyCategory = []
                for (const categoryKey in this.ordersMonth) {
                    let sales = this.ordersMonth[categoryKey].filter(order => order.city === city)
                        .reduce((accu, order) => accu + order.total, 0)
                    let objfilter = {
                        category: categoryKey,
                        salesCity: sales
                    }
                    salesCityanyCategory.push(objfilter)
                }

                let TopCategory = salesCityanyCategory.sort((a, b) => b.salesCity - a.salesCity)[0]
                return TopCategory

            },

        },

        mounted() {
            this.MonthSelecte = this.allMonths[this.CurrentMonth - 1]
            this.ac_fetchOrdersDelivered()
        }
    }
</script>






<style scoped lang="scss">
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        padding: 0px;
        margin: 0px;
    }


    /*ROW  FILTER*/
    #btn-numberfilter {
        background: #3c5df5;
        border: none;
        padding: 6px 13px;
        font-size: 13px;
    }

    #container-form {
        background: #eaeaea;
        margin-top: 11px;
        padding: 10px 18px;
        width: 300px;
        border-radius: 8px;
        box-shadow: 0px 15px 63px 14px rgba(0, 0, 0, 0.33);
        -webkit-box-shadow: 0px 15px 63px 14px rgba(0, 0, 0, 0.33);
        -moz-box-shadow: 0px 15px 63px 14px rgba(0, 0, 0, 0.33);
    }

    #container-bag {
        width: 27%;
        border-radius: 0.375rem 0 0 0.375rem;
        border-color: #6c757d;
        background-color: #3a5aec;
        color: white;
    }

    #icon-bag {
        font-size: 22px;

    }


    /** PRODUCTS IN FILTER */

    #top-city {
        background-color: var(--couleur-primaire-1);


        #product {
            background-color: #1F1F51;
            border-radius: 10px;
            padding: 40px 40px;
            box-shadow: 2px 10px 37px 0px rgba(0, 0, 0, 0.36);
            -webkit-box-shadow: 2px 10px 37px 0px rgba(0, 0, 0, 0.36);
            -moz-box-shadow: 2px 10px 37px 0px rgba(0, 0, 0, 0.36);

            #classment {
                background: #058F4D;
                width: fit-content;
                padding: 5px 15px;
                border-radius: 4px;
                top: -16px;
            }

            #name-city {
                margin-bottom: 32px;
                display: flex;
                gap: 5px;
            }

            #name-city::after {
                content: "";
                content: "";
                background-color: white;
                width: -webkit-fill-available;
                height: 2px;
                margin-bottom: 3px;
                align-self: end;
                margin-left: 14px;

            }

            #row-statistics {
                #icon-money {
                    background: rgba(33, 150, 83, 0.1);
                    color: #219653;
                    padding: 11px;
                    border-radius: 13px;
                    height: 45px;

                    .bx {
                        font-size: 22px;
                    }

                }

                #icon-orders {
                    background: rgba(155, 81, 224, 0.1);
                    color: #9b51e0;
                    padding: 11px;
                    border-radius: 13px;
                    height: 45px;

                    .bx {
                        font-size: 22px;
                    }

                }

                #icon-category {
                    background: rgba(54, 92, 245, 0.1);
                    color: #365CF5;
                    padding: 11px;
                    border-radius: 13px;
                    height: 45px;

                    .bx {
                        font-size: 22px;
                    }

                }

                #icon-percentage {
                    background: rgba(242, 153, 74, 0.1);
                    color: #f2994a;
                    padding: 11px;
                    border-radius: 13px;
                    height: 45px;

                    .bx {
                        font-size: 22px;
                    }

                }

                #number-statis {
                    margin-bottom: 2px;
                    letter-spacing: 1px;
                }

                #title-statistics {
                    font-size: 14px;
                    color: #95A4E0;
                }


            }
        }

    /** PHONE */
    @media screen and (max-width: 768px){
        #row-statistics{
            gap: 20px;
        }
    }

    }
</style>