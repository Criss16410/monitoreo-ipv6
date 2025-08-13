const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let datos = [];

app.post('/ingest', (req, res) => {
    const nuevo = {
        temperatura: req.body.temp,
        humedad: req.body.hum,
        fecha: new Date().toISOString()
    };
    datos.push(nuevo);
    io.emit('nuevoDato', nuevo);
    console.log("Dato recibido:", nuevo);
    res.sendStatus(200);
});

io.on('connection', (socket) => {
    socket.emit('historial', datos);
});

server.listen(8080, '::', () => {
    console.log("Servidor IPv6 escuchando en puerto 8080");
});
