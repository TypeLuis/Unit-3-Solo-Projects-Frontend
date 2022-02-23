import axios from 'axios'
import env from 'react-dotenv'

const downloadFunctions = {}


downloadFunctions.downloadImage = async (category) => {
    try {

        const response = await axios.post(`${env.BACKEND_URL}/user/download`, { category: category }, {
            headers: {
                Authorization: localStorage.getItem('userId')
            }
        })
        console.log(response)
        if (response.status === 200) {
            alert('Shows downloaded')
        }
    }
    catch (error) {
        console.log(error)
    }

}


export default downloadFunctions