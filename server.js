const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/', (req, res) => {
    res.render('views/index.html');
});

app.get('/scripts.js', function(req, res) {
    res.sendFile(__dirname + '/public/assets/scripts.js');
});
app.get('/jspreadsheet-ce.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/jspreadsheet-ce/dist/index.js');
});
app.get('/jspreadsheet-ce.css', function(req, res) {
    res.sendFile(__dirname + '/node_modules/jspreadsheet-ce/dist/jspreadsheet.css');
});
app.get('/jsuites.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/jsuites/dist/jsuites.js');
});
app.get('/jsuites.css', function(req, res) {
    res.sendFile(__dirname + '/node_modules/jsuites/dist/jsuites.css');
});

app.get('/socket.io.js', function(req, res) {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

let messages = [];
let worksheetData = null;

io.on('connection', (socket) => {
    console.log(`socket conectado: ${socket.id}`);
    
    socket.emit('onInitChat', messages);

    socket.on('sendMessage', (data) => {

        console.log({data});
        
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });

    socket.emit('onInitSpreadSheet', worksheetData);

    socket.on('updateSheet', (data) => {

        worksheetData = data;

        socket.broadcast.emit('receivedUpdateSheet', data);
    });
});


server.listen(PORT);
