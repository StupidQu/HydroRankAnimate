// alova request

import adapterFetch from 'alova/fetch';
import { createAlova } from 'alova';
import reactHook from 'alova/react';

const request = createAlova({
  requestAdapter: adapterFetch(),
  baseURL: '/api',
  beforeRequest(method) {
    method.config.headers['X-Frontend-Version'] = '2.0';
    method.config.headers['Accept'] = 'application/json';
    method.config.credentials = 'include';
  },
  timeout: 5000,
  statesHook: reactHook,
  cacheFor: {
    GET: 0,
  },
  responded: {
    async onSuccess(res) {
      const response = await res.json();
      if (response['UserContext'])
        response['UserContext'] = JSON.parse(response['UserContext']);
      if (response.url?.startsWith('/login'))
        response.error = { message: 'Please login first. ' };
      return response;
    },
  },
});

export default request;
