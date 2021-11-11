import { GetterTree } from 'vuex'
import { IReview } from '../interfaces/review'
import { IUser } from '../interfaces/user'
import { State } from './state'

export type Getters = {
  isDebug(state: State): boolean,
  isLoggedIn(state: State): boolean,
  reviewRequestMatch(state: State): string,
  reviewRequestDescription(state: State): string,
  reviewRequestRateLaning(state: State): number | null,
  reviewRequestRateTeamFighting(state: State): number | null,
  reviewRequestRateOverall(state: State): number | null,
  reviewRequestRates(state: State): Array<number | null>,
  reviewRates(state: State): Array<number | null>,
  reviewRequestHeroPlayed(state: State): number,
  getReview(state: State): IReview | null,
  getUserRank(state: State): string,
  getUser(state: State): IUser | null,
  getToken(state: State): string | null,
}

export const getters: GetterTree<State, State> & Getters = {
  isDebug(state) {
    return state.debug
  },
  isLoggedIn(state) {
      return state.user.token ? true : false
  },
  reviewRequestMatch(state: State) {
      return state.reviewRequest.match_id
  },
  reviewRequestDescription(state: State) {
      return state.reviewRequest.description
  },
  reviewRequestHeroPlayed(state: State) {
      return state.reviewRequest.hero_played
  },
  reviewRequestRateLaning(state: State) {
      return state.reviewRequest.self_rate_laning
  },
  reviewRequestRateTeamFighting(state: State) {
      return state.reviewRequest.self_rate_teamfights
  },
  reviewRequestRateOverall(state: State) {
      return state.reviewRequest.self_rate_overall
  },
  reviewRequestRates(state: State) {
      return [
          state.reviewRequest.self_rate_overall,
          state.reviewRequest.self_rate_laning,
          state.reviewRequest.self_rate_teamfights,
      ]
  },
  reviewRates(state: State) {
      return [
          state.review.rate_overall,
          state.review.rate_laning,
          state.review.rate_teamfights,
      ]
  },
  getUserRank(state: State) {
      if (state.user) {
        return state.user?.rank
      }
      return ""
  },
  getUser(state: State) {
      if (state.user) {
        return state.user
      }
      return null
  },
  getReview(state: State) {
      if (state.review) {
        return state.review
      }
      return null
  },
  getToken(state: State) {
      if (state.user.token) {
        return state.user.token
      }
      return null
  }
}