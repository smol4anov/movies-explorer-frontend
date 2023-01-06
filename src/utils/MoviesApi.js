import { beatfilmUrl } from './constants.js';

export const getBeatfilmMovies = () => {
  return fetch(`${beatfilmUrl}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
};