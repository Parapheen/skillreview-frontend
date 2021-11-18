import { AxiosResponse } from 'axios';
import { IApplication, IApplicationUpdate } from '../interfaces/application';
import apiClient from './base';

const END_POINT = '/applications';

export const createApplication = async (application: IApplication, token: string | null): Promise<AxiosResponse<IApplication>> => apiClient
  .post(END_POINT, application, {headers: {'Authorization': `Bearer ${token}`}});

export const updateApplication = async (id: string, applicationUpdate: IApplicationUpdate, token: string | null): Promise<AxiosResponse<IApplication>> => apiClient
  .put(`${END_POINT}/${id}`, applicationUpdate, {headers: {'Authorization': `Bearer ${token}`}})
