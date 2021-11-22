const express = require('express');
const auth = require('./router/auth.js');
const user = require('./router/user.js');
const path = require('path');
const conexionDB = require('./config/db');
const cors = require('cors')

const app = express();
conexionDB();

app.use(express.json());
app.use(express.static('build'));
app.use(cors())

app.get('/*', (req, res) => 
    res.sendFile(path.join(__dirname, '/build/')));

app.use('/api/v1/auth', auth); 
app.use('/api/v1/user', user);


const port = process.env.PORT || 4000;

app.listen( port, () => {
    console.log(`server conectado correctamente puerto ${port}`);
})