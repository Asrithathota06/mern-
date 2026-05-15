const http = require('http');
const os = require('os');
const path = require('path');
const EventEmitter = require('events');

const event = new EventEmitter();

const server = http.createServer((req, res) => {

    event.emit('requestMade');

    if (req.url === '/') {

        res.writeHead(200, { 'Content-Type': 'text/plain' });

        res.end("Home Page");

    } 
    else if (req.url === '/system') {

        res.writeHead(200, { 'Content-Type': 'text/plain' });

        const osInfo = `
OS_INFO: ${os.type()}
OS_PLATFORM: ${os.platform()}
OS_CPU_ARCH: ${os.arch()}
OS_FREE_MEMORY: ${os.freemem()}
OS_TOTAL_MEMORY: ${os.totalmem()}
`;

        const file_path = path.join(__dirname, 'server.js');

        res.end(
            "SYSTEM INFORMATION\n\n" +
            osInfo +
            "\nPath Info\n" +
            "Working Directory: " + file_path
        );

    } 
    else {

        res.writeHead(404, { 'Content-Type': 'text/plain' });

        res.end("Page Not Found");
    }
});

event.on('requestMade', () => {
    console.log("Request Made to Server");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});