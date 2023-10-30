// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import classes from "../styles/components/ChartJsExample.module.css";
// import { Line } from "react-chartjs-2";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis } from "recharts";

const length = 200;
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
const arrayOfObjects = Array.from({ length: length }, () => ({
  from: "-",
  data: 0,
}));
const data = {
  labels: [...arrayWithZeros],
  datasets: [
    {
      label: "Sensor 1",
      data: [...arrayWithZeros],
      backgroundColor: "#2196f3",
      borderColor: "#2196f3",
      spanGaps: false,
    },
  ],
};

let n = 0;

const socket = io("wss://lab-e6-c453eb9244e7.herokuapp.com");

// const socket = io('http://localhost:3000')
function isValidInteger(value) {
  return !isNaN(parseInt(value));
}

const ChartJsExample = () => {
  const [esp, setEsp] = useState(data);
  const [temp, setTemp] = useState(arrayOfObjects);
  const [message, setMessage] = useState({});

  useEffect(() => {
    socket.on("message", (message) => {
      receiveMessage(message);
    });
    console.log(esp);
  }, []);

  const receiveMessage = (message) => {
    setMessage(message);
  };

  useEffect(() => {
    // remove the first element of temp and add the new one to the end
    setTemp((prevTemp) => [message, ...prevTemp.slice(0, -1)]);
    console.log(temp);
  }, [message]);

  useEffect(() => {
    setEsp({
      labels: temp.map((item) => item.from),
      datasets: [
        {
          label: "Sensor 1",
          data: temp.map((item) => parseInt(item.data)),
          backgroundColor: "#2196f3",
          borderColor: "#2196f3",
          spanGaps: false,
        },
      ],
    });
  }, [temp]); // Add esp as a dependency to react to changes in its length

  return (
    <div className={classes.chart}>
      <div>
        <LineChart
          width={800}
          height={400}
          data={temp}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <XAxis dataKey="from" />
          <YAxis domain={[0, 1023]} />
          <Tooltip />
          <CartesianGrid stroke="#222" />
          <Line type="monotone" dataKey="data" stroke="#0000ff" yAxisId={0} />
        </LineChart>
      </div>
    </div>
  );
};

export default ChartJsExample;
