import { API_URL } from './constants';

const requestHandler = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    method: options.method || 'GET',
    headers: { ...defaultHeaders, ...(options.headers || {}) },
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao realizar a requisição');
  }

  return data;
};

export default requestHandler;
