/* eslint-disable no-new-func */
/* eslint-disable no-else-return */
import axios from 'axios';
import ToastAlert from '../helper/toast-alert';
import { decryptResponse, encryptRequest } from './encryption';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const isJSONString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const handleError = async (error) => {
  if (error.response) {
    const { data, status } = error.response;

    const decryptedData = await decryptResponse(data);
    let errorMessage = decryptedData;

    if (isJSONString(decryptedData)) {
      errorMessage =
        JSON.parse(decryptedData)?.message || 'Something went wrong';
    }

    console.log('Error status:', status);
    console.log('Error message:', errorMessage);

    if (status === 401) {
      localStorage.clear();
      window.location.href = '/';
      ToastAlert.warning('Session expired, please login again');
    } else {
      ToastAlert.error(errorMessage);
    }
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
    await handleError(error);
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
    data: await encryptRequest(data),
    headers: createHeaders(useAuthToken),
    cancelToken: useAbortController ? source.token : undefined,
  };

  try {
    const response = await api(config);
    const decrypted = JSON.parse(await decryptResponse(response.data));
    return decrypted;
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
