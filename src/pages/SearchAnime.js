import React from 'react'
import ReactHlsPlayer from 'react-hls-player'
import { useState, useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import env from 'react-dotenv'
import { Link } from 'react-router-dom'
import SearchLogo from '../components/SearchLogo'
import './SearchAnime.scss'

const SearchAnime = () => {

    const { pageState } = useContext(UserContext)
    const [pageId, setPageId] = pageState
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
                params: { q: anime },
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
        <div className='search-anime-page'>

            {toggle ?

                <>
                    <button onClick={() => { setToggle(false) }} >Go Back</button>

                    <div className='search-content'>

                        {animeList.map((item, i) => {
                            return (
                                <div className='search-results'>


                                    <Link to={`/anime/${item.mal_id}`}> <h1>{item.title}</h1> </Link>

                                    <div>
                                        <img src={item.image_url} alt={item.title} />
                                        <p>{item.synopsis}</p>
                                    </div>


                                </div>
                            )
                        })}
                    </div>
                </>

                :


                <div className='search-page'>

                    <div>
                        <SearchLogo />
                    </div>


                    <div>
                        <form id='search-form' onSubmit={submitForm}>
                            <label htmlFor="anime-search"></label>
                            <input placeholder='Search for an Anime' id='anime-search' value={anime} onChange={(e) => { setAnime(e.target.value); e.target.style.background = '#99566286' }} />

                            <div className='submit-div'>
                                <button id="search-submit">Search!</button>
                                {/* <input id="search-submit" type="submit" value="Search!" /> */}
                            </div>

                        </form>
                    </div>
                </div>




            }




        </div>
    )
}

export default SearchAnime
