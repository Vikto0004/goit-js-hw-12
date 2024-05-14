import axios from 'axios';

export const returnPromise = (q, page) => {
  return axios.get('https://pixabay.com/api/', {
    params: {
      key: '43795533-00e69c3734dde476e8d836fd2',
      q,
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: '15',
    },
  });
};
