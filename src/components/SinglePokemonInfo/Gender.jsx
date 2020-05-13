import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Gender = ({ pokemon }) => {
    const [isMale, setIsMale] = useState()
    const [isFemale, setIsFemale] = useState()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/gender/2`)
            .then(res => {setIsMale(res.data.pokemon_species_details)})
            .catch(err => console.log(err))
        axios.get(`https://pokeapi.co/api/v2/gender/1`)
            .then(res => setIsFemale(res.data.pokemon_species_details))
            .catch(err => console.log(err))
    }, [])

    const checkGender = (check) => {
        if (check.pokemon_species.name === pokemon.species.name){
            return true
        }
    }

    return(
    <div className='gender'>
        {isMale && pokemon && isMale.filter(checkGender).length > 0 && <p>Male</p>}
        {isFemale && pokemon && isFemale.filter(checkGender).length > 0 && <p>Female</p>}
        {isFemale && pokemon && isMale.filter(checkGender).length === 0 && isFemale.filter(checkGender).length === 0 && <p>Genderless</p>}
    </div>
    )
}

export default Gender