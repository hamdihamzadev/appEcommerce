let state={
    users:[],
    userConnected:[]
}

let mutations={
    m_addUser(state,newuser){
        state.users.push(newuser)
    },
    m_addUserConnected(state,usrConnected){
        state.userConnected.push(usrConnected)
    },
    m_logOutUser(state,idUserOut){
        state.userConnected= state.userConnected.filter(user=> user.id!==idUserOut )
    },
}

let actions={
    ac_addUser({commit,state},newuser){
        commit('m_addUser',newuser)
        localStorage.setItem('Users',JSON.stringify(state.users))
    },

    ac_FetchusersConnected({commit}){
        let usersConnectedLocal=JSON.parse(localStorage.getItem('userConnected'))
        usersConnectedLocal.length>0?usersConnectedLocal.forEach(user=>commit('m_addUserConnected',user)):''
    },

    ac_addUserConnected({commit,state},usrConnected){
        commit('m_addUserConnected',usrConnected)
        localStorage.setItem('userConnected',JSON.stringify(state.userConnected))
    },

    ac_logOutUser({commit,state},idUserOut){
        commit('m_logOutUser',idUserOut)
        localStorage.setItem('userConnected',JSON.stringify(state.userConnected))
    }
  
}
    
export default{
    namespaced: true,
    state,
    mutations,
    actions
}