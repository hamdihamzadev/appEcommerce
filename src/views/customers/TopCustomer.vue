<template>
    <section id="section-topCustomer" class="pb-5">
        <b-container class="p-4">
            <div id="statistics">
                <div class="d-flex justify-content-between align-items-center  mb-5" id="row-filter">
                    <b-row id="btns-filter">
                        <!-- type filter -->
                        <b-col cols="6" md="4">
                            <b-dropdown id="type-filter" size="sm">
                                <template #button-content>
                                    <b-icon icon="filter" aria-hidden="true"></b-icon> Filter
                                </template>
                                <b-dropdown-group header="Choose filter" class="small">
                                    <b-dropdown-item-button @click="chooseFilter(item)" v-for="item in filter"
                                        :key="item.id">
                                        <b-icon :icon="TypeFilter=== item ? 'check' : null" aria-hidden="true"></b-icon>
                                        {{ item }}
                                    </b-dropdown-item-button>
                                </b-dropdown-group>
                            </b-dropdown>
                        </b-col>

                        <!-- number filter -->
                        <b-col cols="6">
                            <div>
                                <b-button @click="toggleFormFilter" id="btn-numberfilter" size="sm" v-b-modal.modal-numberFilter >
                                    <b-icon icon="pencil" aria-hidden="true"></b-icon> More: {{ numberFilter }}
                                    {{ TypeFilter }}
                                </b-button>

                                <!-- modal number filter desktop -->
                                <div id="container-form" class="position-fixed z-3" v-show="formFilter">
                                    <b-form>
                                        <p class="mb-2" id="para-form">Change number {{ TypeFilter }} to filter</p>
                                        <div class="d-flex mb-4" id="group-search">
                                            <div id="container-bag"
                                                class="d-flex align-items-center justify-content-center  ">
                                                <b-icon :icon="IcontypeFilter" aria-hidden="true" id="icon-bag">
                                                </b-icon>
                                            </div>
                                            <b-form-input id="input-filter" type="number" placeholder="200 "
                                                v-model="numberInput" :state="stateInput">
                                            </b-form-input>
                                        </div>

                                        <b-button type="submit" variant="primary" class="me-1" size="sm"
                                            id="btn-changeFilter" @click="changeNumberFilterDesc">Filter</b-button>
                                        <b-button type="reset" size="sm" variant="outline-danger" @click="closeForm">
                                            Close
                                        </b-button>

                                    </b-form>
                                </div>

                                <!-- modal number filter phone -->
                                <b-modal id="modal-numberFilter" class="popupTable" title="Filter by number" @ok="changeNumber" :ok-title="'Send'" >
                                    
                                    <b-form>
                                        <p class="mb-2" id="para-form">Change number {{ TypeFilter }} to filter</p>
                                        <div class="d-flex mb-4" id="group-search">
                                            <div id="container-bag"
                                                class="d-flex align-items-center justify-content-center  ">
                                                <b-icon :icon="IcontypeFilter" aria-hidden="true" id="icon-bag">
                                                </b-icon>
                                            </div>
                                            <b-form-input id="input-filter" type="number" placeholder="200 "
                                                v-model="numberInput" :state="stateInput">
                                            </b-form-input>
                                        </div>
                                    </b-form>
                               
                                </b-modal>

                            </div>
                        </b-col>

                    </b-row>
                </div>
                <!-- CUSTOMERS -->
                <b-row>
                    <!--LIST CUSTOMERS -->
                    <b-col cols="12" class="d-flex flex-column gap-2 " id="list-customer">
                        <div class="customer d-flex justify-content-between align-items-center " id="customer"
                            v-for=" (item,index) in customersFilter" :key="item.id" @click="toggleActive(index,item)"
                            :style="styleActive(index)" v-b-modal.table-customer>
                            <div class="position-absolute" id="classment-color" :style="backgroundClassmentLst(index)">
                            </div>
                            <div class="d-flex  align-items-center gap-2">
                                <b-icon icon="person" aria-hidden="true"></b-icon>
                                <p>{{item.name  }}</p>
                            </div>
                            <div class="d-flex  align-items-center gap-2">
                                <b-icon icon="telephone" aria-hidden="true"></b-icon>
                                <p>{{item.phone }}</p>
                            </div>
                            <div class="d-flex  align-items-center gap-2">
                                <b-icon icon="pin-map" aria-hidden="true"></b-icon>
                                <p>{{ item.fes  }}</p>
                            </div>
                            <p id="classment-customer">{{ `${index+1}` }}</p>
                        </div>
                        <h6 v-if="customersFilter.length===0 && TypeFilter==='Orders' ">No customer has more than <span
                                class="text-danger">{{ numberFilter }} orders</span> </h6>
                        <h6 v-else-if="customersFilter.length===0 && TypeFilter==='Sales'">No customer has more than
                            <span class="text-danger">{{ numberFilter }}$ in revenue</span> </h6>
                    </b-col>
                    <!-- TABLE CUSTOMER -->
                    <b-col cols="12" class="p-2 table-md " id="table-customer">

                        <div class="d-flex  flex-column " id="container-table-customer">

                            <div class="d-flex justify-content-between align-items-center mb-5">
                                <p id="name-customer"> {{ name }} </p>
                                <div id="container-classment" :style="backgroundClassmentTable">
                                    <p>{{ classment }}</p>
                                </div>
                            </div>

                            <!-- REVENUE -->
                            <div>
                                <div id="container-statistics"
                                    class="d-flex justify-content-between align-items-center  py-2">
                                    <div
                                        class="d-flex justify-content-between align-items-baseline gap-3 align-items-md-center">
                                        <div id="container-iconRevenue" class="align-self-sm-baseline" >
                                            <i class="bx bx-money"></i>
                                        </div>
                                        <div>
                                            <p id="title-statistics-Revenue">Revenue </p>
                                            <p id="subtitle-statistics">Revenue management</p>
                                        </div>

                                    </div>
                                    <p id="result-statistics"> {{ revenue }} $</p>
                                    <hr class="position-absolute">
                                </div>
                                <hr>
                            </div>

                            <!-- ORDERS -->
                            <div>
                                <div id="container-statistics"
                                    class="d-flex justify-content-between align-items-center  py-2">
                                    <div
                                        class="d-flex justify-content-between align-items-baseline gap-3 align-items-md-center">
                                        <div id="container-iconOrders" class="align-self-sm-baseline">
                                            <i class='bx bx-package'></i>
                                        </div>
                                        <div>
                                            <p id="title-statistics-Orders">Orders </p>
                                            <p id="subtitle-statistics">All Orders Operations</p>
                                        </div>
                                    </div>
                                    <p id="result-statistics">{{ orders }}</p>
                                </div>
                                <hr>
                            </div>

                            <!-- TOP CATEGORY -->
                            <div>
                                <div id="container-statistics"
                                    class="d-flex justify-content-between align-items-center  py-2">
                                    <div
                                        class="d-flex justify-content-between align-items-baseline gap-3 align-items-md-center">
                                        <div id="container-iconCategories" class="align-self-sm-baseline">
                                            <i class='bx bx-pie-chart'></i>
                                        </div>
                                        <div id="cont-titleSubt">
                                            <p id="title-statistics-Categories">Categories</p>
                                            <p id="subtitle-statistics">Top Purchased Categories</p>
                                        </div>
                                    </div>
                                    <p id="result-statistics" v-b-toggle.collapse-category>{{ numberCategories }}
                                        Categories
                                        <i class='bx bx-chevron-down'></i>
                                    </p>

                                </div>
                                <b-collapse id="collapse-category" class="mt-4 ">
                                    <p id="list-topcategorie" class="d-flex justify-content-between py-2 "
                                        v-for="item in listCategories" :key="item.id">
                                        {{ item.category }} <span>{{ item.orders }} Orders</span> </p>

                                </b-collapse>
                                <hr>
                            </div>

                            <!-- TOP PRODUCTS -->
                            <div>
                                <div id="container-statistics"
                                    class="d-flex justify-content-between align-items-center  py-2">
                                    <div
                                        class="d-flex justify-content-between align-items-baseline gap-3 align-items-md-center">
                                        <div id="container-iconProducts" class="align-self-sm-baseline">
                                            <i class='bx bx-shopping-bag'></i>
                                        </div>
                                        <div id="cont-titleSubt">
                                            <p id="title-statistics-Products">Products </p>
                                            <p id="subtitle-statistics">Top Purchased Products</p>
                                        </div>
                                    </div>
                                    <p id="result-statistics" class="text-collapse" v-b-toggle.collapse-products>
                                        {{ numberProducts }}
                                        Products
                                        <i class='bx bx-chevron-down'></i></p>
                                </div>
                                <b-collapse id="collapse-products" class="mt-4 ">
                                    <p id="list-topcategorie" class="d-flex justify-content-between py-2 "
                                        v-for="item in listProducts" :key="item.id">
                                        {{ item.product }} <span>{{ item.orders }} Orders</span> </p>

                                </b-collapse>
                                <hr>
                            </div>
                        </div>
                    </b-col>
                    <!--popup table phone-->
                    <b-modal id="table-customer" class="popupTable" title="Statistics">
                        <div class="d-flex  flex-column " id="container-table-customer">

                            <div class="d-flex justify-content-between align-items-center mb-5">
                                <p id="name-customer"> {{ name }}hamza </p>
                                <div id="container-classment" :style="backgroundClassmentTable">
                                    <p>{{ classment }}</p>
                                </div>
                            </div>

                            <!-- REVENUE -->
                            <div>
                                <div id="container-statistics"
                                    class="d-flex justify-content-between align-items-center  py-2">
                                    <div
                                        class="d-flex justify-content-between align-items-baseline flex-column gap-3 align-items-md-center">
                                        <div id="container-iconRevenue">
                                            <i class="bx bx-money"></i>
                                        </div>
                                        <div>
                                            <p id="title-statistics-Revenue">Revenue </p>
                                            <p id="subtitle-statistics">Revenue management</p>
                                        </div>

                                    </div>
                                    <p id="result-statistics"> {{ revenue }} $</p>
                                    <hr class="position-absolute">
                                </div>
                                <hr>
                            </div>

                            <!-- ORDERS -->
                            <div>
                                <div id="container-statistics"
                                    class="d-flex justify-content-between align-items-center  py-2">
                                    <div
                                        class="d-flex justify-content-between align-items-baseline flex-column gap-3 align-items-md-center">
                                        <div id="container-iconOrders">
                                            <i class='bx bx-package'></i>
                                        </div>
                                        <div>
                                            <p id="title-statistics-Orders">Orders </p>
                                            <p id="subtitle-statistics">All Orders Operations</p>
                                        </div>
                                    </div>
                                    <p id="result-statistics">{{ orders }}</p>
                                </div>
                                <hr>
                            </div>

                            <!-- TOP CATEGORY -->
                            <div>
                                <div id="container-statistics"
                                    class="d-flex justify-content-between align-items-center  py-2">
                                    <div
                                        class="d-flex justify-content-between align-items-baseline flex-column gap-3 align-items-md-center">
                                        <div id="container-iconCategories">
                                            <i class='bx bx-pie-chart'></i>
                                        </div>
                                        <div id="cont-titleSubt">
                                            <p id="title-statistics-Categories">Categories</p>
                                            <p id="subtitle-statistics">Top Purchased Categories</p>
                                        </div>
                                    </div>
                                    <p id="result-statistics" v-b-toggle.collapse-category>{{ numberCategories }}
                                        Categories
                                        <i class='bx bx-chevron-down'></i>
                                    </p>

                                </div>
                                <b-collapse id="collapse-category" class="mt-4 ">
                                    <p id="list-topcategorie" class="d-flex justify-content-between py-2 "
                                        v-for="item in listCategories" :key="item.id">
                                        {{ item.category }} <span>{{ item.orders }} Orders</span> </p>

                                </b-collapse>
                                <hr>
                            </div>

                            <!-- TOP PRODUCTS -->
                            <div>
                                <div id="container-statistics"
                                    class="d-flex justify-content-between align-items-center  py-2">
                                    <div
                                        class="d-flex justify-content-between align-items-baseline flex-column gap-3 align-items-md-center">
                                        <div id="container-iconProducts">
                                            <i class='bx bx-shopping-bag'></i>
                                        </div>
                                        <div id="cont-titleSubt">
                                            <p id="title-statistics-Products">Products </p>
                                            <p id="subtitle-statistics">Top Purchased Products</p>
                                        </div>
                                    </div>
                                    <p id="result-statistics" class="text-collapse" v-b-toggle.collapse-products>
                                        {{ numberProducts }}
                                        Products
                                        <i class='bx bx-chevron-down'></i></p>
                                </div>
                                <b-collapse id="collapse-products" class="mt-4 ">
                                    <p id="list-topcategorie" class="d-flex justify-content-between py-2 "
                                        v-for="item in listProducts" :key="item.id">
                                        {{ item.product }} <span>{{ item.orders }} Orders</span> </p>

                                </b-collapse>
                                <hr>
                            </div>
                        </div>
                    </b-modal>
                </b-row>
            </div>
        </b-container>
    </section>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex';
    export default {
        name: 'TopCustomer',
        data() {
            return {
                filter: ['Orders', 'Sales'],
                TypeFilter: 'Orders',
                formFilter: false,
                numberInput: '',
                numberFilter: 1,
                active: '',
                activeIndex: '',
                name: 'Name',
                classment: '0',
                revenue: '0',
                orders: '0',
                numberCategories: 0,
                numberProducts: 0,
                listProducts: [],
                listCategories: [],

            }
        },

        computed: {
            
            ...mapState('customers', {
                customers: state => state.customers
            }),

            IcontypeFilter() {
                if (this.TypeFilter === 'Orders') {
                    return 'bag'
                } else {
                    return 'cash-stack'
                }
            },

            customerBySales() {
                let filterCustomers = []
                this.customers.forEach(customer => {
                    if (this.revenueCustomer(customer.orders).revenue >= this.numberFilter) {
                        let objCustomer = {
                            name: customer.name,
                            city: customer.city,
                            phone: customer.phone,
                            revenue: this.revenueCustomer(customer.orders).revenue,
                            orders: customer.orders.length,
                            topCategories: this.topCategories(customer.orders).uniqueCategory,
                            topProducts: this.topProducts(customer.orders).uniqueProduct
                        }
                        filterCustomers.push(objCustomer)
                    }
                })
                filterCustomers.sort((itemA, itemB) => itemB.revenue - itemA.revenue)
                return filterCustomers
            },

            customerByOrders() {
                let filterCustomers = []
                this.customers.forEach(customer => {
                    if (customer.orders.length >= this.numberFilter) {
                        let objCustomer = {
                            name: customer.name,
                            city: customer.city,
                            phone: customer.phone,
                            revenue: this.revenueCustomer(customer.orders).revenue,
                            orders: customer.orders.length,
                            topCategories: this.topCategories(customer.orders).uniqueCategory,
                            topProducts: this.topProducts(customer.orders).uniqueProduct
                        }
                        filterCustomers.push(objCustomer)
                    }
                })

                filterCustomers.sort((itemA, itemB) => itemB.orders - itemA.orders)
                return filterCustomers
            },

            customersFilter() {
                if (this.TypeFilter === 'Orders') {
                    return this.customerByOrders
                } else {
                    return this.customerBySales
                }
            },
            backgroundClassmentTable() {

                if (this.classment >= 1 && this.classment <= 10) {
                    return 'backgroundColor:#219653';
                } else if (this.classment >= 11 && this.classment <= 30) {
                    return 'backgroundColor:#08459e';
                } else if (this.classment >= 30 && this.classment <= 80) {
                    return 'backgroundColor:#9f7804';
                } else {
                    return 'backgroundColor:#cf1616';
                }
            },


        },

        methods: {
            ...mapActions('customers',['ac_fetchCustomer']),
            backgroundClassmentLst(index) {
                let classment = index + 1
                if (classment >= 1 && classment <= 10) {
                    return 'backgroundColor:#219653';
                } else if (classment >= 11 && classment <= 30) {
                    return 'backgroundColor:#08459e';
                } else if (classment >= 30 && classment <= 80) {
                    return 'backgroundColor:#9f7804';
                } else {
                    return 'backgroundColor:#cf1616';
                }
            },
            styleActive(index) {
                if (this.activeIndex === index) {
                    return {
                        backgroundColor: '#242460',
                        border: '1px solid rgb(54, 92, 245)',
                        boxShadow: 'rgb(54 92 245 / 44%) 1px 8px 20px -2px'
                    }
                }
            },
            // SELECT CHOOSE FILTER
            chooseFilter(item) {
                this.TypeFilter = item
            },

            // CHANGE NUMBER FILTER
            toggleFormFilter() {
                this.formFilter = true
            },

            changeNumber(eve) {
               
                if (this.numberInput !== '') {
                    this.stateInput = null
                    this.numberFilter = this.numberInput

                } else {
                    eve.preventDefault()
                }

            },

            changeNumberFilterDesc(event){
                event.preventDefault()
                if (this.numberInput !== '') {
                    this.stateInput = null
                    this.numberFilter = this.numberInput
                    this.closeForm()

                } else {
                    this.formFilter=true

                }

            },

            closeForm() {
                this.formFilter=false
            },

            // TOGGLE ACTIVE
            toggleActive(index, item) {
                this.activeIndex = index
                this.name = item.name
                this.classment = index + 1
                this.revenue = item.revenue
                this.orders = item.orders
                this.numberCategories = item.topCategories.length
                this.numberProducts = item.topProducts.length
                this.listProducts = item.topProducts
                this.listCategories = item.topCategories
            },

            // filter
            revenueCustomer(orders) {
                let revenue = orders.reduce((accu, order) => accu + order.total, 0)
                return {
                    revenue
                }
            },

            topCategories(orders) {
                let names = orders.map(order => order.category)
                let filterCategory = names.map(name => {
                    return {
                        category: name,
                        orders: names.filter(ctg => ctg === name).length
                    }
                })
                let uniqueCategory = filterCategory.filter((ctg, index) => index === filterCategory.findIndex(objCtg =>
                    objCtg.category === ctg.category))
                uniqueCategory.sort((ctgA, ctgB) => ctgB.orders - ctgA.orders)
                return {
                    uniqueCategory
                }

            },

            topProducts(orders) {
                let names = orders.map(order => order.product)
                let filterProducts = names.map(name => {
                    return {
                        product: name,
                        orders: names.filter(product => product === name).length
                    }
                })

                let uniqueProduct = filterProducts.filter((product, index) => {
                    return index === filterProducts.findIndex(objPrd => objPrd.product === product.product)
                })

                uniqueProduct.sort((ctgA, ctgB) => ctgB.orders - ctgA.orders)
                return {
                    uniqueProduct
                }
            }

        },

        mounted(){
            this.ac_fetchCustomer()
          
            
        }



    }
