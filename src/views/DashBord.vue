<template>
  <b-container fluid class="dashbord pb-4">
    <h1 class="mb-4">Dashbord</h1>
    <CartsAllorders />
    <b-row id="cont-charts" >

      <b-col md="6" cols="12" >
        <GraphiqueOrders />
      </b-col>

      <b-col md="6" cols="12" >
        <ChartSales />
      </b-col>

    </b-row>

  </b-container>
</template>

<script>
  import CartsAllorders from '@/views/dashbord/CartsAllorders.vue'
  import GraphiqueOrders from '@/views/dashbord/ChartOrders.vue'
  import ChartSales from '@/views/dashbord/ChartSales.vue'
import axios from 'axios'

  export default {
    name: 'DashBord',
    components: {
      CartsAllorders,
      GraphiqueOrders,
      ChartSales,
    },
    data() {
      return {
        fields: ['first_name', 'last_name', 'age', 'menu'],
        items: [
        { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' },
      ],
      options:['confirmed','shipped'],
      users:[]
      }
    
    },

    methods:{
     async addUser(){
      try{
        await axios.post('http://localhost:3000/api/data/users',this.options)
      }catch(error){
        console.log(`error is ${error}`)
      }
        
      },

      async getUser(){
        try{
          const data= (await axios.get('http://localhost:3000/api/data/users')).data
          this.users=data
          
        }catch(error){
          console.log(`error is ${error}`)
        }
      }
    }

  }
</script>

<style>
  #table-Order {
    color: white
  }

  #table{
    color:white
  }

  @media screen and (max-width: 768px){
    #cont-charts{
      margin-top: 18px;
      gap: 18px;
    }
  }
</style>