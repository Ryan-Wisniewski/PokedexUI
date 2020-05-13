import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DATA from '../pokeImg.json'


const PokemnonAll = (props) => {
    let [ allPokemon, setAllPokemon] = useState()
    const [ loadNext, setLoadNext ] = useState(false)
    let [ offset, setOffset ] = useState(50)

    if (!allPokemon){
        axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50")
            .then(res => {
            setAllPokemon(res.data.results)
            })
            .catch(err => {console.log(err)})
    }


    // let pokemon = 
  
    window.onscroll = function(e) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            // you're at the bottom of the page
            setLoadNext(true)
        }
    }

    if (loadNext === true){
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=50`)
        .then(res => {
            for(let x = 0; x < res.data.results.length; x++){
                if (allPokemon.length <= offset + 49){
                    if (allPokemon.length >= 807 ){
                        //pass
                    } else {
                        allPokemon.push(res.data.results[x])
                        setOffset(offset + 50)
                    }
                }
            }
            console.log('NEWNEWNEW', allPokemon)
        })
        .catch(err => {console.log(err)})
        setLoadNext(false)
    }

    return(
        <div className='allPokemon'>
            {allPokemon && allPokemon.map((value, index) => {
                const pokemonImg = DATA[index]
                return(
                    <Link to={`/${pokemonImg.id}`} key={index}>
                        <div>
                            <img src={pokemonImg.front} alt={value.name}/>
                            <p>{value.name}</p>
                        </div>
                    </Link>
                )}
            )}
            {console.log('NEWNEWNEW', loadNext)}
        </div>
    )
}

export default PokemnonAll