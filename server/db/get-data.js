const pool = require('./database')

async function getData(queryStr) {
  return await pool.promisifiedQuery(queryStr)
}

module.exports = getData
