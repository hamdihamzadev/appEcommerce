<template>

  <div class="row h-100 ">
    <img src="../assets/Rectangle 56.png" alt="" class="object-fit-cover  col-5 h-100 " id="img-login">

    <div id="cont-login" class="col-md-7 d-flex flex-column justify-content-center" px-4>

      <div id="cont-logo"><img src="../assets/logo-white 1.png" alt="" class="d-block mb-sm-5 mx-auto " id="logo"></div>
      <div class="text-center">
        <strong id="welcome">Welcome to our platform!</strong>
        <p id="subtitle-welcome">Log in to access your account and start exploring</p>
      </div>

      <b-form @submit="onSubmit" id="form-login">

        <label id="custom-label">Email</label>
        <b-form-group id="input-group-1">
          <b-form-input :class="{'border-danger':error.email}" id="email" v-model="email" type="email"
            placeholder="Enter email" required></b-form-input>
          <b-form-invalid-feedback v-show="error.email">This email not correcte</b-form-invalid-feedback>
        </b-form-group>

        <label id="custom-label">Password</label>
        <b-form-group id="input-group-2">
          <b-form-input ::class="{'border-danger':error.password}" type="password" id="password" v-model="password"
            placeholder="Enter password" required></b-form-input>
          <b-form-invalid-feedback v-show="error.password">This password not correcte</b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" variant="light" class="fw-bold w-100" id="button">Login</b-button>
        <p class="text-center mt-3" id="signUp" >Not registered yet? <a href="" @click="clickSignup">Sign up here</a></p>

      </b-form>

    </div>
  </div>

</template>

<script>
  import {
    mapActions,
    mapState
  } from 'vuex'
  export default {
    name: 'LoginUser',
    data() {
      return {
        email: '',
        password: '',
        error: {
          email: false,
          password: false
        }
      }
    },

    computed: {

      ...mapState('UsersModule', {
        users: 'users'
      }),

    },

    methods: {
      ...mapActions('UsersModule', ['ac_addUser', 'ac_addUserConnected']),

      onSubmit(event) {
        event.preventDefault()
        this.users.forEach(user => {
          user.email === this.email ? this.error.email = false : this.error.email = true
          user.password === this.password ? this.error.password = false : this.error.password = true
          if (this.error.email === false && this.error.password === false) {
            this.ac_addUserConnected(user)
            this.$router.push('/DashBord')
          }

        })
      },

      clickSignup() {
        this.$router.push('/')
      }
    },



  }
</script>



<style scoped lang="scss" >
  #welcome {
    font-size: 22px;
  }

  #subtitle-welcome {
    font-size: 14px;
    color: #969696;
    margin-top: 4px;
  }



  #form-login {
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
    margin-bottom: 21px;
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

  @media screen and (max-width: 768px) {

    #cont-login{
      justify-content: normal;
      margin: 20% 0%;
    }

    #img-login {
      display: none;
    }



    #cont-logo {
      margin-bottom: 44px;

      #logo {
        width: 40%;
      }

    }

    #welcome{
      font-size: 20px;
    }

    #subtitle-welcome{
      font-size: 12px;
    width: 80%;
    margin: auto;
    margin-top: 7px;
    margin-bottom: 30px;
    }

    #form-login{
      margin: 0px 30px;
      #custom-label{
        font-size: 12px;
      }

      #email,#password{
        font-size: 12px;
        height: 50px;
        margin-bottom:11px;
      }

      #button{
        font-size: 16px;
        height: 45px;
      }

      #signUp{
        font-size: 14px;
      }
    }

    #form-login{
      margin-inline: 12%;
    }


  }
</style>