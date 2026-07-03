import { useState, useEffect } from 'react'
import './App.css'

import SearchForm from './components/SearchForm';
import MovieList from './components/MovieList';

function App() {

  const [movies, setMovies] =useState([]);
  const [movieKeyword, setMovieKeyword] = useState('');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_MOVIES_API_ACCESS_TOKEN}`
    }
  }
  
  useEffect(() => {
    const fetchPopularMovieList = async () => {
      const initialMovieUrl = await `${import.meta.env.VITE_MOVIES_POPULAR_URL}?language=en-US&page=1`;

      const response = await fetch(initialMovieUrl, options);
      // console.log("REsponse: ", response)
      const data = await response.json();
      const results = data.results;
      // console.log("results: ", results)

      setMovies(results || []);

    }

    fetchPopularMovieList();
  }, []);

  const handleSubmit = async  (e) => {
    console.log("Run")
    e.preventDefault();
    const searchMovieUrl = await `${import.meta.env.VITE_MOVIES_SEARCH_URL}?query=${movieKeyword}&include_adult=false&language=en-US&page=1`;

    console.log("Fetching");

    const response = await fetch(searchMovieUrl, options);
    const data = await response.json();
    const results = data.results;

    console.log("response: ", response);
    console.log("Data: ", data);
    console.log("results: ", results);

    setMovies(results);
  }

  // console.log("Movies: ", movies);

  return (
    <div className='text-left mt-3'>
      <div className='font-bold text-2xl text-white my-5'>Movie Search</div>
      <SearchForm keyword={movieKeyword} setKeyword={setMovieKeyword} handleSubmit={handleSubmit} />
      <MovieList movies={movies} />
    </div>
  )
}

export default App
