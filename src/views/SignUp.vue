<template>

    <div class="row h-100 ">
        <img src="../assets/Rectangle 56.png" alt="" class="object-fit-cover col-5 h-100" id="img-login">

        <div class="col-md-7 d-flex flex-column justify-content-center" px-4 id="content-signUp">
            <div id="cont-logo" class="mb-sm-5" ><img src="../assets/logo-white 1.png" alt="" class="d-block mx-auto " id="logo"></div>
            <div class="text-center">
                <strong id="welcome">Create Your Account Today !</strong>
                <p id="subtitle-welcome">Join us now to unlock exclusive benefits and personalized experiences</p>
            </div>

            <b-form @submit="onSubmit" id="form-signUp">

                <div class="row">

                    <b-form-group class="col-md-6  col-sm-12 ">
                        <label id="custom-label">Full Name</label>
                        <b-form-input :state="validationName" id="Name" v-model="fullName" type="text"
                            :class="{'border-danger':error.name}" placeholder="Enter full name" required>
                        </b-form-input>
                        <div class="text-danger" v-show="error.name">The name is incorrect</div>
                    </b-form-group>

                    <b-form-group class="col-md-6 col-12">
                        <label id="custom-label">Age</label>
                        <b-form-input :state="validationAge" id="Age" v-model="age" type="number"
                            :class="{'border-danger':error.age}" placeholder="Enter Age" required>
                        </b-form-input>
                        <div class="text-danger" v-show="error.name">The age is incorrect</div>
                    </b-form-group>
                </div>

                <label id="custom-label">Email</label>
                <b-form-group>
                    <b-form-input :state="validationemail" id="email" v-model="email" type="email"
                        :class="{'border-danger':error.email}" placeholder="Enter email" required></b-form-input>
                    <b-form-invalid-feedback v-show="emailUsed">This email already has used</b-form-invalid-feedback>
                    <b-form-invalid-feedback v-show="error.email">This email not correcte</b-form-invalid-feedback>
                </b-form-group>

                <label id="custom-label">Password</label>
                <b-form-group>
                    <b-form-input :state="validationpassword" type="password" id="password" v-model="password"
                        :class="{'border-danger':error.password}" placeholder="Enter password" required></b-form-input>
                    <div class="text-danger" v-show="error.password">The password is incorrect</div>
                </b-form-group>

                <b-button type="submit" variant="light" class="fw-bold w-100" id="button">Create account</b-button>
                <p class="text-center mt-3"  id="text-signIn" >Already have an account? <a href="" @click="clickSignin">Sign in</a>.</p>

            </b-form>
        </div>
    </div>

</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex';

    export default {
        name: 'SignUp',
        data() {
            return {
                email: '',
                password: '',
                age: '',
                fullName: '',
                error: {
                    name: false,
                    age: false,
                    email: false,
                    password: false
                },
                emailUsed: false,
                selectedCountry: []
            }
        },


        computed: {

            ...mapState('UsersModule', {
                users: state=>state.users
            }),

        },


        methods: {
            ...mapActions('UsersModule', ['ac_addUser', 'ac_addUserConnected']),

            onSubmit(event) {
                event.preventDefault()

                if (this.name !== '' && this.age !== '' && this.email !== '' && this.password !== '') {
                    this.validationName()
                    this.validationAge()
                    this.validationemail()
                    this.validationpassword()
                    if (this.error.name === false && this.error.age === false && this.error.email === false && this
                        .error.password === false) {
                        let verifEmailUsed = this.users.some(user => user.email === this.email)
                        if (verifEmailUsed === false) {
                            let newUser = {
                                id: this.users.length + 1,
                                fullName: this.fullName,
                                age: this.age,
                                email: this.email,
                                password: this.password,
                            }
                            this.ac_addUserConnected(newUser)
                            this.ac_addUser(newUser)
                            this.$router.push('/DashBord')
                        } else if (verifEmailUsed === true) {
                            this.emailUsed = true
                        }
                    }

                }
            },

            validationName() {
                let nameRegex = /^[a-zA-Z\s]*$/
                let valid = nameRegex.test(this.name)
                valid === false ? this.error.name = true : this.error.name = false
            },

            validationAge() {
                let ageRegex = /^(1[89]|[2-9]\d|\d{3,})$/
                let valid = ageRegex.test(this.age)
                valid === false ? this.error.age = true : this.error.age = false
            },
            validationemail() {
                let regexEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
                let valid = regexEmail.test(this.email)
                valid === false ? this.error.email = true : this.error.email = false
            },
            validationpassword() {
                let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/;
                let valid = passwordRegex.test(this.password)
                valid === false ? this.error.password = true : this.error.password = false
            },

            clickSignin() {
                this.$router.push('/Login')
            },
            
            // get users from localStorage
            getUsers(){
                let userslocal=JSON.parse(localStorage.getItem('Users'))
                if(userslocal.length>0 && userslocal.length>this.users.length){
                    userslocal.forEach(user=>this.ac_addUser(user))
                }
            }
        },
        
        mounted(){
            this.getUsers()
        }

    }
</script>


<style scoped lang="scss">
    #welcome {
        font-size: 22px;
    }

    #subtitle-welcome {
        font-size: 14px;
        color: #969696;
        margin-top: 4px;
    }


    #form-signUp {
        margin-inline: 24%;
        margin-top: 26px;
    }

    #Name,
    #Age,
    #email,
    #password {
        background: transparent;
        border: 1px solid #969696;
        height: 46px;
        margin-bottom: 7px;
        display: block;
        color: white;
        border-radius: 6px;
        padding-left: 15px;
    }





    #email::placeholder {
        color: #969696;
    }

    #password::placeholder {
        color: #969696;
    }

    #Age::placeholder {
        color: #969696;
    }

    #Name::placeholder {
        color: #969696;
    }




    #Name:focus {
        color: #ffffff;
        box-shadow: none;
        border-color: white;
    }

    #Age:focus {
        color: #ffffff;
        box-shadow: none;
        border-color: white;
    }

    #email:focus {
        color: #ffffff;
        box-shadow: none;
        border-color: white;
    }

    #password:focus {
        color: #ffffff;
        box-shadow: none;
        border-color: white;
    }


    #button {

        margin-top: 35px;
        color: #02021E;
        height: 46px;

    }

    #custom-label {
        background: #02021e;
        position: relative;
        top: 8px;
        width: AUTO;
        text-align: center;
        left: 11px;
        font-size: 13px;
        display: inline-block;
        padding: 0px 4px;
    }

    /** PHONE */
    @media screen and (max-width: 768px) {

        #img-login {
            display: none;
        }

        #content-signUp {
           
            padding: 30px 0px;

            #cont-logo {
                margin-bottom: 44px;

                #logo {
                    width: 40%;
                }

            }

            #welcome {
                font-size: 20px;
            }

            #subtitle-welcome {
                font-size: 12px;
                width: 80%;
                margin: auto;
                margin-top: 7px;
                margin-bottom: 30px;
            }

            #form-signUp {
                margin: 0px 30px;

                #custom-label {
                    font-size: 12px;
                }

                #Name,
                #Age,
                #email,
                #password {
                    font-size: 12px;
                    height: 50px;
                    margin-bottom: 11px;
                }

                #button {
                    font-size: 16px;
                    height: 45px;
                }

                #text-signIn{
                    font-size: 14px;
                }
            }
        }
    }
</style>