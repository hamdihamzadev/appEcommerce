let state={
    new:[],
    confirmed:[],
    shipped:[],
    progress:[],
   
}

let mutations={
    m_addNewValue(state,{status,values}){
        state[status]=values
    },

    m_removeValue(state,{status,index}){
        state[status].splice(index,1)
    }
}

let actions= {
    ac_addNewValue({commit,state},{status,values}){
        commit('m_addNewValue',{status,values})
        localStorage.setItem('valuesStatus',JSON.stringify(state))
    },

    ac_fetchStatus({commit}){
        let valuesLocal=JSON.parse(localStorage.getItem('valuesStatus'))
        for(const page in valuesLocal){
            valuesLocal[page].length>0 ? commit('m_addNewValue',{status:page,values:valuesLocal[page]}) :''           
        }
    },

    ac_removeValue({commit,state},{status,index}){
        commit('m_removeValue', {status,index})
        localStorage.setItem('valuesStatus',JSON.stringify(state))
    }
} 


export default {
    namespaced: true,
    state,
    mutations,
    actions
}