// src/components/ChartSection.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const ChartSection = () => {
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState('TIME_SERIES_INTRADAY');
  const [interval, setInterval] = useState('5min');
  const API_KEY = '2IJPO2K5OD5LHUBV'; // Replace with your Alpha Vantage API key

  useEffect(() => {
    axios.get(`https://www.alphavantage.co/query?function=${timeRange}&symbol=SPY&interval=${interval}&apikey=${API_KEY}`)
      .then(response => {
        const timeSeries = response.data['Time Series (5min)'];
        const formattedData = Object.keys(timeSeries).map(time => ({
          date: time,
          value: parseFloat(timeSeries[time]['4. close'])
        }));
        setData(formattedData);
      })
      .catch(error => console.error(error));
  }, [timeRange, interval]);

  return (
    <Card style={{ marginBottom: '20px', background: '#444', color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" style={{ textAlign: 'left' }}>
          SPDR S&P 500 ETF Trust
        </Typography>
        <div className="time-range-buttons">
          {['1D', '1W', '1M', '3M', '1Y', 'All'].map(range => (
            <button key={range} onClick={() => {
              setTimeRange(range === '1D' ? 'TIME_SERIES_INTRADAY' : 'TIME_SERIES_DAILY');
              setInterval(range === '1D' ? '5min' : 'daily');
            }}>
              {range}
            </button>
          ))}
        </div>
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#ffffff" />
          <Line type="monotone" dataKey="value" stroke="#ffeb3b" />
        </LineChart>
      </CardContent>
    </Card>
  );
};

export default ChartSection;
