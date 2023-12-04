const axios = require('axios');

const weatherstackURL = 'http://api.weatherstack.com/current';
const mapboxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const weatherstackParams = {
  access_key: '0fb01c7418278140d442c3b2f29bb71a',
  query: '-0.924759,100.363256',
  units: 'm',
};

const mapboxParams = {
  access_token: 'pk.eyJ1IjoiaGFuanVscGFuIiwiYSI6ImNscDZ6czYxbjBlZHEycXFwdGs3bGZvbTAifQ.5Fta-gczSfGxZZLA57vzjQ',
  limit: 1,
};

let locationName;
let temperature; // Pindahkan deklarasi variabel temperature ke sini

// Permintaan pertama ke Weatherstack
axios.get(weatherstackURL, { params: weatherstackParams })
  .then(responseWeatherstack => {
    const dataWeatherstack = responseWeatherstack.data;

    if (dataWeatherstack.location && dataWeatherstack.location.name) {
      locationName = dataWeatherstack.location.name;
      temperature = dataWeatherstack.current.temperature; // Tetapkan nilai di sini

      // Ekstrak data lokasi dari response Weatherstack
      const latitude = dataWeatherstack.location.lat;
      const longitude = dataWeatherstack.location.lon;

      // Permintaan kedua ke Mapbox berdasarkan koordinat dari Weatherstack
      return axios.get(`${mapboxURL}/${longitude},${latitude}.json`, { params: mapboxParams });
    } else {
      throw new Error('Data lokasi tidak ditemukan dalam respons Weatherstack.');
    }
  })
  .then(responseMapbox => {
    const dataMapbox = responseMapbox.data;
    const placeName = dataMapbox.features[0].place_name;
    const placeType = dataMapbox.features[0].place_type[0];

    // Menampilkan output yang diinginkan
    console.log(`Data yang anda cari adalah: ${locationName}`);
    console.log(`Data yang ditemukan adalah: ${placeName}`);
    console.log(`Tipe lokasi adalah: ${placeType}`);
    console.log(`Saat ini suhu di ${locationName} mencapai ${temperature} derajat Celsius.`);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
