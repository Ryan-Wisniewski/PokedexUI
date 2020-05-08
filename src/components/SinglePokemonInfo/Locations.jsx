//contains location
import React from 'react'

const Locations = ({ pokemon }) => {
    // console.log(pokemon)
    return(
        <>
        {pokemon && pokemon.length > 0 ?  pokemon.map((each) => <p>{each}</p>) : <p>NO KNOWN LOCATION EXIST</p>}
        </>
    )
}

export default Locations