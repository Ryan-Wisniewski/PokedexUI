import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DATA from '../pokeImg.json'
import Moves from './SinglePokemonInfo/Moves'
import Location from './SinglePokemonInfo/Locations'
import Evolution from './SinglePokemonInfo/Evolution'

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
        // ## gives evolution chain
            //https://pokeapi.co/api/v2/evolution-chain/{id}/ <-- for evolution

        
        // https://pokeapi.co/api/v2/gender/{id or name}/ <-- for gender
    }, [])

    return (
        <div className='pokemonSingle'>
        {/* General */}
        <Link className='backButton' to='/'>Back</Link>
        <div className='general'>
            {id <= 151 && <img src={DATA[id - 1].front} alt=""/>}
            <h2>{singlePokemon && singlePokemon.name}</h2>
            {singlePokemon && singlePokemon.types.map((each) => <h3>Type: {each.type.name}</h3>)}
            <h3>Color: {speciesPokemon && speciesPokemon.color.name}</h3>
        </div>
            {/* Genders */}
            {/* Genders were released in the Johto region for breeding. For some reason there 
            arent genders they all have both genders except the two nidoran evo chains. */}
        {/* {speciesPokemon && speciesPokemon.has_gender_differences == false && <p>Male and Female</p>} */}

            {/* Varieties */}
            {/* all varieties are default for kanto pokemon */}
        {/* {speciesPokemon && speciesPokemon.map((each => {console.log(each)}))} */}

        {/* Get Locations */}

        {locationPokemon && locationPokemon.map((each) => {
            each.version_details.map(each2 => {
                if (each2.version.name === 'red'){
                    locationArr.push(each.location_area.name)
                    }
                    // return locationArr //was yellow erroring about no return but adding cause side-effect
                })
                // return locationArr   
            })}

        <div className='details'>
            <Location pokemon={locationArr} />
            <Moves pokemon={singlePokemon}/>
        </div>
        {/* Evolution's */}
        
        <Evolution pokemon={singlePokemon} canEvolve={canEvolve} evolution={evolutionInfo}/>
        </div>
    )
}

export default PokemonSingle