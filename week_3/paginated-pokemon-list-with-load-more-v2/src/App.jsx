import { useState, useEffect } from 'react'
import './App.css'
import Pokemon from './components/Pokemon';

function App() {

  const ITEMS_PER_PAGE = 5;

  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const baseUrl = `${import.meta.env.VITE_POKEMON_BASE_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`;

  useEffect(() => {
    let isMounted = true;
    const fetchPokemons = async () => {
      
      const response = await fetch(baseUrl);
      const data = await response.json();

      // const urls = data?.results.map((p) => p.url);
      console.log("data: ", data)
      const count = data?.count || 0;
      if(isMounted) {
        setTotalCount(count);
        setPokemon((prev) => [...prev, ...(data?.results || [])]);
      }
      console.log("Is Mounted: ", isMounted);
    }
    fetchPokemons();
    return () => {
      isMounted = false;
    }
  }, [offset])

  const clickHandler = () => {
    setOffset((prev) => prev + ITEMS_PER_PAGE);
  }

  const hasMore = (pokemon.length === totalCount) || (pokemon.length < totalCount);
  // console.log("Has more: ", hasMore);

  const isLastPageReached = totalCount > 0 && pokemon.length >= totalCount;

  const shouldShowButton = hasMore && !isLastPageReached;
  

  return (
    <div className='p-5'>
      <ul className='listitem'>
        {pokemon.length > 0 && (
          
          pokemon.map((poke, index) => {
            return <Pokemon name={poke.name} url={poke.url} key={index} />
          })
        )}
      </ul>
      <p>Displaying {pokemon.length} of {totalCount} results</p>
      <p>Has More: {hasMore ? "Hello" : "World"}</p>
      {shouldShowButton && (
        <button onClick={() => clickHandler()} className='mt-5 px-3 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg text-white'>Load more</button>
      )}
    </div>
  )
}

export default App
