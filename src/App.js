import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios'
import './App.scss';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import PokemnonAll from './components/PokemonAll';
import PokemonSingle from './components/PokemonSingle';

function App() {
  const [allPokemon, setAllPokemon] = useState()
  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151")
      .then(res => {
        setAllPokemon(res.data.results)
      })
      .catch(err => {console.log(err)})
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <Route path='/' component={() => <Searchbar pokemon={allPokemon}/>} />
        <Route exact path='/' component={() => <PokemnonAll pokemon={allPokemon}/>} />
        <Route path='/:id' component={PokemonSingle}/>
      </div>
    </Router>
  );
}

export default App;
