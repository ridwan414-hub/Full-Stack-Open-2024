import axios from 'axios';

const getall = () => {
    return axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then((response) => {
            return response.data
        });
};

export default { getall };