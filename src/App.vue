<template>
  <div id="app" class="container-flui d-flex">
    <div ref="sidebar" :class="{'invisible':fullWidth}" >
      <SideBar  :show-side-bar="showSide" />
    </div>
    <div class="head-cont" ref="headCont" :class="{'fullWidth':fullWidth}">
      <HeaDer @toggel-header="toggelheader()" v-show="visibleHeader"  :hide-sid-phone="hideSidPhone"  />
      <router-view />
    </div>
  </div>
</template>

<script>
  import SideBar from './components/app/SideBar.vue'
  import HeaDer from './components/app/HeaDer.vue'

  export default {
    name: 'App',
    components: {
      SideBar,
      HeaDer
    },

    data(){
      return{
        sidePhne:true,
        hideSidPhone:false,
        showSide:false
      }
    },

    computed: {
      visibleHeader() {
        let path = this.$route.path
        if (path === '/' || path === '/Login' || path==='/Statistics/Worst' || path==='/Profitability' || path==='/MyStore'    ) {
          return false
        } else {
          return true
        }

      },
      fullWidth() {
        let path = this.$route.path
        if (path === '/' || path === '/Login' || path==='/Statistics/Worst' || path==='/Profitability' || path==='/MyStore' ) {
          return true
        } else {
          return false
        }
      }
    },

    methods: {
      toggelheader() {
        // const sidebar = this.$refs.sidebar
        const headCont = this.$refs.headCont
        // sidebar.classList.toggle('invisible')
        headCont.classList.toggle('fullWidth')
        // phone
        this.sidePhne=!this.sidePhne
        this.hideSidPhone=!this.hideSidPhone
        this.showSide=!this.showSide

      }
    }

  }
</script>



<style lang="scss">
  #app {
    background-color: #02021e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: white;
    overflow-x: hidden;

    .head-cont {
      width: 100%;
      margin-left: 14%;
      transition: 0.3s;
      height: 100vh;

      .dashbord,
      .neworders,
      .confirmedorders,
      .shipped,
      .delivred,
      .return,
      .postpond,
      .inprogress,
      .addOrder,
      #addCustomer,
      #section-topCustomer,
      #topStatistics {
        margin: 47px 0px;

      }

      .namepage {
        margin-bottom: 30px;
      }
    }

    .fullWidth {
      margin-left: 0px;
    }

    // .invisible {
    //   display: none;
    // }
  }

  /** PHONE */
  @media screen and (max-width: 768px) {

    #app .head-cont {
      margin-left: 0%;
    }

    .invisible{
      display:block
    }

  }
</style>