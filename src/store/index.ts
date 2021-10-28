import { InjectionKey } from 'vue'
import { createStore, Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

import { mutations, Mutations, Mutation } from './mutations'
import { actions, Actions, Action } from './actions'
import { getters, Getters } from './getters'
import { state } from './state'
import type { State } from './state'

export const key: InjectionKey<VuexStore<State>> = Symbol()

export const store = createStore({
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, value) =>
          Cookies.set(key, value, { expires: 365, secure: true, sameSite: 'strict' }),
        removeItem: (key) => Cookies.remove(key),
      },
      key: 'skillreview',
      paths: ['user']
    }
  )],
})

export type Store = Omit<VuexStore<State>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export function useStore(): Store {
  return store as Store
}

export { State, Mutation, Action }