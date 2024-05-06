const state={
    smartwatch:[],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []
}

const mutations={
    m_addOrderShipped(state,{category,order}){
        state[category].push(order)
    },

    m_fetchOrders(state,{category,orders}){
        state[category]=orders
    },

    m_RemoveOrderShipped(state,{category,date}){
        state[category]= state[category].filter(order=>{
            return order.date!==date
        })
   },
}

const actions ={
    ac_addOrderShipped({commit,state},{category,order}){
        commit('m_addOrderShipped',{category,order})
        localStorage.setItem('ShippedOrders', JSON.stringify(state))
    },

    ac_fetchOrdersShipped({commit}){
        let ordersLocal=JSON.parse(localStorage.getItem('ShippedOrders'))
        for(const ctg in ordersLocal){
            if(ordersLocal[ctg]){
                commit('m_fetchOrders',{category:ctg,orders:ordersLocal[ctg]})
            }
        }
    },

    ac_RemoveOrderShipped({commit,state},{category,date}){
        commit('m_RemoveOrderShipped',{category,date})
        localStorage.setItem('ShippedOrders', JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}