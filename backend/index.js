const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({server})

app.use(cors())

const port = process.env.PORT || 5000;

wss.on('connection', ws => {
    console.log('WebSocket connection established')

    // Send real-time sine wvae data to clients

    const sendSinData = () => {
        const currentTime = new Date().getTime()
        const sinValue = Math.sin(currentTime / 1000); // Generate a sine wave

        // Send the sine wave value to the connected WebSocket clients as JSON
        ws.send(JSON.stringify({ timestamp: currentTime, sensor1: sinValue*500 + 500 }));
    };

    // Trigger the sendSinData function every 50 ms
    sendSinData()
    const interval = setInterval(sendSinData, 50)

    // Handle WebSocket client disconnect
    ws.on('close', () => {
        clearInterval(interval)
        console.log('WebSocket connection closed')
    })

})


server.listen(port, ()=>{
    console.log('Listening on port ${port}')
})