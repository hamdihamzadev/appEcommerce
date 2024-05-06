
const state={
    
    smartwatch:[],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []

}

const mutations={

    m_addNewOrder(state,{category,order}){
        state[category].push(order)
    },

    m_fetchOrders(state,{category,orders}){
        state[category]=orders
    },

    m_RemoveNewOrder(state,{category,date}){
        state[category]= state[category].filter(order=>{
            return order.date!==date
        })
   },

}

const actions ={
    ac_addNewOrder({commit,state},{category,order}){
        commit('m_addNewOrder',{category,order})
        localStorage.setItem('New orders', JSON.stringify(state))
    },

    ac_fetchOrders({commit}){
        let ordersLocal=JSON.parse(localStorage.getItem('New orders'))
        for(const ctg in ordersLocal){
            if(ordersLocal[ctg]){
                commit('m_fetchOrders',{category:ctg,orders:ordersLocal[ctg]})
            }
        }
    },

    ac_RemoveNewOrder({commit,state},{category,date}){
        commit('m_RemoveNewOrder' , {category,date})
        localStorage.setItem('New orders', JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}






