const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use(cors())

app.listen(process.env.PORT || 8081)