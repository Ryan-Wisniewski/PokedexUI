//contains moves and abilities
import React from 'react'

const Moves = ({ pokemon }) => {
    // console.log(pokemon)
    let moveList = []

    while(pokemon){
        let r = Math.floor(Math.random() * pokemon.moves.length)
        
            if(moveList.length == 4){
                break
            } else if (pokemon.moves[r].move.name in moveList){
                //pass
            }
            moveList.push(pokemon.moves[r].move.name)
    }
    
    return(
        <>
            {/* {console.log(moveList)} */}
            <div>
                {pokemon && pokemon.abilities.map((each) => <p>{each.ability.name}</p>)}
            </div>
            {/* create link to page with all moves */}
            <div>
                {moveList.length == 4 && moveList.map((each) => <p>{each}</p>)}
            </div>
        </>
    )
}

export default Moves