const express = require('express')

const app = express()

app.get('/render', (req, res) => {
    res.send('Hi');
});

app.use(express.static('static'));

app.listen(3000, () => {
    console.log("Server listening")
});
