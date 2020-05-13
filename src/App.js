import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios'
import './App.scss';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import PokemonAll from './components/PokemonAll';
import PokemonSingle from './components/PokemonSingle';

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
        <Route path='/' component={Searchbar} />
        <Route exact path='/' component={() => <PokemonAll />} />
        <Route path='/:id' component={PokemonSingle}/>
      </div>
    </Router>
  );
}

export default App;
