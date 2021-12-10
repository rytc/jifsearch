const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();

app.use(express.static(path.join(__dirname, 'public/')))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/getjifs', (req, res) => {
    fs.readFile(path.join(__dirname, "data", "savedjifs.json"), (err, data) => {
        res.json(JSON.parse(data));
    });
});

app.post('/savejif', (req, res) => {
    const dataPath = path.join(__dirname, "data", "savedjifs.json");
    fs.readFile(dataPath, (err, data) => {
        let jifList = JSON.parse(data);
        jifList.push(req.body.url);
        fs.writeFile(dataPath, JSON.stringify(jifList), err => {
            if(err) console.log('ERR DAGGUMIT ' + err);
        });
    });
    res.status(200);
});

app.post('/deletejif', (req, res) => {
    const dataPath = path.join(__dirname, "data", "savedjifs.json");
    fs.readFile(dataPath, (err, data) => {
        let jifList = JSON.parse(data);
        jifList.splice(req.body.id, 1);
        fs.writeFile(dataPath, JSON.stringify(jifList), err => {
            if(err) console.log('ERR DAGGUMIT ' + err);
        });
    });
    res.status(200);
});

app.listen(3000);