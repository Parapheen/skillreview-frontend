import { IUser } from '/@/interfaces/user';
import { MutationTree } from 'vuex'
import { State } from './state'
import { IMinimalMatch } from '../interfaces/match';

export enum Mutation {
  SET_USER = 'SET_USER',
  SET_TOKEN = 'SET_TOKEN',
  SET_MATCH_INFO = 'SET_MATCH_INFO',
  SET_MATCHID = 'SET_MATCHID',
  SET_HEROPLAYED = 'SET_HEROPLAYED',
  SET_DESCRIPTION = 'SET_DESCRIPTION',
  SET_REVIEW_DESCRIPTION = 'SET_REVIEW_DESCRIPTION',
  SET_SELF_RATE_LANING = 'SET_SELF_RATE_LANING',
  SET_SELF_RATE_TEAMFIGHTING = 'SET_SELF_RATE_TEAMFIGHTING',
  SET_SELF_RATE_OVERALL = 'SET_SELF_RATE_OVERALL',
  SET_REVIEW_RATE_LANING = 'SET_REVIEW_RATE_LANING',
  SET_REVIEW_RATE_TEAMFIGHTING = 'SET_REVIEW_RATE_TEAMFIGHTING',
  SET_REVIEW_RATE_OVERALL = 'SET_REVIEW_RATE_OVERALL',
  SET_RR_ID = 'SET_RR_ID',
}

export type Mutations<S = State> = {
  [Mutation.SET_USER](state: S, payload: IUser): void,
  [Mutation.SET_TOKEN](state: S, payload: string): void,
  [Mutation.SET_RR_ID](state: S, payload: string | undefined): void,
  [Mutation.SET_MATCH_INFO](state: S, payload: IMinimalMatch | null): void,
  [Mutation.SET_MATCHID](state: S, payload: string | null): void,
  [Mutation.SET_HEROPLAYED](state: S, payload: number | null): void,
  [Mutation.SET_DESCRIPTION](state: S, payload: string | null): void,
  [Mutation.SET_REVIEW_DESCRIPTION](state: S, payload: string | null): void,
  [Mutation.SET_SELF_RATE_LANING](state: S, payload: number | null): void,
  [Mutation.SET_SELF_RATE_TEAMFIGHTING](state: S, payload: number | null): void,
  [Mutation.SET_SELF_RATE_OVERALL](state: S, payload: number | null): void,
  [Mutation.SET_REVIEW_RATE_LANING](state: S, payload: number | null): void,
  [Mutation.SET_REVIEW_RATE_TEAMFIGHTING](state: S, payload: number | null): void,
  [Mutation.SET_REVIEW_RATE_OVERALL](state: S, payload: number | null): void,
}

export const mutations: MutationTree<State> & Mutations = {
  [Mutation.SET_USER](state: State, payload: IUser) {
    let userInCookie: IUser = {
        email: payload.email,
        avatar: payload.avatar,
        id: payload.id,
        steam64Id: payload.steam64Id,
        steam32Id: payload.steam32Id,
        nickname: payload.nickname,
        rank: payload.rank,
        plan: payload.plan,
        token: payload.token,
    }
	state.user = userInCookie
  },
  [Mutation.SET_TOKEN](state: State, payload: string) {
	state.user.token = payload
  },
  [Mutation.SET_RR_ID](state: State, payload: string | undefined) {
	state.review.review_request_uuid = payload
  },
  [Mutation.SET_MATCH_INFO](state: State, payload: IMinimalMatch | null) {
	state.matchInfo = payload
  },
  [Mutation.SET_MATCHID](state: State, payload: string) {
	state.reviewRequest.match_id = payload
  },
  [Mutation.SET_HEROPLAYED](state: State, payload: number) {
	state.reviewRequest.hero_played = payload
  },
  [Mutation.SET_DESCRIPTION](state: State, payload: string) {
	state.reviewRequest.description = payload
  },
  [Mutation.SET_REVIEW_DESCRIPTION](state: State, payload: string) {
	state.review.description = payload
  },
  [Mutation.SET_SELF_RATE_LANING](state: State, payload: number | null) {
	state.reviewRequest.self_rate_laning = payload
  },
  [Mutation.SET_SELF_RATE_TEAMFIGHTING](state: State, payload: number | null) {
	state.reviewRequest.self_rate_teamfights = payload
  },
  [Mutation.SET_SELF_RATE_OVERALL](state: State, payload: number | null) {
	state.reviewRequest.self_rate_overall = payload
  },
  [Mutation.SET_REVIEW_RATE_LANING](state: State, payload: number | null) {
	state.review.rate_laning = payload
  },
  [Mutation.SET_REVIEW_RATE_TEAMFIGHTING](state: State, payload: number | null) {
	state.review.rate_teamfights = payload
  },
  [Mutation.SET_REVIEW_RATE_OVERALL](state: State, payload: number | null) {
	state.review.rate_overall = payload
  },
}