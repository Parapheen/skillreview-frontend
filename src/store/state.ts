import { IMinimalMatch } from "../interfaces/match";
import { IReview } from "../interfaces/review";
import { IFilters, IReviewRequest } from "../interfaces/reviewRequest";
import { IUser } from "../interfaces/user";

export interface State {
  debug: boolean
  user: IUser
  reviewRequest: IReviewRequest
  matchInfo: IMinimalMatch | null
  review: IReview
  filters: IFilters
}

export const state: State = {
  debug: import.meta.env.MODE === 'development',
  user: {
      id: "",
      avatar: "",
      token: "",
      nickname: "",
      steam32Id: "",
      steam64Id: "",
      rank: "",
      plan: "basic",
      verified_reviewer: false
  },
  reviewRequest: {
      description: "",
      match_id: "",
      author_uid: "",
      self_rate_laning: null,
      self_rate_teamfights: null,
      self_rate_overall: null,
      hero_played: 0,
      author_rank: "",
      position: undefined,
  },
  review: {
      description: "",
      review_request_uuid: "",
      rate_laning: null,
      rate_teamfights: null,
      rate_overall: null,
      state: "submitted"
  },
  matchInfo: null,
  filters: {
      position: undefined,
      state: 'open',
  }
}

