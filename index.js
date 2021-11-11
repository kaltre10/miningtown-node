const express = require('express');
const auth = require('./router/auth.js');

const app = express();

app.use(express.json());

app.use('/api/v1/auth', auth);

const port = process.env.PORT || 4000;

app.listen( port, () => {
    console.log(`server conectado correctamente puerto ${port}`);
})