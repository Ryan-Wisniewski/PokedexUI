import React from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios';

const SearchHistory = ({ newSearch }) => {
    let history = useHistory();
    let searchArr = sessionStorage.getItem('searchHistory')
    if (newSearch !== undefined){    
        let existing = sessionStorage.getItem('searchHistory')
        existing = existing ? existing.split(',') : [];
        if(existing.includes(newSearch)){
            //pass
        } else {
            existing.push(newSearch)
            sessionStorage.setItem('searchHistory', existing.toString())
        }
    }
    
    const onclick = (data) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${data}`)
            .then(res => {
                history.push(`/${res.data.id}`)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    searchArr = searchArr ? searchArr.split(',') : []
    return(
        <div className='searchHistory'>
            {searchArr && searchArr.length > 0
                ? searchArr.map(each => <button key={each} onClick={() => onclick(each)}>{each}</button>)
                : null}
        </div>
    )
}

export default SearchHistory