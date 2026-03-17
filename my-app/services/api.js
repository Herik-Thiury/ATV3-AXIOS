import axios from 'axios';

export const api = axios.create({
  // Use o seu IP que confirmamos anteriormente
  baseURL: 'http://192.168.56.1:3000', 
});