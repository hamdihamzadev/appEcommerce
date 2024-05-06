const state={
    smartwatch:[],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []

  
}

const mutations={
    m_addOrderCancelled(state,{category,order}){
        state[category].push(order)
    },

    m_fetchOrders(state,{category,orders}){
        state[category]=orders
    },

    m_RemoveOrderCancelled(state,{category,date}){
        state[category]= state[category].filter(order=>{
            return order.date!==date
        })
   },
}

const actions ={
    ac_addOrderCancelled({commit,state},{category,order}){
        commit('m_addOrderCancelled',{category,order})
        localStorage.setItem('CancelledOrders',JSON.stringify(state))
    },

    ac_fetchOrdersCancelled({commit}){
        let ordersLocal=JSON.parse(localStorage.getItem('CancelledOrders'))
        for(const ctg in ordersLocal){
            if(ordersLocal[ctg]){
                commit('m_fetchOrders',{category:ctg,orders:ordersLocal[ctg]})
            }
        }
    },

    ac_RemoveOrderCancelled({commit,state},{category,date}){
        commit('m_RemoveOrderCancelled',{category,date})
        localStorage.setItem('CancelledOrders',JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}