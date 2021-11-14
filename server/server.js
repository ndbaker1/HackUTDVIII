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
    rain: [text => /Hail/gi.test(text), () => {
      const warnings = [
        'Quarter size hail, move vehicles under cover and monitor machinery around the perimeter of the house',
      ]
      return warnings[Math.floor(Math.random() * warnings.length)]
    }],
    rain: [text => /Flood/gi.test(text), () => {
      const warnings = [
        'Area in danger of floods, do not stay indoors and try to get to the highest point possible',
      ]
      return warnings[Math.floor(Math.random() * warnings.length)]
    }],
    rain: [text => /Rain/gi.test(text), () => {
      const warnings = [
        'Heavy rain and gusts in the area. Move belongings in doors if they may be washed or swept away',
        'High amounts of rain preceeding a storm, cover plants and ',
      ]
      return warnings[Math.floor(Math.random() * warnings.length)]
    }],
    sunny: [text => /Sun/gi.test(text), () => {
      const warnings = [
        'Humidity is low and temperatures are high, watch out for cracks in your foundation. Watering regularly can help mititage this issue',
      ]
      return warnings[Math.floor(Math.random() * warnings.length)]
    }],
    snow: [text => /Snow/gi.test(text), () => {
      const warnings = [
        'Watch for pipes and faucets freezing around the perimeter of the property',
      ]
      return warnings[Math.floor(Math.random() * warnings.length)]
    }],
  }

  const notifications = []

  for (const period of periods) {
    for (const [key, [check, func]] of Object.entries(matches)) {
      if (check(period.detailedForecast)) {
        notifications.push({
          timestamp: period.startTime,
          notificationID: key.toUpperCase(),
          message: func(),
          temperature: period.temperature + period.temperatureUnit,
        })
      }
    }
  }

  //// TEM PTHNFSDFSDhjfuijds bh
  for (const [key, message, temp] of temps) {
    if (Math.random() < 0.6) {
      const tempNotify = notifications[Math.floor(Math.random() * notifications.length)]
      notifications.push({
        timestamp: tempNotify.timestamp,
        notificationID: key.toUpperCase(),
        message: message,
        temperature: temp,
      })
    }
  }

  res.send(notifications)
})

app.listen(port, () => {
  console.log('Starting!');
})

const temps = [
  ['tornado', 'Move stay objects inside in order to avoid projectiles if tornado is within your property\'s vicinity', '66F'],
  ['hurricane', 'Move stay objects inside in order to avoid projectiles if hurricane is within your property\'s vicinity', '66F'],
  ['icy roads', 'Do not try to drive or move vehicles on icy roads', '29F'],
]