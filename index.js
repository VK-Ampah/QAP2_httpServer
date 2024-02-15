const http = require('http');
// const fs = require('fs');
// const path = require('path');


const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/about':
            res.write('About page');
            console.log('About page');
            break;
        case '/contact':
            res.write('Contact page');
            console.log('Contact page');
            break;
        case '/products':
            res.write('Products page');
            console.log('Products page');
            break;
        case '/subscribe':
            res.write('Subscribe page');
            console.log('Subscribe page');
            break;
        case '/':
            res.write('Home page');
            console.log('Home page');
            break;
        default:
            res.write('Not Found');
    }
    res.end();
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

 

