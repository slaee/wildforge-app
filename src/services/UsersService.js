import axios from 'axios';
import config from './config';

const BASE_URL = `${config.API_URL}/users`;

const UsersService = {
  signup: (user) => axios.post(`${BASE_URL}`, user),
  login: (user) => axios.post(`${BASE_URL}/login`, user),
};

export default UsersService;
