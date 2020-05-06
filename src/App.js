import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import PokemnonAll from './components/PokemonAll';

function App() {
  const [allPokemon, setAllPokemon] = useState()

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=30")
      .then(res => {
        setAllPokemon(res.data.results)
      })
      .catch(err => {console.log(err)})
  }, [])

  return (
    <div className="App">
      <Header />
      <Searchbar />
      <PokemnonAll pokemon={allPokemon}/>
    </div>
  );
}

export default App;
