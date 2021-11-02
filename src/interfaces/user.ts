import { IReview } from "./review";
import { IReviewRequest } from "./reviewRequest";

export interface IUser {
    id: string
    nickname: string
    avatar: string
    steam64Id: string
    steam32Id: string
    rank: string
    plan: 'basic' | 'pro'
    email?: string
    token?: string
    review_requests?: Array<IReviewRequest>
    reviews?: Array<IReview>
}