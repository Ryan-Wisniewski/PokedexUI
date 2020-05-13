import React from 'react'

const Varieties = ({ pokemon }) => {

    const hasVariety = (each) => {
        if(each.is_default === false){
            return true
        }
    }

    return(
    <div className='varieties'>
        {pokemon && pokemon.varieties.filter(hasVariety).length > 0 ? pokemon.varieties.filter(hasVariety).map(each => <p>{each.pokemon.name}</p>) : <p>Default Variety</p>}
    </div>
    )
}

export default Varieties