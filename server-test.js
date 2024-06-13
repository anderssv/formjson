const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
    console.log('--- REQUEST ---');
    res.header('Access-Control-Allow-Origin', '*'); // Adjust the origin as needed
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Expose-Headers', 'Location'); // Expose the Location header
    next();
});

app.post('/response', (req, res) => {
    console.log('--- POST ---');
    console.log(req.body);
    res.send('<html><body><h1>Hello World from server!!!</h1></body></html>');
});

app.post('/redirect', (req, res) => {
    console.log('--- POST ---');
    console.log(req.body);
    res.redirect('/redirect2');
});

app.get('/redirect2', (req, res) => {
    console.log('--- GET ---');
    console.log(req.query);
    res.send('<html><body><h1>Hello World from server after redirect!!!</h1></body></html>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});