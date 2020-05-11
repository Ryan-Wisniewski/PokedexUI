//contains location
import React from 'react'

const Locations = ({ pokemon }) => {
    // console.log(pokemon)
    return(
        <div className='locations'>
            <h2>Locations:</h2>
            <div className='location' >
            {pokemon && pokemon.length > 0 ?  pokemon.map((each) => <p>{each}</p>) : <p>NO KNOWN LOCATION EXIST</p>}
            </div>
        </div>
    )
}

export default Locations