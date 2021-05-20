import axios from 'axios';

const url = "http://localhost:8000"

export const register = (userDetails) => {
  return axios.post(`${url}/register`, { userDetails })
    .then((response) => response);
}

export const login = (userDetails) => {
  return axios.post(`${url}/signin`, { userDetails })
    .then((response) => response);
}
