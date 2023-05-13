const express = require('express')

const app = express()

const port = process.env.PORT || 3000
const tz = process.env.TZ || 'UTC'

const timeZone = (req, res) => {
    try {
        const timeZone = req.headers['x-time-zone'] || req.query?.tz || tz
        const customTime = req.headers['x-custom-time'] || req.query?.time || req.body?.time || null
        const customLocale = req.headers['x-custom-locale'] || req.query?.locale || req.body?.locale || 'en-US'
        const date = customTime ? new Date(customTime) : new Date()
        const currentDate = date.toLocaleString(customLocale, { timeZone: timeZone })

        res.json({
            serverDate: new Date().toLocaleString(customLocale),
            date: currentDate,
            timestamp: date.getTime(),
            timezone: timeZone,
            locale: customLocale,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

app.get('/', (req, res) => {
    timeZone(req, res)
})

app.post('/', (req, res) => {
    timeZone(req, res)
})

app.listen(port, () => {
    console.log(`TZ Node example app listening at http://localhost:${port}`)
})