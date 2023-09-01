/* eslint-disable no-else-return */
import axios from 'axios';
import ToastAlert from '../helper/toast-alert';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const handleError = (error) => {
  if (error.response) {
    console.log('Error status:', error.response.status);
    console.log('Error data:', error.response.data);

    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/';
      ToastAlert.warning('Session expired, please login again');
    } else if (error.response.status === 429) {
      ToastAlert.error(error.response.data);
    }
  } else if (error.request) {
    console.log('No response received');
  } else {
    console.log('Error message:', error.message);
  }
  return error;
};

const handleFormData = async (url, formData) => {
  try {
    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const createHeaders = (useAuthToken = true) => {
  let headers = {
    'Content-Type': 'application/json',
  };

  if (useAuthToken) {
    const token = localStorage.getItem('userToken');
    if (token) {
      headers = {
        ...headers,
        ...api.defaults.headers.common,
        Authorization: token,
      };
    } else {
      delete api.defaults.headers.common.Authorization;
      localStorage.clear();
      throw new Error('No token found');
    }
  }

  return headers;
};

const makeRequest = async ({
  method,
  url,
  data = null,
  useAuthToken = true,
  useAbortController = false,
}) => {
  const source = useAbortController ? axios.CancelToken.source() : null;

  const config = {
    method,
    url,
    data,
    headers: createHeaders(useAuthToken),
    cancelToken: useAbortController ? source.token : undefined,
  };

  try {
    const response = await api(config);
    return response.data;
  } catch (error) {
    return handleError(error);
  } finally {
    if (useAbortController) {
      source.cancel('Request aborted');
    }
  }
};

const postRequest = async (url, data = {}, useAuthToken = true) => {
  return makeRequest({
    method: 'POST',
    url,
    data,
    useAuthToken,
  });
};

const getRequest = async (url, useAuthToken = true) => {
  return makeRequest({
    method: 'GET',
    url,
    useAuthToken,
  });
};

export { getRequest, handleFormData, makeRequest, postRequest };
