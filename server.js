'use strict';

//サンプル用途 https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FYZTHBMZWHSTG
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
    await request.post(VM_URL+'/ipn').form(req.body);
    res.end(JSON.stringify({message: 'Success!'}));
});

//実際の中身
app.post('/ipn', async (req, res) => {
    console.log(req.body); //PayPalから送られて来る情報の確認
    const ipn = req.body;
    console.log(ipn.payer_email);
    console.log(ipn.first_name);
    console.log(ipn.last_name);

    console.log(ipn.address_zip);
    console.log(ipn.address_state);
    console.log(ipn.address_city);
    console.log(ipn.address_street);

    const mes = `${ipn.last_name+ipn.first_name}さんが${ipn.item_name}を購入しました。`;
    console.log(mes);

    const response = {message: 'Success!'};
    res.end(JSON.stringify({message: 'Success!'}));
});

app.get('/ipn_simulator', async (req, res) => {
    const postBody = {
        mc_gross: '1',
        protection_eligibility: 'Eligible',
        address_status: 'confirmed',
        payer_id: 'YKQ5X3VAHDSR8',
        address_street: '東浅草2-17-11\r\nクリエイターズシェアハウス トラブル',
        payment_date: '02:31:56 Feb 18, 2018 PST',
        payment_status: 'Completed',
        charset: 'UTF-8',
        address_zip: '111-0025',
        first_name: '遼介',
        mc_fee: '1',
        address_country_code: 'JP',
        address_name: '菅原 遼介',
        notify_version: '3.9',
        custom: '',
        payer_status: 'verified',
        business: 'info@dotstud.io',
        address_country: 'Japan',
        address_city: '台東区',
        quantity: '1',
        verify_sign: 'AsNwr3cWqF-GvirhAHjoG6nLIBdSA1R-hyXYIRVAiqXOfN8HH8a9gISq',
        payer_email: 'sugawara@ryousuke.org',
        txn_id: '0WH734172S1294414',
        payment_type: 'instant',
        last_name: '菅原',
        address_state: '東京都',
        receiver_email: 'info@dotstud.io',
        payment_fee: '',
        receiver_id: 'R9B4DK8ZQGJ7U',
        txn_type: 'web_accept',
        item_name: '[購入]サンプルボタン',
        mc_currency: 'JPY',
        item_number: '44',
        residence_country: 'JP',
        transaction_subject: '',
        payment_gross: '',
        ipn_track_id: '90cded496cebe'
    };
    await request.post(VM_URL+'/ipn_vm').form(postBody);
    res.end(JSON.stringify({message: 'Success!'}));
});

app.listen(PORT);
console.log(`listening on *:${PORT}`);