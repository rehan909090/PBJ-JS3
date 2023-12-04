const axios = require('axios');

const url ='http://api.weatherstack.com/current?access_key=0fb01c7418278140d442c3b2f29bb71a&query=-0.9222609226993437,100.35808336767931&units=m';

axios.get(url)
  .then(response => {
    const data = response.data;
    const deskripsiCuaca = data.current.weather_descriptions;
    console.log('Deskripsi Cuaca:', deskripsiCuaca);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
