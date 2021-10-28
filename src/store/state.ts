import { IReviewRequest } from "../interfaces/reviewRequest";
import { IUser } from "../interfaces/user";

export interface State {
  debug: boolean
  user: IUser | null
  reviewRequest: IReviewRequest
}

export const state: State = {
  debug: import.meta.env.MODE === 'development',
  user: null,
  reviewRequest: {
      content: "",
      matchId: "",
      author: null
  },
}

