import { GetterTree } from 'vuex'
import { State } from './state'

export type Getters = {
  isDebug(state: State): boolean,
  isLoggedIn(state: State): boolean,
  reviewRequestMatch(state: State): string,
}

export const getters: GetterTree<State, State> & Getters = {
  isDebug(state) {
    return state.debug
  },
  isLoggedIn(state) {
      return state.user?.token ? true : false
  },
  reviewRequestMatch(state: State) {
      return state.reviewRequest.matchId
  },
}