const express = require('express');
const multer = require('multer'); // biblioteca de lida com multpart-form-data e automatisa o processo de upload de arquivos

const routes = express.Router();
const multerConfig = require('./config/upload');

const upload = multer(multerConfig);

//controles
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');


routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/posts/:id/like',  LikeController.store);

module.exports = routes;
