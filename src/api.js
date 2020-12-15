import axios from 'axios';
//GET request using inputted city to get city
const getUsers = async () => {

    const userResults = await axios.get(`http://localhost:5000/users/`);

    return userResults;
}

export {getUsers};