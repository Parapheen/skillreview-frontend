import { AxiosResponse } from 'axios';
import { IMatch } from '../interfaces/match';
import { IUser, IUserUpdate } from '../interfaces/user';
import apiClient from './base';

const END_POINT = '/users';

export const getRecentMatches = async (id: string | undefined, token: string | null): Promise<AxiosResponse<Array<IMatch>>> => apiClient
  .get(`${END_POINT}/${id}/matches`, {headers: {'Authorization': `Bearer ${token}`}});

export const getUserProfile = async (token: string | null): Promise<AxiosResponse<IUser>> => apiClient
  .get(`${END_POINT}/me`, {headers: {'Authorization': `Bearer ${token}`}})

export const updateUser = async (id: string | undefined, token: string | null, update: IUserUpdate): Promise<AxiosResponse<IUser>> => apiClient
  .put(`${END_POINT}/${id}`, update, {headers: {'Authorization': `Bearer ${token}`}})