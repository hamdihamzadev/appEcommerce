const state={

    new:[],
    confirmed:[],
    shipped:[],
    Delivered:[],
    cancelled:[],
    progress:[],
    return:[]

}

const mutations={
    m_addInAllOrder(state,{status,order}){
        state[status].push(order)
    },

    m_fetchOrders(state,{status,orders}){
        state[status]=orders
    }

}

const actions={
    ac_addInAllOrder({commit,state},{status,order}){
        commit('m_addInAllOrder',{status,order})
        localStorage.setItem('allOrder',JSON.stringify(state))
    },

    ac_fetchAllorders({commit}){
        let ordersLocal=JSON.parse(localStorage.getItem('allOrder'))
        for(const statu in ordersLocal){
            if(ordersLocal[statu]){
                commit('m_fetchOrders',{status:statu,orders:ordersLocal[statu]})
            }
        }
        
    }

}

export default{
    namespaced:true,
    state,
    mutations,
    actions

}



