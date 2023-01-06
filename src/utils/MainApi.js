import { BASE_URL } from './constants.js';

const request = async ({
  url,
  method = 'POST',
  data
}) => {
  let res = await fetch(`${BASE_URL}${url}`, {
    method,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    ...!!data && { body: JSON.stringify(data) }
  });

  if (res.ok) return res.json();

  let errorRes = await res.json();
  if (errorRes?.message) return Promise.reject(errorRes.message);

  return Promise.reject(res.status);
};

export const register = (data) => {
  return request({
    url: '/signup',
    data
  });
};

export const login = (data) => {
  return request({
    url: '/signin',
    data
  });
};

export const checkAuthorization = () => {
  return request({
    url: '/users/me',
    method: 'GET'
  });
};

export const logout = () => {
  return request({
    url: '/signout',
    method: 'GET'
  });
};

export const editProfile = (data) => {
  return request({
    url: '/users/me',
    method: 'PATCH',
    data
  });
};

export const getMovies = () => {
  return request({
    url: '/movies',
    method: 'GET'
  });
};

export const createMovie = (data) => {
  return request({
    url: '/movies',
    data
  });
};

export const deleteMovie = (movieId) => {
  return request({
    url: `/movies/${movieId}`,
    method: 'DELETE'
  });
};

