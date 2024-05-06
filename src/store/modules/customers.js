let state={
    customers:[]
}

let mutations={
    m_addCustomer(state,newCustomer){
        state.customers.push(newCustomer)
    },

    m_fetchCustomer(state,{allCustomers}){
        state.customers=allCustomers
    },

    m_addOrderCustomer(state,{newOrder,idCustomer}){
     let customer= state.customers.find(customer=> customer.id===idCustomer )
     customer.orders.push(newOrder)
    }
}

let actions={
    ac_addCustomer({commit,state},newCustomer){
        commit('m_addCustomer', newCustomer)
        localStorage.setItem('Customers', JSON.stringify(state.customers))
    },

    ac_fetchCustomer({commit}){
        let customersLocal = JSON.parse(localStorage.getItem('Customers'))
        commit('m_fetchCustomer',{allCustomers:customersLocal})
        
    },

    ac_addOrderCustomer({commit,state},{newOrder,idCustomer}){
        commit('m_addOrderCustomer',{newOrder,idCustomer})
        localStorage.setItem('Customers', JSON.stringify(state.customers))
    }
}

export default{
    namespaced:true,
    state,
    mutations,
    actions
}

