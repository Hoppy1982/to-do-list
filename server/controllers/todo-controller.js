const TodoModel = require('../models/todo-model');


class TodoController {
  index(req, res, next) {
    const {num_rows, cat_id, prog_id, priority_min} = req.query

    // change this to a promise all -
    // in case we needed to make multiple database queries
    // and need to wait for thm all to complete before we render the results
    TodoModel.get()
      .then(results => {
        res.setHeader('Content-Type', 'application/json')
        res.send(results)
      })
  }

  create(req, res, next) {
    let postOperationSuccess = TodoModel.create(req.body.todoTask)
    res.setHeader('Content-Type', 'text/plain')
    res.send(postOperationSuccess)

    // handle post method
    // TodoModel.create(...);
    // depending on the success of the model create
    // return success or fail http error code and status message
  }

  edit(req, res, next) {
    let putOperationSuccess = TodoModel.edit(req.body.todoTask)
    res.setHeader('Content-Type', 'text/plain')
    res.send(putOperationSuccess)
  }

  delete(req, res, next) {
    let deleteOperationStatus = TodoModel.delete(req.body)
    console.log(`deleteOperationStatus: ${deleteOperationStatus}`)
    res.setHeader('Content-Type', 'text/plain')
    res.json({'msg': deleteOperationStatus})
  }
}

const todoController = new TodoController()

module.exports = todoController;
