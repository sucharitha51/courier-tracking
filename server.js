const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoConnect = require('./app/config/database')

const app = express()
const PORT = process.env.PORT || 3000

// connecting mongo database
mongoConnect()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// define the routes
app.use('/couriers', require('./app/routes'));

// serving static file for all other routes
app.use(express.static('public'))
app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
);

// server listening to the mentioned port
app.listen(PORT, () => (console.log(`express is running on ${PORT}`)))
