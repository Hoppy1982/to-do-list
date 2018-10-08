const path = require('path')
const express = require('express')
const requestLogger = require(path.join(__dirname, 'utils/route-middleware/request-logger'))
//const requestRedirects = require(path.join(__dirname, 'utils/route-middleware/request-redirects'))

// front end routes
const HomeController = require('./controllers/home-controller');
const ErrorController = require('./controllers/error-controller');

// api routes
const TableController = require('./controllers/table-controller');
const TodoController = require('./controllers/todo-controller');

const router = express.Router()

//middleware
router.use('/', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")//not sure this should be applied to all routes
  next()
})
//router.post('/api/todo/', validateTodoEntry.inputVal)//moving validate to function instead of middleware

// front end URLs
router.get('/home', HomeController.index)
router.get('/404', ErrorController.error404)

// api URLs
router.get('/api/table/:table/', TableController.index)
router.get('/api/todo/', TodoController.index)
router.post('/api/todo/', TodoController.create)
router.delete('/api/todo/', TodoController.delete)
// router.put('/api/todo/:id', TodoController.update)

//router.all('*', requestRedirects.redirect)

module.exports = router
