var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
    id: 1,
    text: "Hola soy un mensaje",
    author: "Carlos Azaustre"
}];

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).send('Hello World!!');
});

io.on('connection', (socket) => {
    console.log('Alguien se ha conectado al socket');
    //socket.emit('messages', messages);

    socket.on('new-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(3000, () =>{
    console.log("Servidor corriendo en http://localhost:3000");
});