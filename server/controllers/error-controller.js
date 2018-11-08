class ErrorController {
  error404(req, res, next) {
    //res.render('404')
    res.send('404! 404! 404!')
  }
}

const errorController = new ErrorController()

module.exports = errorController;
