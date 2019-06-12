const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb://maisescola01:drconsultoria@mongo71-farm76.kinghost.net/maisescola01?retryWrites=true',{
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'upload')));

app.use(require('./routes')); 

server.listen(process.env.PORT || 1010);