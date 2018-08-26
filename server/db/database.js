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


module.exports = pool


//below is method of creating pool only if it doesn't exist
/*
function getPool() {
  if (pool) return pool
  pool = mysql.createPool({
    connectionLimit: 4,
    host     : 'localhost',
    user     : 'to-do-list--user',
    password : 'user',
    database : 'to_do_list'
  })
  return pool
}
*/
