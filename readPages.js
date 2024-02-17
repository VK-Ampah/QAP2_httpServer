const fs = require('fs');
const http = require('http');
const uuid = require('uuid');


// function to read the content of the file and return the response to client

// pass an optional weather parameter to the function to read weather data on home page

const readFileContent = (file,res,req,logger, weather = null) => {
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
        if (weather) {
            // weather = JSON.stringify(weather, null, 2);
            
            res.write(`<p><b>City:</b> ${weather.name}</p>`);
            res.write(`<p><b>Weather description:</b> ${JSON.stringify(weather.weather,null,4)}</p>`);
            res.write(`<p><b>Main:</b> ${JSON.stringify(weather.main,null,4)}</p>`);
            res.write(`<p><b>Visibility:</b> ${weather.visibility}</p>`);
            res.write(`<p><b>Wind:</b> ${JSON.stringify(weather.wind, null, 4)}</p>`);
            res.write(`<p><b>Clouds:</b> ${JSON.stringify(weather.clouds, null, 4)}</p>`);
          }
        res.end();
      }
    });
}

    // module.exports = readFileContent;
module.exports = { readFileContent }; //This will export the log function to be used in other files





