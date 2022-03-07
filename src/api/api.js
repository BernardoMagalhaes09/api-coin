const axios = require('axios');

const api = axios.create({
   baseURL : "https://min-api.cryptocompare.com/data/",
   headers: {
    authorization: 'Apikey 573cc557a954c544564cd3038ff80534518e1f4b9facc0ab6bee28c640a0bbae',
  },
});

module.exports = api;