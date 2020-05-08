import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'

const Searchbar = () => {
    let history = useHistory();
    // console.log(props, history)
    const [newSearch, setSearch] = useState({
        pokeSearch: ''
    })
    const handleChange = (e) => {
        setSearch({
            ...newSearch,
            [e.target.name]: e.target.value
        })
    }

    const onsubmit = (e) => {
        e.preventDefault()
        const data = newSearch.pokeSearch
        //check if num was typed > 151 && 
        //FUTURE: create dict from their names and check names against the dict.
        //Then dont need this duplicate ajax req
        axios.get(`https://pokeapi.co/api/v2/pokemon/${data}`)
            .then(res => {
                console.log(res)
                history.push(`/${res.data.id}`)
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
                window.alert('Pokemon not found')
            })
    }

    return (
        <form onSubmit={onsubmit}>
            <input 
                type='text'
                name='pokeSearch'
                value={newSearch.pokeSearch}
                onChange={handleChange}
            />
            <button >Search</button>
        </form>
    )
}

export default Searchbar