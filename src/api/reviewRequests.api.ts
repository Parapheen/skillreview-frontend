import { AxiosResponse } from 'axios';
import { IReviewRequest, IReviewRequestUpdate } from '../interfaces/reviewRequest';
import apiClient from './base';

const END_POINT = '/requests';

export const createReviewRequest = async (request: IReviewRequest, token: string | null): Promise<AxiosResponse<IReviewRequest>> => apiClient
  .post(END_POINT, request, {headers: {'Authorization': `Bearer ${token}`}});

export const getUserReviewRequests = async (token: string | null): Promise<AxiosResponse<Array<IReviewRequest>>> => apiClient
  .get(END_POINT, {headers: {'Authorization': `Bearer ${token}`}})

export const getReviewRequest = async (id: string): Promise<AxiosResponse<IReviewRequest>> => apiClient
  .get(`${END_POINT}/${id}`)

export const getReviewRequests = async (): Promise<AxiosResponse<Array<IReviewRequest>>> => apiClient
  .get(END_POINT)

export const updateReviewRequest = async (id: string, requestUpdate: IReviewRequestUpdate, token: string | null): Promise<AxiosResponse<IReviewRequest>> => apiClient
  .put(`${END_POINT}/${id}`, requestUpdate, {headers: {'Authorization': `Bearer ${token}`}})