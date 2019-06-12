const express = require('express'); // gerencia rotas
const mongoose = require('mongoose'); // trabalha com o mongodb
const path = require('path'); // gerencia caminhos
const cors = require('cors'); // permitir que o BACKEND seja acessado de qualquer domínio

const app = express();
app.use(cors());

const server = require('http').Server(app); // conexões http
const io = require('socket.io')(server); // realtime habilita suporte a websocket


mongoose.connect('mongodb://maisescola01:drconsultoria@mongo71-farm76.kinghost.net/maisescola01?retryWrites=true',{
    useNewUrlParser: true
});


app.use((req, res, next) => {
    req.io = io;

    next();
});

app.use(express.json()); // permite receber json data
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes')); 

server.listen(process.env.PORT || 1010);