const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: function (req, file, cb){

            //const { name } = file.originalname.split('.');

            //const filename = `${name}.jpg`;

            cb(null, file.originalname);
        }
    })
}


