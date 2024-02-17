const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
// const emitter = new EventEmitter();

// function log(message) {
//   console.log(message);

//     // Raise an event
//   emitter.emit('messageLogged', { id: 1, url: 'http://' }); //This will raise the event and call the listener
// }

// crreatiunfg a class to extend event emiiter instead of using the function above
class Logger extends EventEmitter {
    // create a constructor to initialize the log directory and inherit the event emitter class
    constructor() {
        super();
        this.logDirectory = path.join(__dirname, 'logs');
        if (!fs.existsSync(this.logDirectory)) {
            fs.mkdirSync(this.logDirectory);
        }
    }

    // create method to log daily messages to the console and create daily log files

    log(eventMeataData) {
        console.log(eventMeataData);
        // const eventId = uuid.v4();
    
        // Get today's date in YYYY-MM-DD format
        const date = new Date();
        const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const dateYear = `${date.getFullYear()}`;
        const dateMonth = date.toLocaleString('default', { month: 'long' }).slice(0, 3); // Get the first three letters of the month name
    
        // Create a log subfolder path with current YEAR value of current data as folder name in the log directory
        const logYearSubfolderPath = path.join(this.logDirectory, dateYear);
    
        // Create the year subfolder if it doesn't exist
        if (!fs.existsSync(logYearSubfolderPath)) {
            fs.mkdirSync(logYearSubfolderPath);
        }
    
        // Create a log subfolder path with current MONTH name of current data as folder name in the year subfolder
        const logMonthSubfolderPath = path.join(logYearSubfolderPath, dateMonth);
    
        // Create the month subfolder if it doesn't exist
        if (!fs.existsSync(logMonthSubfolderPath)) {
            fs.mkdirSync(logMonthSubfolderPath);
        }
    
        // Create a log file path using the current date as file name the month subfolder as its root
        const logFilePath = path.join(logMonthSubfolderPath, `${dateString}.log`);
    
        // If the log file doesn't exist, create it and write the headers for readability
        if (!fs.existsSync(logFilePath)) {
            fs.writeFileSync(logFilePath, 'Event ID, Timestamp, Method, Url, StatusCode, StatusMessage \n');
        }
    
        // Append the events to the daily log file

        fs.appendFile(logFilePath, `${eventMeataData.id}, ${new Date().toISOString()}, ${eventMeataData.method}, ${eventMeataData.url},  ${eventMeataData.statusCode}, ${eventMeataData.statusMessage}\n`, err => {
            if (err) {
                console.error('Failed to write to log file:', err);
            }
        });

    }
}

// module.exports = log; //This will export the log function to be used in other files
module.exports = Logger; //This will export the log function to be used in other files