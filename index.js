const express = require('express');
const auth = require('./router/auth.js');
const user = require('./router/user.js');
const path = require('path');
const conexionDB = require('./config/db');
var cors = require('cors')

const app = express();

conexionDB();

app.use(cors())

app.use(express.json());
app.use(express.static('build'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname, '/build/')));

app.use('/api/v1/auth', cors(), auth); 
app.use('/api/v1/', cors(), user);

const port = process.env.PORT || 4000;

app.listen( port, () => {
    console.log(`server conectado correctamente puerto ${port}`);
})