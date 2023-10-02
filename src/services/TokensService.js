import axios from 'axios';
import config from './config';

const BASE_URL = `${config.API_URL}/tokens`;

const instance = axios.create();

const TokensService = {
  acquire: (body) => instance.post(`${BASE_URL}/acquire`, body),
  verify: (refreshToken) => instance.post(`${BASE_URL}/verify`, refreshToken),
  refresh: (refreshToken) => instance.post(`${BASE_URL}/refresh`, refreshToken),
};

export default TokensService;
