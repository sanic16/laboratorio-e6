const express = require('express')
const http = require('http')
const {Server: SocketServer} = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: '*',
    }
})

let mqtt_msg = ''

server.listen(3000, () => {
    console.log('Server running on port 3000')
})

const mqtt = require('mqtt')

// Define the MQTT broker URL and port
const brokerUrl = '23.22.94.118'
const brokerPort = 1883

// MQTT broker credentials (if required)
const username = 'julio'
const password = 'borden16'


// Create an MQTT client instance
const client = mqtt.connect({
    host: brokerUrl, 
    port: brokerPort,
    username: username,
    password: password
})


// Subscribe to a topic
const topic = 'e6'
client.subscribe(topic, (error) => {
    if(!error){
        console.log(`Subscribed to topic: ${topic}`)
    }else{
        console.log(`Failed to subscribe to topic: ${topic}`)
    }
})

// Subscribe to another topic
const topic2 = 'leds'
client.subscribe(topic2, (error) => {
    if(!error){
        console.log(`Subscribed to topic: ${topic2}`)
    }else{
        console.log(`Failed to subscribe to topic: ${topic2} `)
    }
})

// Handle incoming messages
client.on('message', (receivedTopic, message) => {
    console.log(`Received message on topic ${receivedTopic}: ${message.toString()}`)
    if(receivedTopic === topic){
        mqtt_msg = message.toString()
        io.emit('message', {data: mqtt_msg, from: 'server'})
    }
})


// Handle connection events
client.on('connect', () => {
    console.log('Connected to MQTT broker')
})

client.on('error', (error) => {
    console.error('MQTT client error: ${error')
})

// Handle disconnection events
client.on('close', () => {
    console.log(`Disconnected from MQTT broker`)
})

// Handle graceful shutdown
process.on('SIGINT', () =>{
    console.log('Disconnecting from MQTT broker')
    client.end(() => process.exit(0))
})

io.on('connection', socket => {
    console.log('Client connected ', socket.id)


})
