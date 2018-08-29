const database = require('../db/database')

class TableModel {
  get(table) {
    return database.queryDB(`SELECT * FROM ${table}`)
      .then(rows => {
        let results = {
          tableName: table,
          rows: rows
        }
        return results
      })
      .catch(err => {
        throw new Error(err)
        // return 500 ...
        // rather than throwing an error
        // so that the application doesn't crash
        // and we can show the user a 500 error
        // BUT - we do need to capture that an error occurred...
      })
  }
}

const tableModel = new TableModel()

module.exports = tableModel;
