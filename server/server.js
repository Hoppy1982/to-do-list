const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require(path.join(__dirname, 'routes'))
const SERVER_CONFIG = require(path.join(__dirname, './server-config'))

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))
server.use( express.static(__dirname + '/../client/dist') )
server.use('/', routes)

server.listen(SERVER_CONFIG.PORT)
console.log(`Server started on port: ${SERVER_CONFIG.PORT}`)
