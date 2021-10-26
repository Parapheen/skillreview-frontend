import { IUser } from '/@/interfaces/user';
import { MutationTree } from 'vuex'
import { State } from './state'

export enum Mutation {
  SET_USER = 'SET_USER',
}

export type Mutations<S = State> = {
  [Mutation.SET_USER](state: S, payload: IUser | null): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [Mutation.SET_USER](state: State, payload: IUser | null) {
	state.user = payload
  },
}