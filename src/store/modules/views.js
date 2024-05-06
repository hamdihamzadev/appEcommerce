let state = {
    views:0
}

let mutations = {
    m_addView(state){
        state.views=state.views+1
    },

    m_fetchViews(state,{currentViews}){
        state.views=currentViews
    }
}

let actions = {
    ac_addViews({commit,state}){
        commit('m_addView')
        localStorage.setItem('views',JSON.stringify(state.views))
    },

    ac_fetchViews({commit}){
        let viewsLocal=JSON.parse(localStorage.getItem('views'))
        if(viewsLocal!==0){
            commit('m_fetchViews',{currentViews:viewsLocal})
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}



