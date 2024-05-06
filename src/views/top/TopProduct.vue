<template>
    <div id="top-product" class="p-3">

        <div class="d-flex justify-content-between align-items-center mt-5 ">
            <div class="d-flex justify-content-between align-items-center gap-2">

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

                <!-- type filter -->
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
                                @click="changeNumber">Change</b-button>
                            <b-button type="reset" size="sm" variant="outline-danger" @click="hideForm">Close
                            </b-button>

                        </b-form>
                    </div>
                </div>

            </div>
            <p class="mb-0 d-none d-sm-block ">The top categories have over <strong>{{ numberFilter }} {{ TypeFilter }}
                </strong> the month
                of {{ MonthSelecte }}
            </p>
        </div>

        <!----- SHOW PRODUCTS -->
        <div id="products-filter"
            class=" mt-5 d-flex flex-column flex-sm-row justify-content-between align-items-center flex-wrap">
            <div id="product" class="d-flex flex-column gap-5 " v-for="(product,index) in productsInfilter"
                :key="product.id">
                <div class="d-flex justify-content-between align-items-center" id="row-1">
                    <div id="name">
                        <h5 class="mb-0" id="title-prd">{{product.name}}</h5>
                        <p class="mt-1 mb-0" id="category">{{ product.category }}</p>
                    </div>
                    <div id="classment">
                        <p class="mb-0">#{{index+1}}</p>
                    </div>
                </div>


                <div id="numbers-result" class="d-flex justify-content-between align-items-center gap-4">
                    <div>
                        <h5>{{ product.sales }} $</h5>
                        <p class="mb-0">Sales</p>
                    </div>
                    <div>
                        <h5>{{ product.orders }}</h5>
                        <p class="mb-0">Orders</p>
                    </div>
                    <div>
                        <h5>{{ product.quantity }}</h5>
                        <p class="mb-0">Quantity</p>
                    </div>
                </div>

                <div id="percentage">
                    <p>percentage</p>
                    <b-progress max="100">
                        <b-progress-bar :value="product.Percentage" :label="`${product.Percentage}%`"> </b-progress-bar>
                    </b-progress>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        name: 'TopProduct',
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


            }
        },

        computed: {

             // GET MODULE STATE DELIVRED
             ...mapState('DelivredOrders', {
                StoreOrdersDelivred: state => state
            }),

    
            CurrentMonth() {
                let newdate = new Date()
                let month = (newdate.getMonth() + 1).toString()
                return month
            },

            numberMonth() {
                let month = this.allMonths.indexOf(this.MonthSelecte) + 1
                return month

            },

            IcontypeFilter() {
                if (this.TypeFilter === 'Orders') {
                    return 'bag'
                } else {
                    return 'cash-stack'
                }
            },

            ordersMonth() {
                let orders = {}

                for (const categoryKey in this.StoreOrdersDelivred) {

                    let filterOrders = this.StoreOrdersDelivred[categoryKey].filter(order => {
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

            namesProduct() {
                let names = []
                for (const categoryKey in this.ordersMonth) {
                    this.ordersMonth[categoryKey].forEach(order => {
                        let product = {
                            category: categoryKey,
                            name: order.product
                        }
                        names.push(product)
                    })
                }
                let namesFilter = names.filter((prd, index) => {
                    return index === names.findIndex(ob => prd.name === ob.name)
                })
                return namesFilter
            },

            numbOrders() {
                let orders = Object.values(this.ordersMonth).reduce((accu, table) => {
                    return accu + table.length
                }, 0)
                return orders
            },

            salesAllOrders() {
                let sales = Object.values(this.ordersMonth).flatMap(innerArray => innerArray).reduce((accu, order) =>
                    accu + order.total, 0)
                return sales
            },

            productFilterByOrders() {
                let productsFilter = []
                this.namesProduct.forEach(product => {
                    let ordersProducts = this.ordersMonth[product.category].filter(order => order.product ===
                        product.name)
                    if (ordersProducts.length >= this.numberFilter) {
                        let objPrd = {
                            name: product.name,
                            category: product.category,
                            orders: ordersProducts.length,
                            sales: this.QuatitySalesProduct(ordersProducts).sales,
                            quantity: this.QuatitySalesProduct(ordersProducts).quantity,
                            Percentage: Math.round(ordersProducts.length / this.numbOrders * 100)
                        }

                        productsFilter.push(objPrd)
                    }
                })

                productsFilter.sort((orderA, orderB) => orderB.orders - orderA.orders)
                return productsFilter
            },

            productFilterBySales() {
                let productsFilter = []
                this.namesProduct.forEach(product => {
                    let ordersProduct = this.ordersMonth[product.category].filter(order => order.product ===
                        product.name)
                    if (this.QuatitySalesProduct(ordersProduct).sales >= this.numberFilter) {
                        let objPrd = {
                            name: product.name,
                            category: product.category,
                            orders: ordersProduct.length,
                            sales: this.QuatitySalesProduct(ordersProduct).sales,
                            quantity: this.QuatitySalesProduct(ordersProduct).quantity,
                            Percentage: Math.round(this.QuatitySalesProduct(ordersProduct).sales / this
                                .salesAllOrders * 100)
                        }
                        productsFilter.push(objPrd)
                    }
                })
                productsFilter.sort((orderA, orderB) => orderB.sales - orderA.sales)
                return productsFilter
            },

            productsInfilter() {
                if (this.TypeFilter === 'Orders') {
                    return this.productFilterByOrders
                } else {
                    return this.productFilterBySales
                }
            }


        },

        methods: {

            ...mapActions('DelivredOrders', ['ac_fetchOrdersDelivered']),

            QuatitySalesProduct(ordersTheProduct) {

                let quantityProduct = ordersTheProduct.reduce((accu, order) => accu + order.quantity, 0)
                let salesProduct = ordersTheProduct.reduce((accu, order) => accu + order.total, 0)
                return {
                    quantity: quantityProduct,
                    sales: salesProduct
                }
            },



            chooseFilter(item) {
                this.TypeFilter = item
            },
            sendMonth(month) {
                this.MonthSelecte = month

            },

            toggleFormFilter() {
                this.formFilter = true
            },
            hideForm() {
                this.formFilter = false
            },

            changeNumber(event) {
                event.preventDefault()
                if (this.numberInput !== '') {
                    this.stateInput = null
                    this.hideForm()
                    this.numberFilter = this.numberInput

                } else {
                    this.stateInput = false
                }

            }
        },

        mounted() {
            this.MonthSelecte = this.allMonths[this.CurrentMonth - 1]
            this.ac_fetchOrdersDelivered()

        }
    }
</script>

<style lang="scss" scoped>
    #top-product {
        background-color: var(--couleur-primaire-1)
    }

    #container-month {
        background: #3c5df5;
        padding-inline: 7px;
        height: 38px;
    }

    #select-mois {
        background: #3c5df5;
        color: white;
        border: none;
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

    #btn-numberfilter {
        background: #3c5df5;
        border: none;
        padding: 6px 13px;
        font-size: 13px;
    }

    #para-form {
        color: #3a5aec;
        font-weight: 700;
    }

    #type-filter .btn {
        background: #3c5df5;
        border: none;
    }

    .custom-button {
        background: #3c5df5;
        border: none;
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

    /** SECTION SHOW PRODUCTSIN FILTER */
    #products-filter {
        #product {
            background: #1D1D43;
            padding: 25px;
            border-radius: 16px;
            width: 31%;
            margin-bottom: 4%;

            #row-1 {

                #name {
                    #title-prd {
                        font-weight: bolder;
                        font-size: 20px;
                    }

                    #category {
                        font-size: 14px;
                        color: #95A4E0;

                    }
                }

                #classment {
                    background: #058F4D;
                    color: white;
                    padding: 6px 10px;
                    border-radius: 4px;
                    font-weight: 600;
                }


            }

            #numbers-result {
                div {
                    h5 {
                        font-weight: 800;
                        margin-bottom: 0px;
                    }

                    p {
                        font-size: 13px;
                        margin-top: 2px;
                        color: #95A4E0;
                    }
                }
            }

            #percentage {
                p {
                    font-size: 13px;
                    color: #95A4E0;
                    margin-bottom: 5px;


                }
            }


        }
    }

    /** PHONE */
    @media screen and (max-width: 768px) {
        #products-filter #product {
            width: 100%;
        }

    }
</style>