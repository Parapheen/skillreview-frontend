import { AxiosResponse } from 'axios';
import { ISteamResponse } from '../interfaces/auth';
import { IUser } from '../interfaces/user';
import apiClient from './base';

const END_POINT = '/auth/steam';

export const completeAuth = async (q: ISteamResponse): Promise<AxiosResponse<IUser>> => apiClient
  .get(`${END_POINT}/callback?openid.assoc_handle=${q.assocHandle}&openid.ns=${q.ns}&openid.mode=${q.mode}
&openid.op_endpoint=${q.opEndpoint}&openid.claimed_id=${q.claimedId}&openid.identity=${q.identity}&openid.return_to=${q.returnTo}
&openid.response_nonce=${q.responseNonce}&openid.signed=${q.signed}&openid.sig=${q.sig}`);