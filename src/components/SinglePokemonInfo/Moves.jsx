//contains moves and abilities
import React from 'react'

const Moves = ({ pokemon }) => {
    let moveList = []

    if(pokemon && pokemon.moves.length > 4){
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
    } else if (pokemon && pokemon.moves.length <= 4){
        for (let x = 0; x < pokemon.moves.length; x++){
            moveList.push(pokemon.moves[x].move.name)
        }
    }
    
    return(
        <div className='moves'>
            <div className='abilityList'>
                <h2>Abilites:</h2>
                {pokemon && pokemon.abilities.map((each) => <p key={each.ability.name}>{each.ability.name}</p>)}
            </div>
            {/* create link to page with all moves */}
            <div className='moveList'>
                <h2>Moves:</h2>
                {moveList.length && moveList.map((each) => <p key={each}>{each}</p>)}
            </div>
        </div>
    )
}

export default Moves