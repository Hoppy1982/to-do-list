class HomeController {
  index(req, res, next) {
    res.render('index', {pageName: 'Home'})
  }
}

const homeController = new HomeController()

module.exports = homeController;
