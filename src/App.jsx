import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'


const API_BASE_URL = 'https://api.themoviedb.org/3/'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const App = () => {

  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [movie, setMovie] = useState([])
  const [loading, setLoading] = useState(false)
  const [debounce, setDebounce] = useState('')

  useDebounce(() => setDebounce(search)
    , 1000, [search]
  )
  const fetchMovies = async (query) => {

    setLoading(true)
    setError('')
    try {
      const endpoint = query ?
        `${API_BASE_URL}search/movie?query=${encodeURIComponent(query)}` :
        `${API_BASE_URL}discover/movie?sort_by=popularity.desc';

`

      const response = await fetch(endpoint, API_OPTIONS)
      if (!response.ok) {
        throw new Error("Failed to fetch");

      }

      const data = await response.json()
      // console.log(data);



      if (data.Response == 'False') {

        setError(data.error || 'Fetch fail')
        setMovie([])
        return
      }

      setMovie(data.results || [])
      console.log(data.results);



    } catch (error) {
      console.error(`Eror fetching = ${error}`);
      setError('Error Fetching Data from API')

    }
    finally {
      setLoading(false)

    }
  }

  useEffect(() => {
    fetchMovies(debounce)

  }, [debounce])

  return (
    <main>
      <div className='pattern'>

        <div className='wrapper'>
          <header>

            <img src="/hero.png" alt="hero" />

            <h1> <span className='text-gradient'>Find Movies </span><br />Without the Hassle</h1>
            <Search search={search} setSearch={setSearch} />
          </header>
          <section className='all-movies'>
            <h2>All  Movies</h2>

            {loading ? (
              <p className='text-white'>Loading ... ...</p>
            ) : error ? (
              <p className='text-red-500'>{error} </p>
            ) : (
              <ul>
                {movie.map((mov) => (
                  <MovieCard key={mov.id} mov={mov} />
                ))}
              </ul>
            )}

            {error && <p className='text-red-500'>{error}</p>}
          </section>

        </div>
      </div>
    </main>
  )
}

export default App