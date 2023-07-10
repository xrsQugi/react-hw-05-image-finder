const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34707727-e20630cf7e49276d83ab15980';

//!Not my API
// 34707727-e20630cf7e49276d83ab15980

//!My API
// 30848266-1a3122c07315d6e3a00656f38
const PER_PAGE = 12;

export default async function GetListImg(query, page) {
  const url = `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`;

  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  return await Promise.reject(new Error('Oops! It is a fail'));
}