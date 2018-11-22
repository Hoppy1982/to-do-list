const database = require('../db/database')
const validateUserInput = require('../utils/validate-user-input')

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
    return database.queryDB(this.queryStr)
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

  create(todoTaskUserInput) {
    console.log('Received user input to create new todo task..')

    validateUserInput.todo(todoTaskUserInput)
      .then(validationIssues => {
        console.log(todoTaskUserInput.name)
        console.log(todoTaskUserInput.description)

        if (validationIssues.length === 0) {
          let str = `INSERT INTO tasks (
            task_name,
            task_desc,
            priority,
            progress_id,
            category_id
          )
          VALUES (
           '${todoTaskUserInput.name}',
           '${todoTaskUserInput.description}',
            ${todoTaskUserInput.priority},
            ${todoTaskUserInput.progress},
            ${todoTaskUserInput.category}
          );`
          console.log('Input is valid, inserting todo task into DB..')
          database.queryDB(str)
            .then(rows => {
              console.log(rows)
            })
            .catch(err => {
              console.log(err)
            })
        } else if (validationIssues.length > 0) {
          console.log(`Input is invalid. validationIssues: ${validationIssues}`)
        }

      })

      return 'todoModel.screate: temporary return msgs'
  }

  edit(todoTaskUserInput) {
    console.log('Received user imput to edit an existing todo task..')

    validateUserInput.todo(todoTaskUserInput)
      .then(validationIssues => {

        if (validationIssues.length === 0) {
          let str = `
          UPDATE tasks
          SET
            task_name = '${todoTaskUserInput.name}',
            task_desc = '${todoTaskUserInput.description}',
            priority = '${todoTaskUserInput.priority}',
            progress_id = '${todoTaskUserInput.progress}',
            category_id = '${todoTaskUserInput.category}'
          WHERE task_id = ${todoTaskUserInput.id}
          ;`

          console.log('Input is valid, updating todo task in DB..')
          database.queryDB(str)
            .then(rows => {
              console.log(rows)
            })
            .catch(err => {
              console.log(err)
            })
        } else if (validationIssues.length > 0) {
          console.log(`Input is invalid. validationIssues: ${validationIssues}`)
        }

      })

      return 'todoModel.edit: temporary return msgs'
  }

  delete(delData) {
    console.log(`delete row ${delData.rowId} request received..`)
    let str = `DELETE FROM tasks WHERE task_id=${delData.rowId};`
    //validate
    //return different msgs for success or failure
    database.queryDB(str)
    return 'delete was successful'
  }
}

const todoModel = new TodoModel()

module.exports = todoModel;
