const fs = require('fs');
const http = require('http');
const uuid = require('uuid');


// function to read the content of the file and return the response to client

const readFileContent = (file,res,req,logger) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        res.statusCode = 500;
        const  eventMeataData = {
            id: uuid.v4(),
            url: req.url,
            method: req.method,
            statusCode: res.statusCode,
            statusMessage: http.STATUS_CODES[res.statusCode],
        };
        logger.emit('fileError', eventMeataData);
        res.end("Error reading file");
        return;      
      }
      else{
        res.statusCode = 200;
        const eventMeataData = {
            id: uuid.v4(),
            url: req.url,
            method: req.method,
            statusCode: res.statusCode,
            statusMessage: http.STATUS_CODES[res.statusCode],
            };
        logger.emit('fileRead', eventMeataData);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      }
    });
}

    // module.exports = readFileContent;
module.exports = { readFileContent }; //This will export the log function to be used in other files





