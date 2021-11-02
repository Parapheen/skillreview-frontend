import { AxiosResponse } from 'axios';
import { IReview, IReviewUpdate } from '../interfaces/review';
import apiClient from './base';

const END_POINT = '/reviews';

export const createReview = async (review: IReview, token: string | null): Promise<AxiosResponse<IReview>> => apiClient
  .post(END_POINT, review, {headers: {'Authorization': `Bearer ${token}`}});

export const updateReview = async (id: string, reviewUpdate: IReviewUpdate, token: string | null): Promise<AxiosResponse<IReview>> => apiClient
  .put(`${END_POINT}/${id}`, reviewUpdate, {headers: {'Authorization': `Bearer ${token}`}})