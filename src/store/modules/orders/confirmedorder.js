const state={
    smartwatch:[],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []
}

const mutations={
    
    m_addorderConfirmed(state,{category,order}){
        state[category].push(order)
    },

    m_fetchOrders(state,{category,orders}){
        state[category]=orders
    },

    m_RemoveOrderConfirmed(state,{category,date}){
        state[category]= state[category].filter(order=>{
            return order.date!==date
        })
   },


}

const actions ={

    ac_orderConfirmed({commit,state},{category,order}){
        commit('m_addorderConfirmed',{category,order})
        localStorage.setItem('Confirmed', JSON.stringify(state))

    },

    ac_fetchOrdersConfirmed({commit}){
        let ordersLocal=JSON.parse(localStorage.getItem('Confirmed'))
        for(const ctg in ordersLocal){
            if(ordersLocal[ctg]){
                commit('m_fetchOrders',{category:ctg,orders:ordersLocal[ctg]})
            }
        }
    },

    ac_RemoveOrderConfirmed({commit,state},{category,date}){
        commit('m_RemoveOrderConfirmed',{category,date})
        localStorage.setItem('Confirmed', JSON.stringify(state))
             
    },


}
  
export default{
    namespaced: true,
    state,
    mutations,
    actions
}

