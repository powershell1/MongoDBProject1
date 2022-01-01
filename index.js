require("dotenv").config();
const MongoDB = require("mongodb");
const express = require("express");
const MongoClient = MongoDB.MongoClient;
const uri = "mongodb+srv://CreateStudio3360:hackking3089@cluster0.6o3ps.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var databasename = process["env"]["DATABASE_NAME_1"];
var collectionname = process["env"]["COLLECTION_NAME_1"];
const app = express();

app.get("/whitelist-check", (req, res) => {
    function sendincorrect() {
        res.send("Fixed Your Headers");
    };
    const allowedHeaders = ['fingerprint', 'syn-user-identifier', 'sentinel-fingerprint', 'proto-user-identifier', 'shadow_hardware', 'krnl-hwid', 'exploit-guid'];
    const exploits = {
        'fingerprint': 'ScriptWare',
        'syn-user-identifier': 'Synapse X',
        'proto-user-identifier': 'ProtoSmasher',
        'shadow_hardware': 'Shadow',
        'krnl-hwid': 'KRNL',
        'sentinel-fingerprint': 'Sentinel',
        'exploit-guid': 'Sirhurt'
    };
    let exploit;
    let exploit2;
    for (const header of allowedHeaders) {
        if (req.headers[header]) {
            exploit = req.headers[header];
			exploit2 = header;
        };
    };
    if (!exploit) {
        sendincorrect();
        return;
    };
    if (req.headers.logintoken === undefined) {sendincorrect(); return;};
    if (req.headers.clientuuid === undefined) {sendincorrect(); return;};
    MongoClient.connect(uri, function(err, client) {
        if (err) throw err;
        var dbo = client.db(databasename).collection(collectionname).find({ id: req.headers.logintoken }).toArray(function(err, result) {
            if (err) throw err;
            if (result[0] === undefined) {
                res.send("Incorrect Login TOKEN!");
            }else{
                if (result[0]["whitelist_client"][0][1] === req.headers.clientuuid){
                    console.log(exploit2);
                    if (result[0]["whitelist_client"][0][2] === exploit){
                        res.send("Correct!");
                    }else{
                        res.send("Incorrect Exploit UUID!");
                    };
                }else{
                    res.send("Incorrect Client UUID!");
                };
            };
        });
    });
});

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});

/*/MongoClient.connect(uri, function(err, client) {
    if (err) throw err;
    var dbo = client.db(databasename).collection(collectionname).find({ name: "john doe2" }).toArray(function(err, result) {
        if (err) throw err;
        if (result[0] === undefined){
            MongoClient.connect(uri, function(err, client) {
                if (err) throw err;
                var dbo = client.db(databasename).collection(collectionname).insertOne({name: "john doe2", age: "25"}, function(err, res) {
                    if (err) throw err;
                    console.log("1 document inserted");
                    client.close();
                });
            });
        }else{
            console.log("User already exists");
        };
        client.close();
    });
});/*/