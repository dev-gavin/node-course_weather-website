const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=564849c3a23bd32cf2f65d79d88d5534&query=' + latitude + ',' + longitude + '&units=f'
	
	request({ url, json: true}, (error, {body} = {}) => {
		if (error) {
			callback('Unable to connect to weather services')
		} else if (body.error) {
			callback('Unable to find location')
		} else {
			const forecastString = `It is currently ${body.current.temperature} degrees out. But it feels like ${body.current.feelslike}. The local time is ${body.current.observation_time}.`
			callback(undefined, forecastString)
		}
	})
}

module.exports = forecast