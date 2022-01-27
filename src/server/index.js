var path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config()

const app = express()

const projectData = {}
let cityImages = []

const apiKey = {
    key: process.env.API_KEY,
    imageKey: process.env.IMAGE_KEY
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use(express.static('client'))

app.get('/all', (req, res) => {
    res.send(projectData)
})
app.get('/images', (req,res) => {
    res.send(cityImages)
})
app.get('/key', (req,res) => {
    res.send(apiKey)
})




// Post Route

function cityData(req,res){
    if(req.body.data) {
        projectData['cityName'] = req.body.city_name
        projectData['time'] = req.body.timezone
        projectData['date'] = req.body.data[0].datetime
        projectData['snow'] = req.body.data[0].snow 
        projectData['maxTemp'] = req.body.data[0].max_temp
        projectData['minTemp'] = req.body.data[0].min_temp
        projectData['windSpeed'] = req.body.data[0].wind_spd
    } else {
        projectData['cityName'] = req.body.city_name
        projectData['time'] = req.body.timezone
        projectData['date'] = req.body.datetime
        projectData['snow'] = req.body.snow
        projectData['maxTemp'] = req.body.max_temp
        projectData['minTemp'] = req.body.min_temp
        projectData['windSpeed'] = req.body.wind_spd
    }
    //res.send(projectData)
}

function cityImage(req, res) {
    cityImages = req.body
    //res.send(cityImages)
}
app.post('/getCityData', cityData)
app.post('/getCityImage', cityImage)


// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

