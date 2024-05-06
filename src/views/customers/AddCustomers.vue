<template>
    <section class="pb-5" id="addCustomer">
       
        <b-container>
            <b-form id="form" class="p-4" @submit="addCustomer">
                <h1 class="text-center mb-4"> <strong>Add customer</strong> </h1>
                <div class="row">
                    <b-form-group class="col-6 mb-4" label="Name" label-for="input-1">
                        <b-form-input :class="{'border-danger':error.name}" v-model="name" id="input-1" type="text"
                            placeholder="Mohammed bakhti" required>
                        </b-form-input>
                        <div class="text-danger" v-show="error.name">The full name is incorrect</div>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" label="Gender" label-for="selectCategory">
                        <b-form-select v-model="gender" class="w-100" id="select-product" :options="options" required>
                        </b-form-select>

                    </b-form-group>

                    <b-form-group class="col-6 mb-4" label="Contry" label-for="input-4">
                        <b-form-input :class="{'border-danger':error.contry}" v-model="contry" id="input-4" type="text"
                            placeholder="Morocco - Egypt ..." required>
                        </b-form-input>
                        <div class="text-danger" v-show="error.contry">This expression is not incorrect</div>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" label="City" label-for="input-4">
                        <b-form-input :class="{'border-danger':error.city}" v-model="city" id="input-4" type="text"
                            placeholder="Morocco - Egypt ..." required>
                        </b-form-input>
                        <div class="text-danger" v-show="error.city">This expression is incorrect</div>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" label="Adress" label-for="input-4">
                        <b-form-input v-model="adress" id="input-4" type="text" placeholder="Adress" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col-6 mb-4" label="Phone" label-for="input-1">
                        <b-form-input v-model="phone" id="input-1" type="number" placeholder="06 55 22 88 55" required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group class="col mb-4" label="Gmail" label-for="input-1">
                        <b-form-input :class="{'border-danger':error.gmail}" v-model="gmail" id="input-1" type="email"
                            placeholder="exemple@gmail.com" required>
                        </b-form-input>
                        <div class="text-danger" v-show="error.gmail">"Please enter a valid email address</div>
                    </b-form-group>

                    <b-button type="submit" class="mt-4 d-flex justify-content-center align-items-center gap-1 "
                        variant="primary" id="btn-addcutomer" @click="addCustomer" >
                        <i class='bx bx-user-plus'></i> <span>Add Customer</span>
                    </b-button>
                    <b-button type="submit" class="mt-2 d-flex justify-content-center align-items-center gap-1 "
                    variant="outline-danger" id="btn-reset" @click="resetalue" >
                    <i class='bx bx-reset'></i><span>Reset</span>
                    </b-button>


                </div>

            </b-form>

        </b-container>

    </section>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex';
    export default {
        name: "AddCustomer",
        data() {
            return {
                name: '',
                city: '',
                contry: '',
                phone: '',
                adress: '',
                gmail: '',
                gender:'Choose gender',
                options: [{
                        text: 'Choose gender',
                        disabled: true
                    },
                    {
                        value: 'Men',
                        text: 'Men'
                    },
                    {
                        value: 'Woman',
                        text: 'Woman'
                    },
                ],
                error: {
                    name: false,
                    contry: false,
                    city: false,
                    adress: false,
                    gmail: false,

                }
            }
        },

        computed: {
            ...mapState('customers', {
                customers: state => state.customers
            }),
         
        },

        methods: {
            ...mapActions('customers',['ac_addCustomer']),
            addCustomer(event) {
                
                event.preventDefault()

                if (this.name !== '' && this.city !== '' && this.contry !== '' && this.phone !== '' && this.gmail !==
                    '' && this.gender !== '' && this.adress !== '') {
                    this.validationName()
                    this.validationContry()
                    this.validationCity()
                    this.validationGmail()
                    // create object new customer
                    if (this.error.name === false && this.error.contry === false && this.error.city === false && this
                        .error.adress === false && this.error.gmail === false) {
                            let newCustomer={
                                id:this.customers.length+1,
                                name:this.name,
                                contry:this.contry,
                                city:this.city,
                                adress:this.adress,
                                gmail:this.gmail,
                                phone:this.phone,
                                gender:this.gender,
                                orders:[],
                            }
                            this.ac_addCustomer(newCustomer)
                            this.name=this.phone=this.gmail=this.contry=this.city=this.adress=this.gender=''
                    }
                }
            },

            resetalue(event){
                event.preventDefault()
                this.name=this.phone=this.gmail=this.contry=this.city=this.adress=this.gender=''
            },

            validationName() {
                let regex = /^[a-zA-Z\s]*$/
                let valid = regex.test(this.name)
                valid === false ? this.error.name = true : this.error.name = false
            },
            validationContry() {
                let regex = /^[a-zA-Z\s]*$/
                let valid = regex.test(this.contry)
                valid === false ? this.error.contry = true : this.error.contry = false
            },
            validationCity() {
                let regex = /^[a-zA-Z\s]*$/
                let valid = regex.test(this.city)
                valid === false ? this.error.city = true : this.error.city = false
            },
            validationGmail() {
                let regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
                let valid = regex.test(this.gmail)
                valid === false ? this.error.gmail = true : this.error.gmail = false
            },

        },

    }
</script>


<style scoped>
    #btn-addcutomer {
        background-color: var(--couleur-primaire-4);
        width: 98%;
        margin: auto;
    }

    #btn-reset {
        width: 98%;
        margin: auto;
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