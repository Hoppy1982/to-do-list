const getData = require('../db/get-data')
const TableModel = require('../models/table-model')

class TableController {
  index(req, res, next) {
    let table = req.params.table

    // change this to a promise all -
    // in case we needed to make multiple database queries
    // and need to wait for thm all to complete before we render the results
    TableModel.get(table).then(results => {
      res.header('Content-Type', 'application/json')
      res.json(results)
    })
  }
}

const tableController = new TableController()

module.exports = tableController;
