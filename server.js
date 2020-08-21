const express = require('express')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const child_process = require('child_process');

const app = express()

app.use(express.json());

app.post('/render', (req, res) => {
    var requestId = uuidv4();

    mermaidData = req.body.data;

    try {
        fs.writeFileSync(`inputs/${requestId}`, mermaidData);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }

    try {
        child_process.execSync(`mmdc -i inputs/${requestId} -o outputs/${requestId}.png -p puppeteer-config.json`);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
    
    res.send(`outputs/${requestId}.png`);
});

app.use(express.static('static'));
app.use('/outputs', express.static('outputs'));

app.listen(3000, () => {
    console.log("Server listening")
});
