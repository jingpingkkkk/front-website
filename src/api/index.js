import axios from 'axios';
import ToastAlert from '../helper/toast-alert';
import {
  decryptResponse,
  encryptRequest,
  generateEncHeaders,
} from './encryption';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
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
    let errorMessage = decryptedData?.message;

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
    const source = axios.CancelToken.source();
    const encHeaders = await generateEncHeaders();
    const config = {
      method: 'post',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...api.defaults.headers.common,
        ...encHeaders,
      },
      cancelToken: source.token || undefined,
    };

    try {
      const response = await api(config);
      const decrypted = await decryptResponse(response.data);
      return decrypted;
    } catch (error) {
      return await handleError(error);
    }
  } catch (error) {
    await handleError(error);
    throw error;
  }
};

const createHeaders = async () => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const encHeaders = await generateEncHeaders();

  return { ...headers, ...encHeaders };
};

const requestsInProgress = new Map();

const makeRequest = async ({
  method,
  url,
  data = null,
  useAbortController = true,
}) => {
  const source = axios.CancelToken.source();
  const requestKey = `${method}:${url}`;

  if (useAbortController && requestsInProgress.has(requestKey)) {
    requestsInProgress.get(requestKey).cancel('Duplicate request');
  }
  requestsInProgress.set(requestKey, source);

  const config = {
    method,
    url,
    data: await encryptRequest(data),
    headers: await createHeaders(),
    cancelToken: source.token || undefined,
  };

  try {
    const response = await api(config);
    const decrypted = await decryptResponse(response.data);
    return decrypted;
  } catch (error) {
    return await handleError(error);
  } finally {
    requestsInProgress.delete(requestKey);
  }
};

const postRequest = async (url, data = {}, useAbortController = true) => {
  return makeRequest({
    method: 'POST',
    url,
    data,
    useAbortController,
  });
};

const getRequest = async (url, useAbortController = true) => {
  return makeRequest({
    method: 'GET',
    url,
    useAbortController,
  });
};

export { getRequest, handleFormData, makeRequest, postRequest };
