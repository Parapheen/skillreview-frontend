import { AxiosResponse } from 'axios';
import { IMinimalMatch } from '../interfaces/match';
import apiClient from './base';

const END_POINT = '/matches/';

export const getMatch = async (id: string | undefined): Promise<AxiosResponse<IMinimalMatch>> => apiClient
  .get(`${END_POINT}${id}`);