const path = require('path')

class HomeController {
  index(req, res, next) {
    let indexPagePath = path.join(__dirname, '/../../client/dist/index.html')
    res.sendFile(indexPagePath)
  }
}

const homeController = new HomeController()

module.exports = homeController
