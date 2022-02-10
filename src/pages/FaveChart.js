// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// https://stackoverflow.com/questions/65002923/chart-js-where-do-i-find-which-components-should-be-registered
import Chart from 'chart.js/auto'
import { Doughnut, Bar, Pie } from 'react-chartjs-2';

import React from 'react'
import { UserContext } from "../context/UserContext"
import { useState, useContext, useEffect } from 'react'
import {Link, useParams } from 'react-router-dom'
import axios from 'axios'
import env from 'react-dotenv'
import './FaveChart.css'

// ChartJS.register(ArcElement, Tooltip, Legend);

const FaveChart = () => {

    const [favorites, setFavorites] = useState([]);


    const [xValues, setXValues] = useState([])
    const [yValues, setYValues] = useState([])
    const [bgColor, setBgColor] = useState([])
    const [favoriteTotal, setFavoriteTotal] = useState(0);

    async function getFavorites() {
        const response = await axios.get(`${env.BACKEND_URL}/fave/all`);
        console.log(response)
        setFavorites(response.data.Favorites);
    }

    useEffect(() => { getFavorites(); }, []);


    const random_rgba = () => {
        const o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }
    


    const test = () => {

        // console.log(favorites)

        let allFavorites = []

        for (let fav of favorites){
            allFavorites.push(fav.title)
        }

        // // prints a list of all user's region
        // // console.log(allFavorites)
        

        // // returns array of each unique data type
        let set = new Set(allFavorites);


        let names = []
        let nameAmount = []
        for (let entry of set) {
            names.push(entry)
            // https://stackoverflow.com/questions/37365512/count-the-number-of-times-a-same-value-appears-in-a-javascript-array
            const count = allFavorites.filter(x => x === entry).length
            nameAmount.push(count)
            console.log(entry+":", count);
        }

        const bgList = [...new Set(names.map((item) => {
            return random_rgba()
        }))]

        setXValues(names)
        setYValues(nameAmount)
        setBgColor(bgList)
        setFavoriteTotal(allFavorites.length)
        console.log('xValues', names)
        console.log('yValues', nameAmount)

    }

    useEffect(()=>{test()}, [favorites]);


    const data = {
        labels: xValues,
        datasets: [
            {
                label: 'Subs per Region',
                data: yValues,
                backgroundColor: bgColor,
                // borderColor: [
                //     'rgba(255, 99, 132, 1)',
                //     'rgba(54, 162, 235, 1)',
                //     'rgba(255, 206, 86, 1)',
                //     'rgba(75, 192, 192, 1)',
                //     'rgba(153, 102, 255, 1)',
                //     'rgba(255, 159, 64, 1)',
                //     'rgba(250, 34, 123, 1)'
                // ],
                borderWidth: 1,
            },
        ],
    };


    return (
        <div className='chart-page'>

            <h1>Top Favorite Anime Chart</h1>
            <div className='DoughnutGraph'>
                <Doughnut
                    data={data}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'right'
                            },
                            title: {
                                display: true,
                                text: 'Favorite anime by users',
                                position: 'bottom'
                            }
                        }
                    }}
                />
            </div>
            
        </div>
    )
}

export default FaveChart
