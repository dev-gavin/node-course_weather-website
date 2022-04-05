const request = require('postman-request')

const geoCode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?&limit=1&access_token=pk.eyJ1IjoiZ21lZWtlcjk5IiwiYSI6ImNsMWU0OW52aTAzd3MzZ3FrNW1zY2poMzIifQ.oPlZXGXTJyXL4XBCreXrKg'
	
	request({ url, json: true}, (error, {body}) => {
		if (error) {
			callback("Unable to connect to location services")
		} else if (body.query.length === 0) {
			callback('Unable to find location, try another search')
		} else {
			console.log(body)
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			})
		}
	})
}

module.exports = geoCode