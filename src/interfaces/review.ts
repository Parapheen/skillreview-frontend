import { IUser } from "./user"

export interface IReview {
    id?: string
    review_request_uuid?: string
    description: string
    state: "submitted" | "accepted" | "reviewed"
    rate_laning: number | null
    rate_teamfights: number | null
    rate_overall: number | null
    author?: IUser
}

export interface IReviewUpdate {
    review_request_uuid: string
    description: string
    state: "submitted" | "accepted" | "reviewed"
}