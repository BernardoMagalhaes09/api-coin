const axios = require('axios');
require('dotenv/config');

const api = axios.create({
   baseURL : "https://min-api.cryptocompare.com/data/",
   headers: {
    authorization: process.env.API_KEY,
  },
});

module.exports = api;