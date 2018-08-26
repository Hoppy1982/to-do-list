class ErrorController {
  error404(req, res, next) {
    res.render('404', {pageName: '404'})
  }
}

const errorController = new ErrorController()

module.exports = errorController;
