import React from 'react'
import DATA from '../pokeImg.json'


const PokemnonAll = (props) => {
    const allPokemonArr = props.pokemon
    console.log('HERE',allPokemonArr)
    const pokemon = allPokemonArr && allPokemonArr.map((value, index) => {
        const pokemonImg = DATA[index]
        return(
            <div key={index}>
                <img src={pokemonImg.front} alt=""/>
                <p>{value.name}</p>
            </div>
        )}
    )

    return(
        <>
            {pokemon}
            {/* {allPokemonArr && allPokemonArr.map((value, index) => 
                
                {return(
                    <div key={each.name}>
                        <p>{each.name}</p>
                    </div>)}
            )} */}
            {/* {DATA && DATA.map(each => 
                {return(
                    <div key={each.id}>
                        <img src={each.front} alt="DUNNO YET***"/>
                    </div>)}
            )} */}
        </>
    )
}

export default PokemnonAll