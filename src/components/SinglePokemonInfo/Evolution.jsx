// contains evolution
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

const Evolution = ({ canEvolve, evolution, pokemon }) => {
    let history = useHistory()
    let [ evolvesTo, setEvolvesTo ] = useState()
    let [ evolvesFrom, setEvolvesFrom] = useState()
    let [ evolvesMultiple, setEvolvesMultiple] = useState([])
    let evolveToUrl = ''
    let evolveFromUrl = ''

    const evolutionCheck = () => {
    if (canEvolve === true) {
        if (evolution &&  pokemon){
            if(pokemon.name === evolution.species.name){
                //base pokemon
                if (evolution.evolves_to.length > 1) {
                    //Evolution from first has 2 different forms (probably gendered) maybe others like eevee
                    evolveToUrl = []
                        evolution.evolves_to.map(each => {axios.get(each.species.url)
                            .then(res => {
                                renderMultiple({id: res.data.id, name: res.data.name})
                            })
                            .catch(err => console.log(err))
                        })
                } else if(evolution.evolves_to[0].evolves_to.length === 0){
                    //First of two EVOLUTION
                    evolveToUrl = evolution.evolves_to[0].species.url
                } else {
                    //First of three EVOLUTION'
                    evolveToUrl = evolution.evolves_to[0].species.url
                }

            } else if (evolution.evolves_to.length > 1) {
                    //Evolution from first has 2 different forms (probably gendered) maybe others like eevee
                    evolveFromUrl = evolution.species.url

            } else if (pokemon.name === evolution.evolves_to[0].species.name) {
                //first evolution
                if (evolution.evolves_to[0].evolves_to.length > 1) {
                    //Second EVOLUTION has different forms
                        evolveFromUrl = evolution.species.url
                        evolveToUrl = []
                        evolution.evolves_to[0].evolves_to.map(each => {axios.get(each.species.url)
                            .then(res => {
                                renderMultiple({id: res.data.id, name: res.data.name})
                            })
                            .catch(err => console.log(err))
                        })
                } else if (evolution.evolves_to[0].evolves_to.length === 0){
                    //Final EVOLUTION
                    evolveFromUrl = evolution.species.url
                } else {
                    //Second of three EVOLUTION
                    evolveFromUrl = evolution.species.url
                    evolveToUrl = evolution.evolves_to[0].evolves_to[0].species.url
                }
            } else if (pokemon.name === evolution.evolves_to[0].evolves_to[0].species.name){
                //'Third Final Evolution'
                evolveFromUrl = evolution.evolves_to[0].species.url
            }
            
            let toURL = evolveToUrl
            let fromURL = evolveFromUrl
            if(toURL !== ''){
                if(evolution.evolves_to.length > 1 || evolution.evolves_to[0].evolves_to.length > 1){
                    //pass
                } else {
                axios.get(toURL)
                    .then(res => {
                        setEvolvesTo(res.data.id)
                    })
                    .catch(err => console.log(err))
                }
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
}

    const renderMultiple = (id) =>{
        return new Promise((resolve, reject) => {
                if(id){
                    resolve()
                } else {
                    reject()
                }
        })
        .then(() => {
            evolveToUrl.push(id)
            if (evolveToUrl.length === evolution.evolves_to.length && evolution.evolves_to.length > 1){
                return forceUpdateMultiple(evolveToUrl)
            } else if (evolveToUrl.length === evolution.evolves_to[0].evolves_to.length && evolution.evolves_to[0].evolves_to.length > 1){
                return forceUpdateMultiple(evolveToUrl)
            }
        })
        .catch((err) => console.log(err));
        
    }

    useEffect(() => {
        evolutionCheck()
    })

    const forceUpdateMultiple = (e) => {
        if(evolution){
            if(evolution.evolves_to.length > 1 && evolvesMultiple.length === evolution.evolves_to.length){
                //pass
            } else if (evolution.evolves_to[0].evolves_to.length > 1 &&
                evolvesMultiple.length === evolution.evolves_to[0].evolves_to.length){
                //pass
            } else {
                setEvolvesMultiple(e)
            }}
    }


    const forceUpdate = (e) => {
        history.push(`/${e}`)
        window.location.reload()
    }

    return(
        <div className='evolution'>
            {canEvolve !== undefined ? canEvolve === true ? 
                <div className='buttons'>
                    {evolvesFrom && <Link className='button' to={null} onClick={() => forceUpdate(evolvesFrom)}>Previous Evolution</Link>}
                    {evolvesTo && <Link className='button' to={null} onClick={() => forceUpdate(evolvesTo)}>Next Evolution</Link>}
                    {evolvesMultiple && evolvesMultiple.length > 0 ? 
                    <div className='multipleButton'>
                        {evolvesMultiple.map(each => <Link className='button' to={null} key={each.id} onClick={() => forceUpdate(each.id)}>Next Evolution: {each.name}</Link>)}
                    </div>
                         : null}
                </div>
                : <p className='noEvolution'>No evolution chain</p> 
                : null}
        </div>
    )
}

export default Evolution