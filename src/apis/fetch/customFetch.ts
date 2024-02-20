import ApiError from '../../utils/ApiError';

interface FetchProps {
  contentType?: string;
  abort?: boolean;
}

interface Payload {
  url: string;
  contentType: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  abort: boolean;
}

const BASE_URL = '';
let abortController: null | AbortController = null;

const initPayload = async ({ url, method, body, contentType, abort }: Payload) => {
  const apiUrl = `${BASE_URL}${url}`;
  const userToken = 'USER_TOKEN';
  const headers: HeadersInit = {
    'content-type': contentType,
  };

  if (userToken) headers.authorization = userToken;
  if (abortController instanceof AbortController) {
    abortController?.abort();
    abortController = null;
  }
  if (abortController === null && abort) {
    abortController = new AbortController();
  }

  const response = await fetch(apiUrl, {
    method,
    headers,
    body: JSON.stringify(body),
    signal: abortController?.signal,
  });

  if (response.status >= 500) {
    throw new ApiError({
      name: `Server ${method} Error`,
      status: response.status,
    });
  }
  if (response.status >= 400) {
    throw new ApiError({
      name: `Client ${method} Error`,
      status: response.status,
    });
  }

  return response;
};

const customFetch = {
  async get<T = unknown>(
    url: string = '',
    { contentType = 'application/json', abort = false }: FetchProps = {}
  ) {
    const response = await initPayload({
      url,
      method: 'GET',
      contentType,
      abort,
    });

    const promiseResponse: Promise<T> = response.json();

    return promiseResponse;
  },

  async post<T = unknown>(
    url: string = '',
    body: any = {},
    { contentType = 'application/json', abort = false }: FetchProps = {}
  ) {
    const response = await initPayload({
      url,
      method: 'POST',
      body,
      contentType,
      abort,
    });

    const promiseResponse: Promise<T> = response.json();

    return promiseResponse;
  },

  async put<T = unknown>(
    url: string = '',
    body: any = {},
    { contentType = 'application/json', abort = false }: FetchProps = {}
  ) {
    const response = await initPayload({
      url,
      method: 'PUT',
      body,
      contentType,
      abort,
    });

    const promiseResponse: Promise<T> = response.json();

    return promiseResponse;
  },

  async patch<T = unknown>(
    url: string = '',
    body: any = {},
    { contentType = 'application/json', abort = false }: FetchProps = {}
  ) {
    const response = await initPayload({
      url,
      method: 'PATCH',
      body,
      contentType,
      abort,
    });

    const promiseResponse: Promise<T> = response.json();

    return promiseResponse;
  },

  async delete<T = unknown>(
    url: string = '',
    { contentType = 'application/json', abort = false }: FetchProps = {}
  ) {
    const response = await initPayload({
      url,
      method: 'DELETE',
      contentType,
      abort,
    });

    const promiseResponse: Promise<T> = response.json();

    return promiseResponse;
  },
};

export default customFetch;
