import { IUser } from '/@/interfaces/user';
import { MutationTree } from 'vuex'
import { State } from './state'

export enum Mutation {
  SET_USER = 'SET_USER',
  SET_MATCHID = 'SET_MATCHID'
}

export type Mutations<S = State> = {
  [Mutation.SET_USER](state: S, payload: IUser | null): void,
  [Mutation.SET_MATCHID](state: S, payload: string | null): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [Mutation.SET_USER](state: State, payload: IUser | null) {
	state.user = payload
  },
  [Mutation.SET_MATCHID](state: State, payload: string) {
	state.reviewRequest.matchId = payload
  },
}