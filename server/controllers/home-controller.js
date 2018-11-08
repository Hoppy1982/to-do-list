
class HomeController {
  index(req, res, next) {
    console.log('rendering home')
    res.render('./dist/index.html')
  }
}

const homeController = new HomeController()

module.exports = homeController;
