const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
app.set('title', "Gavin's Express App")

// Paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

   app.use(express.static(publicDirPath))

const name = 'Gavin Meeker'

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Me',
		name
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name,
		helpMessage: 'This is a help message'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		})
	}

	geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error })
		} 
		
		forecast(longitude, latitude, (error, str) => {
			console.log(error)
			if (error) {
				return res.send({ error })
			}

			res.send({
				forecast: str,
				location,
				address: req.query.address
			})
		})
	})
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	} 
	res.send({
		products: []
	})
	}
)

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: 'Help - 404',
		errorMessage: 'Help article not found',
		name
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: 'Error - 404',
		errorMessage: 'Page not Found',
		name
	})
})  

app.listen(3000, () => {
	console.log('Listening on port 3000...')
}) 