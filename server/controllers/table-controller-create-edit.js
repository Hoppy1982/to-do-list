const path = require('path')
const express = require('express')
const router = express.Router()
const pool = require('../db/database.js')
const validatePut = require(path.join(__dirname, '../utils/route-middleware/validate-put'))

console.log('route hit createEditToDoListData')
router.use(validatePut.inputVal)

router.put('/create-edit-to-do-list-data', (req, res, next) => {
  console.log(req.body)
  let jsonData = {hello: 'world'}
  res.json(jsonData)
})


module.exports = router
