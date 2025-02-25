var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/item/')
    },
    filename: function (req, file, cb) {
     console.log(file)
      cb(null, file.originalname)
    }
  })

var upload = multer({ storage: storage})

module.exports = upload