var poolConnect = require('./pool-connect.js')

const QUERYSTR = 'SELECT * FROM TASKS'

var pool = poolConnect.getPool() //re-uses existing if already created or creates new one


pool.getConnection((err, connection) => {
  if (err) throw err

  connection.query(QUERYSTR, (err, rows) => {
    if (err) throw new Error('Error with supplied query string: ' + err)
    console.log(rows)
    connection.release()
  })
})
