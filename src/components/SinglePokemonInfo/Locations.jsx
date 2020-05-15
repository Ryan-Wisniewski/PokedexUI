//contains location
import React from 'react'

const Locations = ({ pokemon }) => {
    return(
        <div className='locations'>
            <h2>Locations:</h2>
            <div className='location' >
            {pokemon && pokemon.length > 0 ?  pokemon.map((each) => <p key={each.location_area.name}>{each.location_area.name}</p>) : <p>NO KNOWN LOCATION</p>}
            </div>
        </div>
    )
}

export default Locations