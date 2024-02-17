const http = require('http');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
// function to read the content of the file and return the response to client
const readFileContent = require('./readPages').readFileContent;

const PORT = 3000;
const HOST = 'localhost';
const Logger = require('./logging');// this logger class extends the event emitter class
const logger = new Logger();

//Register an event listener to listen for file read
logger.on('fileRead', (args)=>{
    console.log('File is read');
    logger.log(args);
    
})
//
//Register an event listener to listen for file error event
logger.on('fileError', (args)=>{
    console.log('File error');
    logger.log(args);
  
})


let eventId = uuid.v4();
let baseDir = path.join(__dirname, './views/');
// console.log(baseDir);

// create a server object with multi routes
const server = http.createServer((req, res) => {
  // let eventMeataData;
  let file;  
  switch (req.url) {

      case '/about':
        file = baseDir + 'about.html';
        // console.log(file)
        readFileContent(file, res,req, logger);
        console.log('about page')
        break;       
      case '/contact':       
        readFileContent(baseDir + 'contact.html', res,req, logger);
        console.log('contact page')
        break;
      case '/products':
        readFileContent(baseDir + 'products.html', res,req, logger);
        console.log('product page')
        break;
      case '/subscribe':
        readFileContent(baseDir + 'subscribe.html', res,req, logger);
        console.log('subscribe page')
        break;
      case '/':
        readFileContent(baseDir + 'index.html', res, req,logger);
        console.log('home page')
        break;
      default:
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('404 Page Not Found');
        res.end();
        console.log('404 Page Not Found');
        break;    
  }
});


    // can use the server.on method to handle that event server.on('request', (req, res) => {
// if the server encounters an error (if the port is already in use), the error event will be emitted
// and retries to listen on the same port after 1 second, 
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error('Address in use, retrying...');
    setTimeout(() => {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  }
});

// the listen method is used to listen for incoming requests and is an event emitter
// everytie there is a new request, the server will emit an event
// can use the server.on method to handle that event server.on('request', (req, res) => {
server.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});

 

