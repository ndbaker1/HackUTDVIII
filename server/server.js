import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

console.log(Date.now())
const REQUEST_INTERVAL_MILLISECONDS = 5 * 60 * 1000


const app = express()
app.use(cors())
const port = 8080

const weatherAPI = {
  base: 'https://api.weather.gov/',
  points: 'https://api.weather.gov/points/',
}


app.get('/weather', async (req, res) => {

  console.log('[INFO] query params : ', req.query)
  const { lat, long, forceType } = req.query

  if (forceType) {
    return JSON.stringify(forceTypes(forceType))
  }

  console.log('[INFO] request to : ', weatherAPI.points + lat + ',' + long)
  const weatherByPoint = await (await fetch(weatherAPI.points + lat + ',' + long, { method: 'GET' })).json()

  console.log('[INFO] weather by lat,long : ', weatherByPoint)

  const { properties: { periods } } = await (await fetch(weatherByPoint.properties.forecast, { method: 'GET' })).json()

  // PERIOD: [
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
  // ...
  //]

  const matches = {
    rain: [/rain/gi, () => { return 'rain' }],
    sunny: [/sunny/gi, () => { return 'sunny' }],
    snow: [/snow/gi, () => { return 'snow' }],
    cloudy: [/cloudy/gi, () => { return 'cloudy' }],
  }

  const notifications = []

  for (const period of periods) {
    for (const [regex, func] of Object.values(matches)) {
      if (regex.test(period.detailedForecast)) {
        notifications.push({
          timestamp: Date.now() - Math.round(Math.random() * REQUEST_INTERVAL_MILLISECONDS),
          notificationID: func(),
        })
      }
    }
  }

  res.send(notifications)
})

app.listen(port, () => {
  console.log('Starting!');
})

const forceTypes = {
  hail: [
    {

    }
  ],
  tornado: [
    {

    }
  ],
}