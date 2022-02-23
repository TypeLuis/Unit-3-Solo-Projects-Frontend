import axios from 'axios'
import env from 'react-dotenv'




const watchFunction = {}


watchFunction.fetchWatchedAnime = async (setWatchIds, setWatched) => {
    try {
        const options = {
            method: 'GET',
            url: `${env.BACKEND_URL}/watched`,
            headers: {
                Authorization: localStorage.getItem('userId')
            }
        };

        const response = await axios.request(options)


        let Ids = []

        for (let watch of response.data.getAllWatched) {
            Ids.push(watch.animeId)
        }

        console.log(response.data.getAllWatched)

        setWatched(response.data.getAllWatched)
        setWatchIds(Ids)
    }
    catch (error) {
        console.log(error)
    }
}

watchFunction.watchedAnime = async (animeId, image, title, setWatchIds, setWatched) => {
    try {
        const options = {
            method: 'POST',
            url: `${env.BACKEND_URL}/watched/${animeId}`,
            headers: {
                Authorization: localStorage.getItem('userId')
            },
            data: {
                imageUrl: image,
                title: title,
            }
        };
        const response = await axios.request(options)
        watchFunction.fetchWatchedAnime(setWatchIds, setWatched)
        console.log(response)
    }
    catch (error) {
        console.log(error)
    }
}

watchFunction.deleteWatched = async (animeId, setWatchIds, setWatched) => {
    try {
        const options = {
            method: 'DELETE',
            url: `${env.BACKEND_URL}/watched/${animeId}`,
            headers: {
                Authorization: localStorage.getItem('userId')
            }
        };
        const response = await axios.request(options)
        watchFunction.fetchWatchedAnime(setWatchIds, setWatched)
        console.log(response)

    }
    catch (error) {
        console.log(error)
    }
}



watchFunction.checkWatched = (watchIds, animeId) => {
    try {

        // console.log(watchIds)
        if (watchIds.includes(animeId)) {
            return true
        }
        return false
    }
    catch (error) {
        console.log(error)
    }
}

export default watchFunction