</script>


<style scoped lang="scss">
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        padding: 0px;
        margin: 0px;
    }

    #statistics {
        background-color: var(--couleur-primaire-1);
        padding: 43px 30px;
        border-radius: 18px;
    }

    /* FILTER BY NUMBER */
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

    #btn-numberfilter {
            width: max-content;
        }

    /**customer */

    #list-customer {
        width: 51%;

        .customer {
            background-color: var(--couleur-primaire-5);
            padding: 13px 24px;
            border-radius: 9px;
            position: relative;
            cursor: pointer;
        }

        .customer:hover {
            background-color: var(--couleur-primaire-6);

        }

        .customer .active {
            background-color: var(--couleur-primaire-6);
        }


    }

    #table-customer {
        width: 46%;
        background-color: var(--couleur-primaire-6);
        border-radius: 9px;
        border: 1px solid rgb(54, 92, 245);
        box-shadow: rgb(54 92 245 / 44%) 1px 8px 24px -2px;
        height: fit-content;
        position: sticky;
        top: 56px;
        right: 55px;


        #container-table-customer {
            padding: 18px 12px 43px;
        }


        #name-customer {
            font-size: 20px;
            font-weight: 500;
        }

        #container-classment {
            width: fit-content;
            padding: 5px 15px;
            border-radius: 4px;
            color: white;
        }

        /** Revenue */
        #container-iconRevenue {
            background: #f0be0e14;
            color: #F0BE0E;
            padding: 11px;
            border-radius: 7px;
            height: 43px;

            .bx {
                font-size: 19px;
            }
        }

        #title-statistics-Revenue {
            color: #F0BE0E;
        }

        /** Orders */
        #container-iconOrders {
            background: rgb(235 77 45 / 11%);
            color: #ef5211;
            padding: 11px;
            border-radius: 7px;
            height: 43px;

            .bx {
                font-size: 19px;
            }
        }

        #title-statistics-Orders {
            color: #ef5211;
        }

        /** Categories */
        #container-iconCategories {
            background: rgb(179 29 249 / 12%);
            color: #b31df9;
            padding: 11px;
            border-radius: 7px;
            height: 43px;

            .bx {
                font-size: 19px;
            }
        }

        #title-statistics-Categories {
            color: #b31df9;
        }

        /** Products */
        #container-iconProducts {
            background: rgb(35 249 111 / 7%);
            color: #1df96f;
            padding: 11px;
            border-radius: 7px;
            height: 43px;

            .bx {
                font-size: 19px;
            }
        }

        #title-statistics-Products {
            color: #1df96f;
        }


        #subtitle-statistics {
            font-size: 13px;
            font-weight: 100;
            color: #95A4E0;
        }


        #result-statistics {
            font-size: 19px;
            font-weight: 700;
            cursor: pointer;
        }
    }

    #table-customer___BV_modal_outer_ {
        display: none;
    }

    #modal-numberFilter___BV_modal_outer_{
        display: none;
    }

    #list-topcategorie {
        color: #95A4E0
    }

    #classment-color {
        width: 10px;
        height: 100%;
        left: 0px;
        border-radius: 9px;
    }

    /* 
    #input-search {
        background: #1D1D43;
        border: none;
        padding: 4px 8px;
        border-radius: 5px;
        color: white;
    } */



    /** PHONE */
    @media screen and (max-width: 768px) {
        #row-filter {
            flex-wrap: wrap;
        }

        #para-filter {
            text-align: center;
            font-size: 14px;
            margin-top: 16px;
        }

        #btn-numberfilter {
            width: max-content;
        }

        #customer {
            width: 225%;
            flex-wrap: wrap;
            gap: 16px;

        }

        #classment-customer {
            position: absolute;
            right: 24px;
            top: 13px;
            background-color: #219653;
            padding: 2px 10px;
            border-radius: 4px;
            font-size: 12px;
        }

        .table-md {
            display: none;
        }

        #list-customer {
            display: none;
        }

        #container-form{
            display: none;
        }

        #table-customer___BV_modal_outer_ {
            display: block;
        }

        #modal-numberFilter___BV_modal_outer_{
            display: block;
        }

        .modal-open #table-customer___BV_modal_outer_  #table-customer .modal-dialog .modal-content{
            background-color: #219653;
        }

         


        // width: 100%;
        //     background-color: var(--couleur-primaire-6);
        //     border: 1px solid rgb(54, 92, 245);
        //     box-shadow: rgb(54 92 245 / 44%) 1px 8px 24px -2px;



    }
</style>