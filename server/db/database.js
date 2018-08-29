const mysql = require('mysql')
const util = require('util')

//--pool creation
const pool = mysql.createPool({
  connectionLimit: 10,
  host     : 'localhost',
  user     : 'to-do-list--user',
  password : 'user',
  database : 'to_do_list'
})
pool.promisifiedQuery = util.promisify(pool.query)

//console.error is used so that only msg is displayed,
//code continues to execute
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Databse connection was refused.')
    }
  }

  if (connection) connection.release()
  return
})


async function queryDB(queryStr) {
  return await pool.promisifiedQuery(queryStr)
}

module.exports = {
  queryDB: queryDB
}
