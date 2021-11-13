import express from 'express'
import fetch from 'node-fetch'

const app = express()
const port = 8080

const weatherAPI = {
  base: 'https://api.weather.gov/',
  points: 'https://api.weather.gov/points/',
}

app.get('/weather', async (req, res) => {

  console.log('[INFO] query params : ', req.query)
  const { lat, long } = req.query

  console.log('[INFO] request to : ', weatherAPI.points + lat + ',' + long)
  const weatherByPoint = await (await fetch(weatherAPI.points + lat + ',' + long, { method: 'GET' })).json()

  console.log('[INFO] weather by lat,long : ', weatherByPoint)

  const { properties: { periods } } = await (await fetch(weatherByPoint.properties.forecast, { method: 'GET' })).json()

  // "number": 1,
  // "name": "This Afternoon",
  // "startTime": "2021-11-13T16:00:00-06:00",
  // "endTime": "2021-11-13T18:00:00-06:00",
  // "isDaytime": true,
  // "temperature": 49,
  // "temperatureUnit": "F",
  // "temperatureTrend": null,
  // "windSpeed": "5 mph",
  // "windDirection": "SW",
  // "icon": "https://api.weather.gov/icons/land/day/rain,20?size=medium",
  // "shortForecast": "Slight Chance Light Rain",
  // "detailedForecast": "A slight chance of rain after 5pm. Cloudy, with a high near 49. Southwest wind around 5 mph. Chance of precipitation is 20%."

  const matches = {
    rain: [/rain/gi, () => { }],
    sunny: [/sunny/gi, () => { }],
    snow: [/sunny/gi, () => { }],
    cloudy: [/cloudy/gi, () => { }],
  }

  periods.forEach(period => {

  })

  res.send(periods)
})

app.post('/force', () => {

})

app.listen(port, () => {
  console.log('Starting!');
})