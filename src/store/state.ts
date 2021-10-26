import { IUser } from "../interfaces/user";

export interface State {
  debug: boolean
  user: IUser | null
}

export const state: State = {
  debug: import.meta.env.MODE === 'development',
  user: null
}

