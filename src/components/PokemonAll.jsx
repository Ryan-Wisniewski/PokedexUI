import React from 'react'
import { Link } from 'react-router-dom'
import DATA from '../pokeImg.json'


const PokemnonAll = (props) => {
    const allPokemonArr = props.pokemon
    const pokemon = allPokemonArr && allPokemonArr.map((value, index) => {
        const pokemonImg = DATA[index]
        return(
            <Link to={`/${pokemonImg.id}`} key={index}>
                <div >
                    <img src={pokemonImg.front} alt={value.name}/>
                    <p>{value.name}</p>
                </div>
            </Link>
        )}
    )

    return(
        <>
            {pokemon}
        </>
    )
}

export default PokemnonAll