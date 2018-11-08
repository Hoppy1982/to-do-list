const path = require('path')

class ErrorController {
  error404(req, res, next) {
    //update this to render 404 componet (page) once react router implented
    res.send('404 404 404')
  }
}

const errorController = new ErrorController()

module.exports = errorController;
