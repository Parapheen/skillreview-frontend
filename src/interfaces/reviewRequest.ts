import { IUser } from "./user";


export interface IReviewRequest {
    matchId: string
    author: IUser | null
    content: string
}