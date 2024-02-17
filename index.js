const http = require('http');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const weather = require('openweather-apis');
// function to read the content of the file and return the response to client
const readFileContent = require('./readPages').readFileContent;

const PORT = 3000;
const HOST = 'localhost';
const Logger = require('./logging');// this logger class extends the event emitter class
const logger = new Logger();

// set the parameters for the weather api for St Johns, CA
weather.setLang('en');
weather.setCity('St. Johns, CA');
weather.setUnits('metric');
weather.setAPPID('f77ee3fe25588bcfe0b6eab6ec3f3af6');

weather.getAllWeather(function(err, data){
    console.log('Displaying weather data for St. Johns, CA:\n');
    console.log(data);
});

//Register an event listener to listen for file read and log event details to the console and log file
logger.on('fileRead', (args)=>{
    console.log('File read successfully');
    logger.log(args);
    
})

//Register an event listener to listen for error when reading file and log event details to the console and log file
logger.on('fileError', (args)=>{
    console.log('Error reading file');
    logger.log(args);
  
})

// set base directory for the views
let baseDir = path.join(__dirname, './views/');
// console.log(baseDir);

// create a server object with multi routes
const server = http.createServer((req, res) => {
  // let eventMeataData;
  let file;  
  switch (req.url) {
      case '/':
        // Get data from weather api AND PASS IT TO THE readFileContent FUNCTION to write to the response
        weather.getAllWeather(function(err, data){
          if (err){console.log(err); return;}
          readFileContent(baseDir + 'index.html', res, req,logger, data);         
          // console.log(data);
      });       
        console.log('home page')
        break;
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

 

