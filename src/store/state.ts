import { IMinimalMatch } from "../interfaces/match";
import { IReview } from "../interfaces/review";
import { IReviewRequest } from "../interfaces/reviewRequest";
import { IUser } from "../interfaces/user";

export interface State {
  debug: boolean
  user: IUser | null
  reviewRequest: IReviewRequest
  matchInfo: IMinimalMatch | null
  review: IReview
}

export const state: State = {
  debug: import.meta.env.MODE === 'development',
  user: null,
  reviewRequest: {
      description: "",
      match_id: "",
      author_uid: "",
      self_rate_laning: null,
      self_rate_teamfights: null,
      self_rate_overall: null,
      hero_played: "",
      author_rank: "",
  },
  review: {
      description: "",
      review_request_uuid: "",
      rate_laning: null,
      rate_teamfights: null,
      rate_overall: null,
      state: "submitted"
  },
  matchInfo: null
}

