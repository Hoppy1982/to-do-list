const TodoModel = require('../models/todo-model');

class TodoController {
  index(req, res, next) {
    console.log('GET REQ headers follows below..')
    console.log(req.headers)
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

  create() {
    // handle post method
    // TodoModel.create(...);
    // depending on th success of the model create
    // return success or fail http error code and status message
  }
}

const todoController = new TodoController()

module.exports = todoController;
