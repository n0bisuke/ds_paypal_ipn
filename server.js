'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios');
const VM_URL = process.env.MAIN_HOST || '';

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+'/'));

const PORT = process.env.PORT || 4003;

app.get('/', async (req, res) => res.sendFile(__dirname+'index.html'));

app.post('/ipn_webapps', async (req, res) => {
    console.log(req.body); //PayPalから送られて来る情報の確認
    const options = {
        method: 'post',
        baseURL: VM_URL,
        url: '/ipn_vm',
        data: req.body,
    };
    await axios.request(options);//VMに投げる
    const response = {message: 'Success!'};
    res.end(JSON.stringify(response));
});

app.post('/ipn_vm', async (req, res) => {
    console.log(req.body); //PayPalから送られて来る情報の確認

    const response = {
        message: 'Success!'
    };
    res.end(JSON.stringify(response));
});

app.listen(PORT);
console.log(`listening on *:${PORT}`);