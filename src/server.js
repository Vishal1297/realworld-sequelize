const express = require('express')
const app = express()
const port = 3000

/**
 * For POST request
 */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Routes
 */

app.use('/api', require('./routes/api'))


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}/`)
})