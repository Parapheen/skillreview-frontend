import { AxiosResponse } from 'axios';
import { IReviewRequest, IReviewRequestUpdate } from '../interfaces/reviewRequest';
import apiClient from './base';

const END_POINT = '/requests';

export const createReviewRequest = async (request: IReviewRequest, token: string | null): Promise<AxiosResponse<IReviewRequest>> => apiClient
  .post(END_POINT, request, {headers: {'Authorization': `Bearer ${token}`}});

export const getReviewRequest = async (id: string): Promise<AxiosResponse<IReviewRequest>> => apiClient
  .get(`${END_POINT}/${id}`)

export const getReviewRequests = async (page: number, pageSize: number, state: 'open' | 'closed', position?: 'Hard Support' | 'Support' | 'Offlane' | 'Mid' | 'Carry'): Promise<AxiosResponse<Array<IReviewRequest>>> => {
    if (position) { return apiClient.get(`${END_POINT}?page=${page}&page_size=${pageSize}&state=${state}&position=${position}`) }
    return apiClient.get(`${END_POINT}?page=${page}&page_size=${pageSize}&state=${state}`)
}

export const updateReviewRequest = async (id: string, requestUpdate: IReviewRequestUpdate, token: string | null): Promise<AxiosResponse<IReviewRequest>> => apiClient
  .put(`${END_POINT}/${id}`, requestUpdate, {headers: {'Authorization': `Bearer ${token}`}})

export const deleteReviewRequest = async (id: string, token: string | null): Promise<AxiosResponse<number>> => apiClient
  .delete(`${END_POINT}/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
