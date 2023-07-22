import axios from 'axios';

const api = axios.create({
  baseURL: 'https://example.com/api',
});

const handleError = (error) => {
  if (error.response) {
    // The request was made, but the server responded with a non-2xx status code
    // You can handle specific error codes here
    console.log('Error status:', error.response.status);
    console.log('Error data:', error.response.data);
  } else if (error.request) {
    // The request was made, but no response was received
    console.log('No response received');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error message:', error.message);
  }
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
    const token = localStorage.getItem('authToken');
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
    handleError(error);
    throw error;
  } finally {
    if (useAbortController) {
      source.cancel('Request aborted');
    }
  }
};

export { handleFormData, makeRequest };
