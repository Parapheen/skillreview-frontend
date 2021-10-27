import { AxiosResponse } from 'axios';
import { IMatch } from '../interfaces/match';
import apiClient from './base';

const END_POINT = '/users/';

export const getRecentMatches = async (id: string | undefined, token: string | null): Promise<AxiosResponse<Array<IMatch>>> => apiClient
  .get(`${END_POINT}${id}/matches`, {headers: {'Authorization': `Bearer ${token}`}});