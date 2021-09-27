export const getMovies = () => {
  return fetch(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=6d7318eca80773ba9e7a16973e3c0318',
    { method: 'GET' },
  )
    .then(response => response.json())
    .then(response => response)
    .catch(event => event);
};

export const getSearchMovies = searchQuery => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=6d7318eca80773ba9e7a16973e3c0318&query=${searchQuery}`,
    { method: 'GET' },
  )
    .then(response => response.json())
    .then(response => response)
    .catch(event => event);
};
