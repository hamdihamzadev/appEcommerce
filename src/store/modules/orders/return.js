const state={
    smartwatch:[],
    camera: [],
    powerbank: [],
    airpods: [],
    keyboard: []

   
}

const mutations={

    m_addOrderReturn(state,{category,order}){
        state[category].push(order)
    },

    m_fetchOrders(state,{category,orders}){
        state[category]=orders
    },

    m_RemoveOrderReturn(state,{category,date}){
        state[category]= state[category].filter(order=>{
            return order.date!==date
        })
   },
}

const actions ={
    ac_addOrderReturn({commit,state},{category,order}){
        commit('m_addOrderReturn',{category,order})
        localStorage.setItem('Return', JSON.stringify(state))
    },

    ac_fetchOrdersReturn({commit}){
        let ordersLocal=JSON.parse(localStorage.getItem('Return'))
        for(const ctg in ordersLocal){
            if(ordersLocal[ctg]){
                commit('m_fetchOrders',{category:ctg,orders:ordersLocal[ctg]})
            }
        }
    },

    ac_RemoveOrderReturn({commit,state},{category,date}){
        commit('m_RemoveOrderReturn',{category,date})
        localStorage.setItem('Return', JSON.stringify(state))
    }
}

export default{
    namespaced: true,
    state,
    mutations,
    actions
}