const http = require('http');
const location = require('./google-maps.service');

/**
 * 
 * @param coords: string `${latitude},${longitude}` 
 * @param lang: string 
 * @param callback: response 
 */
const getAddressFromCoords = function(coords, lang, callback) {
  // Needed by google maps reverse geocode 
  // https://developers.google.com/maps/documentation/geocoding/intro
  
  let reverseGeoParams = {
    latlng: coords,
    result_type: 'street_address|locality|postal_code',
    language: lang,
    location_type: 'ROOFTOP'
  }

  ///////////////////////////////////////////////////////////////////
  // reverseGeocode response
  //
  // data.json = {
  //  results [
  //    {
  //      ...
  //      formatted_address: string,    
  //      place_id: string             
  //    }
  //  ],
  //  status: string "OK" | "ZERO_RESULTS"
  // }
  ////////////////////////////////////////////////////////////////////
  location.reverseGeocode(reverseGeoParams, (err, data) => {
    if(err) {
      return callback(err);
    } else {
      if(data.json.status === "OK") {
        return callback({
          address: data.json.results[0].formatted_address,
          placeId: data.json.results[0].place_id});
      } else {
        return callback({address: ''});
      }
      
    }
  })
}

/**
 * 
 * @param ip: string 
 * @param callback: response 
 */
const getAddressFromIp = function(ip, lang, callback) {

  http.get("http://freegeoip.net/json/" + ip, (response) => {
    response.setEncoding('utf8');
    response.on("data", (data) => {
      let location = JSON.parse(data.toString());
      let coords = `${location.latitude},${location.longitude}`; // Client geolocation coords
      ////////////////////////////////////////////
      // location 
      // {
      //  city:"Saint-Martin-du-Var"
      //  country_code:"FR"
      //  country_name:"France"
      //  ip:"78.197.142.117"
      //  latitude:43.8181
      //  longitude:7.1903
      //  metro_code:0
      //  region_code:"PAC"
      //  region_name:"Provence-Alpes-Côte d'Azur"
      //  time_zone:"Europe/Paris"
      //  zip_code:"06670"
      // }
      ////////////////////////////////////////////
      getAddressFromCoords(coords, lang, callback)
    });
  });
}

/**
 * 
 * @param {*} address 
 * @param {*} lang 
 * @param {*} callback 
 */
const getPlaces = function(address, language, callback) {
  let query = { address, language }
  location.geocode(query, (err, data) => {
    if(err) return callback(err.json);
    else {
      let latitude = data.json.results[0].geometry.location.lat;
      let longitude = data.json.results[0].geometry.location.lng;
      let latlng = `${latitude},${longitude}`
      query = {
        language,
        location: latlng,
        rankby: 'distance',
        keyword: 'bar'
      }
      location.placesNearby(query, (err, data) => {
        if(err) return callback({places: []});
        else return callback({places: data.json.results});
      });
    }
  });
}

module.exports = {
  getAddressFromCoords,
  getAddressFromIp,
  getPlaces
}