// contains evolution
import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { render } from '@testing-library/react'

const Evolution = ({ canEvolve, evolution, pokemon }) => {
    
    let history = useHistory()
    let [ evolvesTo, setEvolvesTo ] = useState()
    let [ evolvesFrom, setEvolvesFrom] = useState()
    let [ evolvesMultiple, setEvolvesMultiple] = useState([])
    // let evolvesArr = []
    let evolveToUrl = ''
    let evolveFromUrl = ''

    //plan CHECK for name in first, if name does not match move to the next evolves_to
    const evolutionCheck = () => {
    if (canEvolve === true) {
        if (evolution &&  pokemon){
            //For Evolution
            if(pokemon.name === evolution.species.name){
                //base pokemon
                if (evolution.evolves_to.length > 1) {
                    //Evolution from first has 2 different forms (probably gendered) maybe others like eevee
                    // console.log(evolution)
                    evolveToUrl = []
                        evolution.evolves_to.map(each => {axios.get(each.species.url)
                            .then(res => {
                                renderMultiple(res.data.id)
                            })
                            .catch(err => console.log(err))
                        })
                    // console.log(evolveToUrl)
                } else if(evolution.evolves_to[0].evolves_to.length === 0){
                    //First of two EVOLUTION
                    evolveToUrl = evolution.evolves_to[0].species.url
                } else {
                    //First of three EVOLUTION'
                    evolveToUrl = evolution.evolves_to[0].species.url
                }

            } else if (evolution.evolves_to.length > 1) {
                    //Evolution from first has 2 different forms (probably gendered) maybe others like eevee
                    // console.log('hi', evolution)
                    evolveFromUrl = evolution.species.url

            } else if (pokemon.name === evolution.evolves_to[0].species.name) {
                //first evolution
                if (evolution.evolves_to[0].evolves_to.length === 0){
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
                if(evolution.evolves_to.length > 1 && pokemon.name === evolution.species.name){
                    
                    // console.log(toURL)
                    // evolvesMultiple = []
                    // axios.all(toURL).then(axios.spread((...res) => {
                    //     for (let x = 0; x < res.length; x++){
                    //     let obj = {name: res[x].data.name, id: res[x].data.id}
                    //     evolvesMultiple.push(obj)
                    // }
                    //     // setEvolvesMultiple(true)
                    //     // console.log(evolvesMultiple)
                    // }))
                    // .catch(err => console.log(err))

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
            if (evolveToUrl.length == evolution.evolves_to.length){
                console.log('almost there!', evolveToUrl)
                // evolvesMultiple = evolveToUrl
                console.log(evolveToUrl)
                return forceUpdateMultiple(evolveToUrl)
            }
        })
        .catch((err) => console.log(err));
        
    }

    useEffect(() => {
        evolutionCheck()
    })

    const forceUpdateMultiple = async (e) => {
        console.log(e)
        if(evolution){
            console.log(evolvesMultiple.length)
        if (evolvesMultiple.length == evolution.evolves_to.length){
            console.log('pass')
        } else {
            setEvolvesMultiple(e)
        }}
    }

    // const forceUpdateFrom = () => {
    //     history.push(`/${evolvesFrom}`)
    //     window.location.reload()
    // }

    const forceUpdate = (e) => {
        console.log(e)
        history.push(`/${e}`)
        window.location.reload()
    }

    return(
        <div className='evolution'>
            {/* {console.log(evolvesTo)} */}
            {canEvolve !== undefined ? canEvolve === true ? 
                <div className='buttons'>
                    {evolvesFrom && <Link className='button' to={null} onClick={() => forceUpdate(evolvesFrom)}>Previous Evolution</Link>}
                    {evolvesTo && <Link className='button' to={null} onClick={() => forceUpdate(evolvesTo)}>Next Evolution</Link>}
                    {evolveToUrl && console.log(evolveToUrl)}
                    {!evolvesMultiple ? null : evolvesMultiple.map(each => <Link className='button' onClick={() => forceUpdate(each)}>Next Evolution: {each}</Link>)}
                </div>
                : <p className='noEvolution'>No evolution chain</p> 
                : null}
        </div>
    )
}

export default Evolution