import axios from 'axios';
import config from './config';

const BASE_URL = `${config.API_URL}/evals`;

const instance = axios.create();

const EvalsService = {
  list: () => instance.get(BASE_URL),
  create: (data) => instance.post(BASE_URL, data),
  retrieve: (id) => instance.get(`${BASE_URL}/${id}`),
  update: (id, data) => instance.put(`${BASE_URL}/${id}`, data),
  delete: (id) => instance.delete(`${BASE_URL}/${id}`),
};

export default EvalsService;
