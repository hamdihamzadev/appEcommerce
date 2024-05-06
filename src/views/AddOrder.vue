<template>
    <section class="addOrder pb-5">
        <b-container>
            <h1 class="text-center mb-3"> <strong>Add new order</strong> </h1>
            <form id="form" class="p-4">
                <div class="row">
                    <b-form-group class="col-12 mb-4" id="select-product" label="Customers:" label-for="selectCategory">
                        <b-form-select v-model="customerSelected" class="w-100" id="select-product"
                            :options="AllCustomer" required>
                        </b-form-select>

                    </b-form-group>

                    <b-form-group class="col-12 mb-4 mt-4" id="select-product" label="Product:"
                        label-for="selectCategory">
                        <b-form-select v-model="ProductSelected" class="w-100" id="select-product" :options="options"
                            required>
                        </b-form-select>

                    </b-form-group>
                    <p class="text-danger" v-show="stockout">This product is out of stock</p>

                    <b-form-group class="col-6 mb-4 mt-4" id="input-price" label="Price:" label-for="input-1">
                        <b-form-input v-model="Price" id="input-1" type="number" placeholder="Enter price product"
                            disabled required>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group class="col-6 mb-4 mt-4" label="Quantity:" label-for="input-1">
                        <b-form-spinbutton id="sb-quantity" v-model="Quantity" min="1" :max="ProductSelected.quantity"
                            style="height: 37px;"></b-form-spinbutton>
                    </b-form-group>


                    <b-form-group class="col-12 mb-4" id="input-price" label="Total:" label-for="input-1">
                        <b-form-input v-model="Total" id="input-1" type="number" placeholder="Total order" required>
                        </b-form-input>
                    </b-form-group>

                    <div>
                        <b-button class="w-100 mt-4 " variant="primary" id="btn-addprd" @click="addOrder"
                            :disabled="stockout">
                            <b-icon icon="plus" font-scale="2"></b-icon>Add Order
                        </b-button>
                    </div>

                </div>

            </form>
        </b-container>

    </section>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex';

    export default {
        name: 'AddOrder',
        data() {
            return {
                Customer: '',
                Phone: '',
                City: '',
                Adress: '',
                Quantity: 1,
                ProductSelected: '',
                customerSelected: '',
            };
        },

        computed: {
            ...mapState('ProductsModule', {
                productModuleStates: state => state
            }),

            ...mapState('customers', {
                customers: state => state.customers
            }),

            options() {
                let products = [{
                    value: '',
                    text: 'Select Product...'
                }]
                for (const category in this.productModuleStates) {
                    this.productModuleStates[category].forEach(product => {
                        let option = {
                            value: {
                                category: category,
                                name: product.name,
                                price: product.price,
                                date: product.date,
                                quantity: product.quantity
                            },
                            text: `${product.name} - ${product.price}$ `
                        }
                        products.push(option)
                    })
                }

                return products
            },

            AllCustomer() {
                let optionscustomers = [{
                    value: '',
                    text: 'Select customer'
                }]
                this.customers.forEach(customer => {
                    let option = {
                        value: {
                            name: customer.name,
                            phone: customer.phone,
                            adress: customer.adress,
                            city: customer.city,
                            id: customer.id
                        },
                        text: `${customer.name} - ${customer.gmail} - ${customer.phone} `
                    }
                    optionscustomers.push(option)
                })
                return optionscustomers
            },

            Price() {
                let priceProduct = this.ProductSelected.price
                return priceProduct
            },

            Total() {
                let calctotal = this.Price * this.Quantity
                return calctotal
            },

            stockout() {
                if (this.ProductSelected.quantity === 0) {
                    return true
                } else {

                    return false
                }
            },

            disabledQuantity() {
                if (this.Quantity >= this.ProductSelected.quantity) {
                    return true
                } else {
                    return false
                }
            }

        },

        methods: {
            ...mapActions('NewOrders', ['ac_addNewOrder']),
            ...mapActions('ProductsModule', ['ac_SubtractQuantity']),
            ...mapActions('allOrder', ['ac_addInAllOrder']),
            ...mapActions('customers', ['ac_addOrderCustomer']),
            ...mapActions('customers', ['ac_fetchCustomer']),
            ...mapActions('ProductsModule', ['ac_fetchProduct']),

            addOrder() {

                let newdate = new Date();
                let year = newdate.getFullYear().toString()
                let month = (newdate.getMonth() + 1).toString()
                let day = newdate.getDate()
                let hour = newdate.getHours().toString()
                let munite = newdate.getMinutes().toString()
                let seconde = newdate.getSeconds().toString()

                let date = `${year}/${month}/${day} ${hour}:${munite}:${seconde}`

                if (this.Price !== '' && this.Quantity !== '' && this.Total !== '' && this.ProductSelected !== '' &&
                    this.customerSelected !== '') {
                    let Neworder = {
                        Customer: this.customerSelected.name,
                        phone: this.customerSelected.phone,
                        city: this.customerSelected.city,
                        address: this.customerSelected.adress,
                        product: this.ProductSelected.name,
                        price: this.Price,
                        quantity: this.Quantity,
                        total: this.Total,
                        date: date,
                    }

                    this.ProductSelected.order = Neworder

                    this.ac_addNewOrder({
                        category: this.ProductSelected.category,
                        order: Neworder
                    })

                    this.ac_addInAllOrder({
                        status: 'new',
                        order: Neworder
                    })

                    this.ac_SubtractQuantity({
                        category: this.ProductSelected.category,
                        date: this.ProductSelected.date,
                        number: this.Quantity
                    })

                    this.ac_addOrderCustomer({
                        newOrder: {
                            product: this.ProductSelected.name,
                            category: this.ProductSelected.category,
                            price: this.Price,
                            quantity: this.Quantity,
                            total: this.Total,
                            date: date,
                        },
                        idCustomer: this.customerSelected.id
                    })

                    // RESET VALUES
                    this.reset()

                }

            },

            reset() {
                this.Price = this.Total = this.ProductSelected = this.customerSelected = ''
                this.Quantity = 1
            },

        },

        mounted() {
            this.ac_fetchCustomer()
            this.ac_fetchProduct()
        }

    }
</script>



<style scoped>
    #btn-addorder {
        background-color: var(--couleur-primaire-4);
    }

    #select-product {
        height: 37px;
        border-radius: 0.375rem;
    }

    #sb-quantity {
        height: 37px;
        border-radius: 0.375rem;
    }

    #form {
        background-color: var(--couleur-primaire-1);
        border-radius: 12px;
    }
</style>