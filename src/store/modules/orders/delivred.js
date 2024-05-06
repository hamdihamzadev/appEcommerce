const state={
    smartwatch:[],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []

}

const mutations={
    m_addOrdersdelivered(state,{category,order}){
        state[category].push(order)
    },

    m_fetchOrders(state,{category,orders}){
        state[category]=orders
    },

    m_RemoveOrderDelivred(state,{category,date}){
        state[category]= state[category].filter(order=>{
            return order.date!==date
        })
   },
}

const actions ={
    ac_addOrdersdelivered({commit,state},{category,order}){
        commit('m_addOrdersdelivered',{category,order})
        localStorage.setItem('Ordersdelivered', JSON.stringify(state))
    },

    ac_fetchOrdersDelivered({commit}){
        let ordersLocal=JSON.parse(localStorage.getItem('Ordersdelivered'))
        for(const ctg in ordersLocal){
            if(ordersLocal[ctg]){
                commit('m_fetchOrders',{category:ctg,orders:ordersLocal[ctg]})
            }
        }
    },

    ac_RemoveOrderDelivred({commit,state},{category,date}){
        commit('m_RemoveOrderDelivred',{category,date})
        localStorage.setItem('Ordersdelivered', JSON.stringify(state))
    }
}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}



