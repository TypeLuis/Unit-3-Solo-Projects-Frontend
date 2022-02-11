import React from 'react'
import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import env from 'react-dotenv'


import zoroLogo from '../logos/PngItem_1819228.png'
import chopperLogo from '../logos/PngItem_5153422.png'
import strawHats from '../logos/oc4d5zck25f71.png'
import pokeBall from '../logos/Poké_Ball_icon.png'
import leafVillage from '../logos/768px-Simbolo_konoha.png'
import fate from '../logos/pngegg.png'
import demonLogo from '../logos/5ede4a3fb760540004f2c5e9.png'
import dragonBall from '../logos/toppng.com-dragon-ball-z-dbz-son-goku-deviantart-anime-stickers-esferas-del-dragon-4-estrellas-480x480.png'
import gurrenLogo from '../logos/PinClipart.com_chariot-clip-art_3799660.png'
import codeGeass from '../logos/imgbin_lelouch-lamperouge-geass-photography-desktop-png.png'
import './SearchLogo.scss'


const SearchLogo = () => {

    const [logo, setLogo] = useState(dragonBall)
    const [animation, setAnimation] = useState('App-logo-spin infinite 20s cubic-bezier(1,0.39,1,1)')
    const [playState, setPlayState] = useState('running')


    // Returns the current Bezier linear or other measurements in animation
    const getBezier = () => {

        // using split to seperate words from animation returns array of words
        let animationWords = animation.split(' ')
        console.log(animationWords)

        let getCubicBezier = animationWords[3]

        return getCubicBezier

    }

    useEffect(() => { getBezier() }, [])


    // Returns the name of current Key Frame animation
    const getKeyFrame = () => {

        // using split to seperate words from animation returns array of words
        let animationWords = animation.split(' ')

        // grabs the last value from the list
        return animationWords[0]
    }


    // Returns speed of animation
    const getSpeed = () => {

        // using split to seperate words from animation returns array of words
        let animationWords = animation.split(' ')

        // first value from list is the speed of animation
        return animationWords[2]

    }





    // function that gets a float number between min num and max num
    const r = (min, max) => {
        return Math.random() * (max - min) + min;
    }


    const stopButton = (e) => {
        const running = playState === 'running';

        e.target.innerText = running ? 'start' : 'stop'

        setPlayState(running ? 'paused' : 'running')


    }

    const changeAnimation = () => {
        let number = r(1, 20)
        console.log(`${getKeyFrame()} infinite ${getSpeed()} cubic-bezier(${r(0, 1)},${r(-1, 1)},${r(0, 1)},${r(-1, 1)})`)

        // first and third cubic-bezier can only go from 0-1 more on cubic-bezier in CSS
        setAnimation(`${getKeyFrame()} infinite ${getSpeed()} cubic-bezier(${r(0, 1)},${r(-1, 1)},${r(0, 1)},${r(-1, 1)})`)

    }

    const speed = () => {
        let number = r(1, 20)

        setAnimation(`${getKeyFrame()} infinite ${number}s ${getBezier()}`)

    }

    const reverse = () => {
        const reverse = getKeyFrame() === 'App-logo-spin-reverse'

        setAnimation(reverse ? `App-logo-spin infinite ${getSpeed()} ${getBezier()}` : `App-logo-spin-reverse infinite ${getSpeed()} ${getBezier()}`)
    }

    const original = () => {
        setAnimation(`App-logo-spin infinite 20s linear`)

        // stopBttn.innerText = 'stop'
    }

    const imageList = (e) => {
        const imageSrc = e.target.value
        setLogo(imageSrc)
    }





    return (
        <div id='logo-container'>
            <select onChange={(e) => { imageList(e); e.target.style.color = '#000000' }} name='logo' id='images'>
                <option disabled selected hidden>Select a logo!</option>
                <option value={dragonBall}>Dragon Ball</option>
                <option value={strawHats}>straw Hats</option>
                <option value={zoroLogo}>zoro</option>
                <option value={chopperLogo}>Chopper</option>
                <option value={pokeBall}>PokeBall</option>
                <option value={demonLogo}>Demon Slayer</option>
                <option value={leafVillage}>Naruto</option>
                <option value={gurrenLogo}>Gurren Lagann</option>
                <option value={codeGeass}>Code Geass</option>
                <option value={fate}>Fate</option>
            </select>

            <div>
                <img src={logo} id="App-logo" alt="logo" style={{
                    animation: animation,
                    animationPlayState: playState
                }} />

            </div>



            <div className='function-buttons'>
                <button onClick={(e) => { original() }}>original</button>
                <button onClick={(e) => { reverse() }}>reverse</button>
                <button onClick={(e) => { changeAnimation() }}>animation</button>
                <button onClick={(e) => { speed() }}>speed</button>
                <button onClick={(e) => { stopButton(e) }}>stop</button>
            </div>

        </div>
    )
}

export default SearchLogo
