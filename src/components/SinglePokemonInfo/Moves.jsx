//contains moves and abilities
import React from 'react'

const Moves = ({ pokemon }) => {
    // console.log(pokemon)
    let moveList = []

    while(pokemon){
        let r = Math.floor(Math.random() * pokemon.moves.length)
        
            if(moveList.length === 4){
                break
            } else if (moveList.includes(pokemon.moves[r].move.name)){
                console.log('change fn random to avoid this logs occurrence')
                //pass
            } else {
                moveList.push(pokemon.moves[r].move.name)
            }
    }
    
    return(
        <div className='moves'>
            {/* {console.log(moveList)} */}
            <div className='abilityList'>
                <h2>Abilites:</h2>
                {pokemon && pokemon.abilities.map((each) => <p>{each.ability.name}</p>)}
            </div>
            {/* create link to page with all moves */}
            <div className='moveList'>
                <h2>Moves:</h2>
                {moveList.length === 4 && moveList.map((each) => <p>{each}</p>)}
            </div>
        </div>
    )
}

export default Moves