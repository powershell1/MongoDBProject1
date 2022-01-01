const request = require("request");
const express = require("express");

const app = express();
const expressWs = require('express-ws')(app);

var connectionws = null;

app.ws('/connection_1', function(ws, req) {
    if (connectionws === null) {
        console.log("new connection");
        connectionws = ws;
        ws.on('message', function(msg) {
            ws.send(msg);
        });
        ws.on('close',() => {
            console.log("connection closed");
            connectionws = null;
        });
    };
});

request({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'LoginToken': '1234',
        'ClientUUID': 'E90E8C7D-B7DC-4A00-A799-19DD4A5A545E',
        'Syn-Fingerprint': 'bab68b293d196a2a676a017f55f4ba141f297000ede488af5981966395aaa9391f21872d155bf80fe15ed8b1940644061b4c077299343425e6b7555e441a9d2f',
        'Syn-User-Identifier': '2f2e17e6edd14f642f554cb45ad047272d4894e32d451fe27c0a961779cbf58960886098f63ee418d4a099f0374d008465d123d94a7b43dda32f4e1a2e7e8087'
    },
    uri: 'http://localhost:3000/whitelist-check',
    method: 'GET'
}, function (err, res, body) {
    console.log(body);
});