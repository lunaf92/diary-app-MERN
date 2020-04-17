import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://programming-project-f81c1.firebaseio.com/'
})

export default instance