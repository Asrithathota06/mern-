const http = require("http");
const os = require("os");
const path = require("path");
const EventEmitter = require("events");

// Create event system
const myEvent = new EventEmitter();

// Event listener
myEvent.on("requestMade", (route) => {
    console.log(`📡 Event: Request made to ${route}`);
});

// Create HTTP server
const server = http.createServer((req, res) => {

    // Trigger event
    myEvent.emit("requestMade", req.url);

    res.writeHead(200, { "Content-Type": "text/plain" });

    if (req.url === "/") {

        res.end(
            "🔥 Welcome!\n\n" +
            "Use /info for system info 😏\n" +
            "Use /path for path demo 📁"
        );

    } 
    else if (req.url === "/info") {

        res.end(
            `💻 OS Type: ${os.type()}\n` +
            `🧠 CPU: ${os.arch()}\n` +
            `📦 Total Memory: ${os.totalmem()}\n` +
            `🆓 Free Memory: ${os.freemem()}\n` +
            `⏱ Uptime: ${os.uptime()} sec`
        );

    } 
    else if (req.url === "/path") {

        const samplePath = "/users/admin/docs/file.txt";

        res.end(
            `📄 File Name: ${path.basename(samplePath)}\n` +
            `📁 Directory: ${path.dirname(samplePath)}\n` +
            `📌 Extension: ${path.extname(samplePath)}\n` +
            `🔗 Joined Path: ${path.join("folder", "sub", "file.txt")}`
        );

    } 
    else {
        res.writeHead(404);
        res.end("💀 Route not found");
    }
});

// Start server
server.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});