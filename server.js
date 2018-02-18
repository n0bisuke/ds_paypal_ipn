'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
const VM_URL = process.env.MAIN_HOST || 'https://ac0becfc.ngrok.io';

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+'/'));

const PORT = process.env.PORT || 4003;

app.get('/', async (req, res) => res.sendFile(__dirname+'index.html'));

//一次受け WebApps
app.post('/ipn_webapps', async (req, res) => {
    await request.post(VM_URL+'/ipn_vm').form(req.body);
    const response = {message: 'Success!'};
    res.end(JSON.stringify(response));
});

//実際の中身
app.post('/ipn_vm', async (req, res) => {
    console.log(req.body); //PayPalから送られて来る情報の確認

    const response = {
        message: 'Success!'
    };
    res.end(JSON.stringify(response));
});

app.listen(PORT);
console.log(`listening on *:${PORT}`);