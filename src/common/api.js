/* eslint-disable */
const qs = require('query-string');
const isObject = require('lodash/isObject');

function getEnv() {
  return qs.parse(location.search).env || process.env.NODE_ENV;
}

function APIPrefix() {
  let prefix;
  const env = getEnv();
  switch (env) {
    case 'development':
      // prefix = `//${location.host}`;
      prefix = '//127.0.0.1:3000';
      break;
    default:
      prefix = `//${location.host}:3000`;
      break;
  }
  return prefix;
}

const baseURL = APIPrefix();

const api = require('axios').create({
  baseURL,
  withCredentials: true,
});

api.interceptors.response.use((resp) => {
  if (resp.config.passInterceptor) return resp;
  if (isObject(resp.data) && resp.data.code != null) {
    return resp.data;
  } else {
    this.$notify({
      title: '提示',
      message: '服务端异常，请重新再试！',
      type: 'warning',
    });
  }
}, (e) => {
  this.$notify({
    title: '提示',
    message: '网络异常，请重新再试！',
    type: 'warning',
  });
  throw e;
});

export { api, APIPrefix };
