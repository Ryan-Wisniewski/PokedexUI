import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DATA from '../pokeImg.json'
import Moves from './SinglePokemonInfo/Moves'
import Location from './SinglePokemonInfo/Locations'
import Evolution from './SinglePokemonInfo/Evolution'
import Varieties from './SinglePokemonInfo/Varieties'
import Gender from './SinglePokemonInfo/Gender'

const PokemonSingle = (props) => {
    const [ singlePokemon, setSinglePokemon ] = useState()
    const [ locationPokemon, setLocationPokemon ] = useState()
    const locationArr = []
    const [ speciesPokemon, setSpeciesPokemon ] = useState()
    const [ canEvolve, setCanEvolve ] = useState()
    const [ evolutionInfo, setEvolutionInfo] = useState()
    
    const { id } = props.match.params
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                setSinglePokemon(res.data)
            })
            .catch(err => {console.log(err)})

        //https://pokeapi.co/api/v2/pokemon/25/encounters <-- for location
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
            .then(res => {
                setLocationPokemon(res.data)
            })
            .catch(err => {console.log(err)})

        // https://pokeapi.co/api/v2/pokemon-species/{id or name}/ <-- for variety && color && habitat which is enounter
        // ## if specicies obj has { has_gender_differences: false } they can be male and female
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            .then(res => {               
                setSpeciesPokemon(res.data)
                let evolutionId = res.data.evolution_chain.url
                axios.get(`${evolutionId}`)
                    .then(res => {
                        if (res.data.chain.evolves_to.length > 0){
                            setCanEvolve(true)
                            setEvolutionInfo(res.data.chain)
                        } else {
                            setCanEvolve(false)
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => {console.log(err)})
        
        // https://pokeapi.co/api/v2/gender/{id or name}/ <-- for gender
    }, [])

    return (
        <div className='pokemonSingle'>
            {/* {console.log(singlePokemon, speciesPokemon, locationPokemon)} */}
        {/* General */}
        <Link className='backButton' to='/'>Back</Link>
        <div className='general'>
            {id <= 807 ? <img src={DATA[id - 1].front} alt=""/> : null}
            <h2>{singlePokemon && singlePokemon.name}</h2>
            {singlePokemon && singlePokemon.types.map((each) => <h3>Type: {each.type.name}</h3>)}
            <h3>Color: {speciesPokemon && speciesPokemon.color.name}</h3>
        </div>

        {/* Get Locations */}

        {locationPokemon && locationPokemon.map((each) => {
            // each.version_details.map(each2 => {
                // if (each2.version.name === 'red'){
                // }
                locationArr.push(each.location_area.name)
                    // return locationArr 
                // })
                // return locationArr   
        })}

        <div className='details'>
            <Location pokemon={locationArr} />
            <Moves pokemon={singlePokemon}/>
        </div>

        <div className='details2'>
            <Gender pokemon={singlePokemon}/>
            <Varieties pokemon={speciesPokemon}/>
        </div>
        <Evolution pokemon={singlePokemon} canEvolve={canEvolve} evolution={evolutionInfo}/>
        </div>
    )
}

export default PokemonSingle