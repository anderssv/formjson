const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: true }));

function responseHtml(title, formData) {
    return `<html><body><h1>${title}</h1><p>Form data JSON: <code>${formData}</code></p></body></html>`;
}

app.post('/response', (req, res) => {
    console.log('--- POST ---');
    console.log(req.body._fjson);
    res.send(responseHtml('Hello World from server', req.body._fjson));
});

app.post('/redirect', (req, res) => {
    console.log('--- POST ---');
    console.log(req.body._fjson);
    res.redirect('/redirect-result');
});

app.get('/redirect-result', (req, res) => {
    console.log('--- GET ---');
    res.send(responseHtml('Redirected to /redirect-result', 'GET so no form data'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});