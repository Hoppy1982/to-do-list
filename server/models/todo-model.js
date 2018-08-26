const getData = require('../db/get-data')

class TodoModel {
  constructor() {
    this.queryStr =
    `SELECT tasks.task_id, tasks.task_name, tasks.task_desc, tasks.priority, progresses.progress, categories.category
    FROM tasks
    INNER JOIN categories
    ON tasks.category_id = categories.category_id
    INNER JOIN progresses
    ON tasks.progress_id = progresses.progress_id;`
  }

  get() {
    return getData(this.queryStr)
      .then(rows => {
        let results = {
          tableName: 'to-do-list',
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

  create() {
    // do the DB query
  }
}

const todoModel = new TodoModel()

module.exports = todoModel;
