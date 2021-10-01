import axios from 'axios';

const API_KEY = '6d7318eca80773ba9e7a16973e3c0318';
const BASE_URL = 'https://api.themoviedb.org/3';
const language = 'en-US';

function getMovies(url) {
  return axios.get(url).then(response => {
    return response.data;
  });
}

export function fetchMovies() {
  return getMovies(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
}

export function fetchMoviesByQuery(query) {
  return getMovies(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=${language}&page=1&query=${query}`,
  );
}

export function fetchMovieById(id) {
  return getMovies(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${language}`,
  );
}

export function fetchActorsById(id) {
  return getMovies(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=${language}`,
  );
}

export function fetchReviewsById(id) {
  return getMovies(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=${language}&page=1`,
  );
}
