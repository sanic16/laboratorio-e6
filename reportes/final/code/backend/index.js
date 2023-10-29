const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const cors = require('cors')
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({server})
const { MongoClient } = require('mongodb');


// Use the cors middleware with default options (allows all origins)
app.use(cors())

const port = process.env.PORT || 5000;

// Initialize MongoDB connection
let db;
const mongoURL = "mongodb+srv://julio:borden16@testing.zvaswda.mongodb.net/apli2?retryWrites=true&w=majority";


// Create a new collection for LED status in MongoDB
let ledStatusCollection;

async function connectToMongoDB() {
  try {
    const client = new MongoClient(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db("apli2");
    ledStatusCollection = db.collection("led_status"); // Add this line to create the collection instance
    chartCollection = db.collection("charts"); // Add this line to create the collection instance
    console.log("Connected to MongoDB successfully!!!");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
}

connectToMongoDB();

wss.on('connection', (ws)=>{
  console.log('WebSocket connection established')

  // Send real-time data updates to clients
  const sendChartData = async () => {
    try {
      const chartData = await chartCollection
      .find()
      .sort({timestamp: -1})
      .limit(1)
      .toArray();

      // Send the chart data to the connected WebSocket clients as JSON
      ws.send(JSON.stringify(chartData));
    }catch(error){
      console.error(`Error: ${error.code}`);
    }
  }

  // Trigger the sendChartData function every 50 ms
  sendChartData()
  const interval = setInterval(sendChartData, 50);

  // Handle WebSocket client disconnect
  ws.on('close', ()=>{
    clearInterval(interval)
    console.log('WebSocket connection closed')
  })
})

// // Start the HTTP server
// server.listen(8080, '0.0.0.0', ()=>{
//   console.log('Listening on port 8080')
// } )

server.listen(port, ()=>{
  console.log(`Listening on port ${port}`)
})