const state={
    smartwatch:[],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []

}

const mutations={
    m_addOrderInProgress(state,{category,order}){
        state[category].push(order)
    },

    m_fetchOrders(state,{category,orders}){
        state[category]=orders
    },


    m_RemoveOrderProgress(state,{category,date}){
        state[category]= state[category].filter(order=>{
            return order.date!==date
        })
   },
}

const actions ={
    ac_addOrderInProgress({commit,state},{category,order}){
        commit('m_addOrderInProgress',{category,order})
        localStorage.setItem('Progress', JSON.stringify(state))
    },

    ac_fetchOrdersInProgress({commit}){
        let ordersLocal=JSON.parse(localStorage.getItem('Progress'))
        for(const ctg in ordersLocal){
            if(ordersLocal[ctg]){
                commit('m_fetchOrders',{category:ctg,orders:ordersLocal[ctg]})
            }
        }
    },

    ac_RemoveOrderProgress({commit,state},{category,date}){
        commit('m_RemoveOrderProgress',{category,date})
        localStorage.setItem('Progress', JSON.stringify(state))
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}