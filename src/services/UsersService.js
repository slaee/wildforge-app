import axios from 'axios';
import config from './config';

const BASE_URL = `${config.API_URL}/users`;

const UsersService = {
  /// POST /users
  /*
    data: {
      "first_name": "string",
      "last_name": "string",
      "email": "user@example.com",
      "password": "string",
      "role": 2
    }
  */
  signup: (user) => axios.post(`${BASE_URL}`, user),

  /// POST /users/login
  /*
    data: {
      "email": "string",
      "password": "string"
    }
  */
  login: (user) => axios.post(`${BASE_URL}/login`, user),
};

export default UsersService;
