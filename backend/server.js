const express          = require('express');
const bodyParser       = require('body-parser');
const http             = require('http');

const locationService  = require('./services/location.service'); 

const app              = express();

app.set('port', process.env.PORT || 3000);

app.disable('x-powered-by');

if(app.get('env') === 'production') {
  app.use(cors);
  app.enable('trust-proxy');
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.frameguard({
    action: 'deny'
  }));
}

app.use(bodyParser.json());

/**
 * If user uses geolocation button
 * return user address from posted data
 */
/////////////////////
// req.body = {
//  latitude: number,
//  longitude: number,
//  errorCode: number
// }
/////////////////////
app.post('/api/location', (req, res, next) => {
  
  let clientCoords = req.body;
  let lang = req.get('accept-language').split('-')[0]; // Client language

  // The client approuved geolocation
  // Get the address by googleMaps reverseGeocode
  if(clientCoords.errorCode === 0) {

    let coords = `${clientCoords.latitude},${clientCoords.longitude}`; // Client geolocation coords

    locationService.getAddressFromCoords(coords, lang, (err, data) => {
      if(err) return res.json(err);
      else return res.json(data);
    });
  
    // The client disapproved geolocation
    // Get the address based on client ipv4
  } else {
    let clientIp;
    
    if(app.get('env') === 'production') clientIp = req.get("X-Forwarded-For");
    else clientIp = process.env.TEST_IP;
    
    locationService.getAddressFromIp(clientIp, lang, (err, data) => {
      if(err) return res.json(err);
      else return res.json(data);
    });
  }
});

/**
 * return places around from posted address
 */
///////////////////////////////////
// req.body
// {
//  address: string,
// }
//
///////////////////////////////////
app.post('/api/places-by-address', (req, res, next) => {
  let address = req.body.address;
  let lang = req.get('accept-language').split('-')[0]; // Client language
  locationService.getPlaces(address, lang, (err, data) => {
    if(err) return res.json(err);
    else return res.json(data)
  })
});

app.listen(app.get('port'), () => {
  console.log('Server running');
});
