const mqtt = require('mqtt');
const fs = require('fs');
const { format } = require('date-fns');
const { MongoClient } = require('mongodb');

// MQTT credentials
const mqttHost = "mqtt://23.22.94.118";
const mqttUser = "julio";
const mqttPassword = "borden16";
const mqttTopic = "#";

// MongoDB credentials
const mongoURL = "mongodb+srv://julio:borden16@testing.zvaswda.mongodb.net/?retryWrites=true&w=majority"; // Update with your MongoDB connection URL
const dbName = "apli2"; // Update with your database name
const collectionName = "charts"; // Update with your collection name

// Create a new MQTT client.
const mqttClient = mqtt.connect(mqttHost, {
    username: mqttUser,
    password: mqttPassword
});

// Initialize MongoDB connection
let db;

// Create a function to establish MongoDB connection
async function connectToMongoDB() {
    try {
        const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to MongoDB successfully!!!");
    } catch (error) {
        console.error("Could not connect to MongoDB:", error);
    }
}

// Function to log MQTT messages to MongoDB
async function logToMongoDB(topic, message) {
    if (!db) {
        console.error("MongoDB connection is not established.");
        return;
    }

    const timeStamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logEntry = {
        timestamp: timeStamp,
        sensor1: message.toString(), // Replace with the appropriate sensor data
    };

    const collection = db.collection(collectionName);
    try {
        await collection.insertOne(logEntry);
        // console.log('Message logged to MongoDB');
    } catch (err) {
        console.error('Error logging message to MongoDB:', err);
    }
}

// MQTT callback functions
mqttClient.on('connect', () => {
    console.log('MQTT client connected');
    mqttClient.subscribe(mqttTopic);
});

mqttClient.on('message', (topic, message) => {
    // This callback will be called whenever the client receives a message.
    // console.log(`Received message: ${message.toString()} from topic: ${topic}`);

    // Write the message to a file (optional)
    // const timeStamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // const logMessage = `${timeStamp} - ${message.toString()}\n`;
    // fs.appendFile('mqtt.log', logMessage, (err) => {
    //     if (err) throw err;
    //     // console.log('The message was appended to file!')
    // });

    // Log the message to MongoDB
    logToMongoDB(topic, message);
});

mqttClient.on('error', (err) => {
    console.log(err);
});

// Connect to MongoDB when the script starts
connectToMongoDB();


