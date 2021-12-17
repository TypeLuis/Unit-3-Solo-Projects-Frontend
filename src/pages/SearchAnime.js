import React from 'react'

import { useState, useContext }  from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'
import { Link } from 'react-router-dom'

const SearchAnime = () => {

    const { pageState } = useContext(UserContext)
    const [pageId , setPageId] = pageState
    setPageId(0)



    const [anime, setAnime] = useState('')
    const [animeList, setAnimeList] = useState([])
    const [toggle, setToggle] = useState(false)

    const submitForm = async (e) => {
        try {
            e.preventDefault()

            const options = {
                method: 'GET',
                url: 'https://jikan1.p.rapidapi.com/search/anime',
                params: {q: anime},
                headers: {
                  'x-rapidapi-host': 'jikan1.p.rapidapi.com',
                  'x-rapidapi-key': '727f37a8camshb83e2ba47933fe7p1aebc9jsnca961d544f1f'
                }
            };

            const response = await axios.request(options)

            console.log(response)

            await setAnimeList(response.data.results)

            await setToggle(true)
         


        } catch (error) {
          console.log('Error:', error.message)
        }
    }


    return (
        <div>

            {toggle ?

                    <>
                     <button onClick={()=>{setToggle(false)}} >Go Back</button>

                     {animeList.map((item, i)=>{
                         return (
                            <div>
                                
                                
                                <Link to={`/${item.mal_id}`}> <h1>{item.title}</h1> </Link>
                                <span>{item.mal_id}</span>
                                <p>{item.synopsis}</p>
                                <img src={item.image_url} alt={item.title} />
            
                            </div>
                         )
                     })}
                    </>
        
                :



                <div>
                    <form onSubmit={submitForm}>
                        <label htmlFor="anime">Search Anime:</label>
                        <input value={anime} onChange={(e) => setAnime(e.target.value)}/>

                        <input type="submit" value="Search!" />
                    </form>
                </div>
        
            
            }




        </div>
    )
}

export default SearchAnime
