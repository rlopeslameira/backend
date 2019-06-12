const express = require('express');
const multer = require('multer');
//const multerConfig = require('./config/multer')
const PostController = require('./controllers/PostController');
const routes = express.Router();

const upload = multer();

routes.post('/posts', upload.single('image'), PostController.store);

module.exports = routes;
