import { AxiosResponse } from 'axios';
import { IMinimalMatch } from '../interfaces/match';
import apiClient from './base';

const END_POINT = '/matches/';

export const getMatch = async (id: string | undefined, token: string | null): Promise<AxiosResponse<IMinimalMatch>> => apiClient
  .get(`${END_POINT}${id}`, {headers: {'Authorization': `Bearer ${token}`}});