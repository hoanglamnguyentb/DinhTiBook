export const state = {
  layoutType : "grid"
}

export const getters = {
  getLayout(state) {
    return state.layoutType
  }
}

export const mutations = {
  CHANGE_LAYOUT(state, layoutType) {
    state.layoutType = layoutType;
  },
}
  
export const actions = {
  changeLayoutType({ commit }, layoutType) {
    console.log(layoutType)
    commit('CHANGE_LAYOUT', layoutType);
  },
}