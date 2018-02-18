'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+'/'));

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => res.sendFile(__dirname+'index.html'));

app.post('/', async (req, res) => {
    console.log(req.body); //PayPalから送られて来る情報の確認    

    const response = {
        message: 'Success!'
    };
    res.end(JSON.stringify(response));
});

app.listen(PORT);
console.log(`listening on *:${PORT}`);