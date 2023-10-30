import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  import React, { useState, useEffect } from "react";
  import { io } from "socket.io-client";
  import classes from '../styles/components/ChartJsExample.module.css'
  import { Line } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const length = 400
  const options = {
    scales: {
      y: {
        beginAtZero: true, // Start at zero
        min: 0, // Set a specific minimum value
        max: 1024, // Set a specific maximum value
      },
    },
  };
  
  const arrayWithZeros = new Array(length).fill(0);
  const arrayOfObjects = Array.from({length: length}, ()=>({
    timestamp: '-',
    sensor1: 0,
  }))
  const data = {
    labels: [...arrayWithZeros],
    datasets: [
      {
        label: "Sensor 1",
        data: [...arrayWithZeros],
        backgroundColor: "#2196f3",
        borderColor: "#2196f3",
        spanGaps:false
      },
      // {
      //   label: "Angular",
      //   data: [42, 20, 40, 50, 60, 70, 80],
      //   backgroundColor: "#ffeb3b",
      //   borderColor: "#ffeb3b",
      // },
      // {
      //   label: "Vue",
      //   data: [52, 30, 50, 60, 70, 80, 90],
      //   backgroundColor: "#4caf50",
      //   borderColor: "#4caf50",
      // },
    ],
  };
  
  let n = 0;
  
  const socket = io('ws://localhost:3000')
  
  // const socket = io('http://localhost:3000')
  function isValidInteger(value){
    return !isNaN(parseInt(value))
  }

  const ChartJsExample = () => {
    const [esp, setEsp] = useState(data);
    const [temp, setTemp] = useState(arrayOfObjects);
  
    // connect to websocket and reuse the connection
    useEffect(() => {
      wsConn = new WebSocket("ws://localhost:5000");
      // wsConn = new WebSocket("wss://apli2-websocket-7abce11f887c.herokuapp.com/");
      
      wsConn.onopen = () => {
        console.log("connected");
      };
  
      // close the connection when the component unmounts
      return () => {
        wsConn.close();
      };
    }, []);
  
    useEffect(() => {
      // const ws = new WebSocket("ws://192.168.1.3:8080");
  
      // ws.onopen = () => {
      //   console.log("connected");
      // };
  
      wsConn.onmessage = (event) => {
        // console.log(ev|ent)
        const resJson = JSON.parse(event.data);
        // Update chart data with new values
        // update if length is equal or greater than 1000 and push if not
        // Check if you want to delete the last 100 entries
        // console.log(temp.length);
        // console.log(resJson)
  
        if (temp.length >= length) {
          // Get the current length of esp
  
          const currentLength = temp.length;
          // Create a new array with the new data at the beginning and the remaining data
          let newData;
          newData = [resJson, ...temp.slice(0, currentLength - 1)];
          setTemp(newData);
          // Set the new data in the state while limiting the length to 5000
          setEsp({
            labels: temp.map((item) => item.timestamp),
            datasets: [
              {
                label: "Sensor 1",
                data: temp.map((item) => item.sensor1),
                backgroundColor: "#2196f3",
                borderColor: "#2196f3",
                spanGaps:false
              },
            ],
          });
        } else {
          // Append the new data to the existing data
          setTemp((prevEsp) => [...resJson, ...prevEsp]);
          setEsp({
            labels: temp.map((item) => item.timestamp),
            datasets: [
              {
                label: "Sensor 1",
                data: temp.map((item) => item.sensor1),
                backgroundColor: "#2196f3",
                borderColor: "#2196f3",
                spanGaps:false
              },
            ],
          });
        }
      };
  
      // ws.onclose = () => {
      //   console.log("WebSocket closed");
      // };
  
      // return () => {
      //   ws.close(); // Close WebSocket connection when the component unmounts
      // };
    }, [temp]); // Add esp as a dependency to react to changes in its length
  
    return (
      <div className={classes.chart}>
        <div>
          <Line data={esp} options={options} />
        </div>
      </div>
    );
  };
  
  export default ChartJsExample;
  