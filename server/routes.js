const path = require('path')
const express = require('express')
const requestLogger = require(path.join(__dirname, 'utils/route-middleware/request-logger'))//implement this


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
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  next()
})


// front end URLs
//router.get('/home', HomeController.index)
router.get('/404', ErrorController.error404)

router.get('/home', (req, res, nex) => {//move this to HomeController.index
  let indexPagePath = path.join(__dirname, '/../client/dist/index.html')
  res.sendFile(indexPagePath)
})


// api URLs
router.get('/api/table/:table/', TableController.index)
router.get('/api/todo/', TodoController.index)
router.post('/api/todo/', TodoController.create)
router.delete('/api/todo/', TodoController.delete)
// router.put('/api/todo/:id', TodoController.update)




module.exports = router
