import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  isDebug(state: State): boolean,
  isLoggedIn(state: State): boolean,
}

export const getters: GetterTree<State, State> & Getters = {
  isDebug(state) {
    return state.debug
  },
  isLoggedIn(state) {
      return state.user?.steamId ? true : false
  }
}