// axios.js
import axios from 'axios';

const instance = axios.create({
  // baseURL: '/api', // 填写你的基础URL
  baseURL: 'https://api.zksats.io/', // 填写你的基础URL
  // https://api.zksats.io/sign
  timeout: 12000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// get 请求函数
export function get(url, params?: any) {
  return instance.get(url, { params }).then((res) => res.data);
}

// post 请求函数
export function post(url, data) {
  return instance.post(url, data);
}

const http = {
  get,
  post,
};

export default http;
