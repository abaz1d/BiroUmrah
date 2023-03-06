import axios from "axios";

export const request = axios.create({
  baseURL: 'http://153.92.210.7:3000/',
  timeout: 3000,
});