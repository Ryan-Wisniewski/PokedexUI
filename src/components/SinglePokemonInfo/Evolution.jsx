// contains evolution
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const Evolution = ({ canEvolve, evolution, pokemon }) => {
    let history = useHistory()
    let [ evolvesTo, setEvolvesTo ] = useState()
    let [ evolvesFrom, setEvolvesFrom] = useState()
    let evolveToUrl = ''
    let evolveFromUrl = ''

    //plan CHECK for name in first, if name does not match move to the next evolves_to
    if (canEvolve === true) {
        if (evolution &&  pokemon){
            // console.log(evolution, pokemon)
            //For Evolution
            if(pokemon.name === evolution.species.name){
                //base pokemon
                // console.log(evolution.evolves_to[0].evolves_to.length)
                if(evolution.evolves_to[0].evolves_to.length === 0){
                    //2 evolution
                    console.log('First of two EVOLUTION')
                    evolveToUrl = evolution.evolves_to[0].species.url

                }   else {
                    console.log('First of three EVOLUTION')
                    evolveToUrl = evolution.evolves_to[0].species.url
                }
            } else if (pokemon.name === evolution.evolves_to[0].species.name) {
                //first evolution
                if(evolution.evolves_to[0].evolves_to.length === 0){
                    //2 evolution
                    console.log('Final EVOLUTION')
                    evolveFromUrl = evolution.species.url
                }   else {
                    console.log('Second of three EVOLUTION')
                    evolveFromUrl = evolution.species.url
                    evolveToUrl = evolution.evolves_to[0].evolves_to[0].species.url
                }
            } 
            else if (pokemon.name === evolution.evolves_to[0].evolves_to[0].species.name){
                // second evolution
                console.log('Final')
                evolveFromUrl = evolution.evolves_to[0].species.url
            }
            
            let toURL = evolveToUrl
            let fromURL = evolveFromUrl
            if(toURL !== ''){
                axios.get(toURL)
                    .then(res => {
                        setEvolvesTo(res.data.id)
                    })
                    .catch(err => console.log(err))
            }
            if (fromURL !== ''){
                axios.get(fromURL)
                    .then(res => {
                        setEvolvesFrom(res.data.id)
                    })
                    .catch(err => console.log(err))
            }
        }
    }

    const forceUpdateFrom = () => {
        history.push(`/${evolvesFrom}`)
        window.location.reload()
    }

    const forceUpdateTo = () => {
        history.push(`/${evolvesTo}`)
        window.location.reload()
    }

    // console.log(canEvolve,evolution)
    return(
        <div className='evolution'>
            {canEvolve !== undefined ? canEvolve === true ? 
                <div className='buttons'>
                    {evolvesFrom && <Link className='button' to={null} onClick={forceUpdateFrom}>Previous Evolution</Link>}
                    {evolvesTo && <Link className='button' to={null} onClick={forceUpdateTo}>Next Evolution</Link>}
                </div> 
                : <p className='noEvolution'>No evolution chain</p> 
                    : null}
        </div>
    )
}

export default Evolution