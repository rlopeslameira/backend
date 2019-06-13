const Post = require('../models/Post');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {

    // lista todos registros post em ordem DESC
    async index(req, res){

        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },


    // grava regsitro post
    async store(req, res){

        /*
        {
            "fieldname": "image",
            "originalname": "imagem.jpg",
            "encoding": "7bit",
            "mimetype": "image/jpeg",
            "destination": "C:\\Projetos\\Node\\backend\\uploads",
            "filename": "imagem.jpg",
            "path": "C:\\Projetos\\Node\\backend\\uploads\\comunicado.jpg",
            "size": 1215753
        }
        */

        //return res.json(req.file);
        
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file;


        console.log(image);

        const [ name ] = image.split('.');

        const fileName = `${name}.jpg`;

        await sharp(req.file.path)
        .resize(500)
        .jpeg({quality: 70})
        .toFile(
            path.resolve(req.file.destination, 'resized', fileName)
        );

        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            author, 
            place, 
            description,
            hashtags,
            image: fileName,
        });

        req.io.emit('post', post);

        return res.json(post);
        
    },

};