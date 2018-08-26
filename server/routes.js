const path = require('path')
const express = require('express')
const requestLogger = require(path.join(__dirname, 'utils/route-middleware/request-logger'))
const requestRedirects = require(path.join(__dirname, 'utils/route-middleware/request-redirects'))

// front end routes
const HomeController = require('./controllers/home-controller');
const ErrorController = require('./controllers/error-controller');

// api routes
const TableController = require('./controllers/table-controller');
const TodoController = require('./controllers/todo-controller');

const router = express.Router()

// front end URLs
router.get('/home', HomeController.index)
router.get('/404', ErrorController.error404)

// api URLs
router.get('/api/table/:table/', TableController.index)
router.get('/api/todo/', TodoController.index)
router.post('/api/todo/', TodoController.create)
// router.put('/api/todo/:id', TodoController.update)

router.all('*', requestRedirects.redirect)

module.exports = router
