const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '30848266-1a3122c07315d6e3a00656f38';
const IMG_TYPE = 'photo';
const IMG_ORIENT = 'horizontal';
const PER_PAGE = 12;

export default async function GetListImg(query, page) {
  const url = `${BASE_URL}?image_type=${IMG_TYPE}&orientation=${IMG_ORIENT}&q=${query}&page=${page}&per_page=${PER_PAGE}&key=${API_KEY}`;

  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error('Oops! It is a fail'));
}
