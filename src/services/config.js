import { isLocal } from '../utils/destination';

let apiUrl = null;

if (isLocal) {
  apiUrl = 'http://0.0.0.0:8000';
} else {
  // Production
  apiUrl = 'https://api.our.link';
}

const config = {
  API_URL: apiUrl,
};

export default config;
