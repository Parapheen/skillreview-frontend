import { IReview } from "./review";
import { IUser } from "./user";

export interface IReviewRequest {
    id?: string
    author?: IUser
    match_id: string
    author_uid: string
    description: string
    hero_played: string
    self_rate_overall: number | null
    self_rate_laning: number | null
    self_rate_teamfights: number | null
    author_rank: string
    state?: "open" | "closed"
    reviews?: Array<IReview>
}
export interface IReviewRequestUpdate {
    description: string
    state: "open" | "closed"
}