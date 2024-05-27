// src/components/MarketsAndChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Box ,TableCell,TableRow} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

const MarketsAndChart = () => {
  const [markets, setMarkets] = useState([]);
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState('TIME_SERIES_INTRADAY');
  const [interval, setInterval] = useState('5min');
  const API_KEY_MARKET = 'LS9PfM3JYjposwzxSgtfIpx83ARsKsRf'; // Replace with your Financial Modeling Prep API key
  const API_KEY_CHART = '2IJPO2K5OD5LHUBV'; // Replace with your Alpha Vantage API key

  useEffect(() => {
    // Fetch market data
    // Use dummy data for markets
    const dummyMarkets = [
        { symbol: 'S&P 500',   price: 498.84,   change: +4.78,  changesPercentage:+ 0.96 },
        { symbol: 'Nasdaq',    price: 433.36,   change: +4.80,  changesPercentage: +1.12 },
        { symbol: 'Dow Jones', price: 346.78,   change: +2.45,  changesPercentage: +0.71 },
        { symbol: 'Gold',      price: 1850.00,  change: -5.50,  changesPercentage: -0.30 },
        { symbol: 'Silver',    price: 25.60,    change: +0.20,  changesPercentage: +0.79 },
        { symbol: 'Bitcoin',   price: 35000.00, change: -5.00,  changesPercentage: -1.41 },
      ];
      setMarkets(dummyMarkets);
      const dummyChartData = {
  '1D': [
    { date: '2024-05-28 09:30:00', value: 420.14 },
    { date: '2024-05-28 09:35:00', value: 500.08 },
    { date: '2024-05-28 09:40:00', value: 200.56 },
    { date: '2024-05-28 09:30:00', value: 450.14 },
    { date: '2024-05-28 09:35:00', value: 600.08 },
    { date: '2024-05-28 09:40:00', value: 800.56 },
    { date: '2024-05-28 09:30:00', value: 700.14 },
    { date: '2024-05-28 09:35:00', value: 422.08 },
    { date: '2024-05-28 09:40:00', value: 421.56 },
    // Add more data points as needed
  ],
  '1W': [
    { date: '2024-05-21 09:30:00', value: 410.14 },
    { date: '2024-05-22 09:30:00', value: 600.08 },
    { date: '2024-05-23 09:30:00', value: 200.56 },
    // Add more data points as needed
  ],
  '1M': [
    { date: '2024-04-28 09:30:00', value: 400.14 },
    { date: '2024-04-29 09:30:00', value: 405.08 },
    { date: '2024-04-30 09:30:00', value: 410.56 },
    // Add more data points as needed
  ],
  '3M': [
    { date: '2024-03-01 09:30:00', value: 380.14 },
    { date: '2024-03-02 09:30:00', value: 385.08 },
    { date: '2024-03-03 09:30:00', value: 390.56 },
    // Add more data points as needed
  ],
  '1Y': [
    { date: '2023-05-28 09:30:00', value: 320.14 },
    { date: '2023-05-29 09:30:00', value: 325.08 },
    { date: '2023-05-30 09:30:00', value: 330.56 },
    // Add more data points as needed
  ],
  'All': [
    // Data for all time, can be the same as 1Y or more detailed
  ],
};

const dummyChartDataForRange = dummyChartData['1D'];
setData(dummyChartDataForRange || []);

    axios.get(`https://financialmodelingprep.com/api/v3/quote/^GSPC,^IXIC,^DJI,CL=F,GC=F,SI=F,BTC-USD?apikey=${API_KEY_MARKET}`)
      .then(response => {
        setMarkets(response.data);
      })
      .catch(error => console.error(error));
    
    // Fetch chart data
    axios.get(`https://www.alphavantage.co/query?function=${timeRange}&symbol=SPY&interval=${interval}&apikey=${API_KEY_CHART}`)
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
        <Box display="flex" flexDirection="row" justifyContent="space-between" marginLeft='50px' marginTop='30px'>
          <Box flex={1} mr={2}>
          {markets.map(market => (
                <TableRow key={market.symbol}>
                  <TableCell>{market.symbol}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>{market.price}</TableCell>
                  <TableCell></TableCell>
                  <TableCell style={{ color: market.change > 0 ? 'green' : 'red' }}>{market.change}</TableCell>
                  <TableCell></TableCell>
                  <TableCell style={{ color: market.change > 0 ? 'green' : 'red' }}>
            <Box
            style={market.changesPercentage>0?{
              backgroundColor: 'lightgreen',
              borderRadius: '2px',
              padding: '5px 10px',
              marginRight: '20px',
              display: 'flex',
              alignItems: 'center'
            } :{
              backgroundColor: '#da6969',
              borderRadius: '2px',
              padding: '5px 10px',
              marginRight: '20px',
              display: 'flex',
              alignItems: 'center'
            } }>{market.changesPercentage}%</Box></TableCell>
                </TableRow>
              ))}
          </Box>
          <Box flex={1}>
            <Typography style={{display:'flex',flexDirection:'column'}}>
            <Typography variant="h6" style={{ textAlign: 'left' }}>
              SPDR S&P 500 ETF Trust<KeyboardArrowRightOutlinedIcon style={{marginBottom:"-5px"}}/>
            </Typography>
            <Typography style={{color:'gray',textAlign: 'left'}}>
                498.08
            </Typography>
            </Typography>
            <LineChart width={600} height={300} data={data} hide={true}>
            
              <XAxis dataKey="date" hide={true} />
              <YAxis hide={true} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="yellow" dot={true} />
              <Line type="monotone" dataKey="value" stroke="white" dot={true} />

            </LineChart>
            <div className="time-range-buttons" style={{ marginTop: '10px', textAlign: 'center' }}>
              {['1D', '1W', '1M', '3M', '1Y', 'All'].map(range => (
                <button key={range} onClick={() => {
                  setTimeRange(range === '1D' ? 'TIME_SERIES_INTRADAY' : 'TIME_SERIES_DAILY');
                  setInterval(range === '1D' ? '5min' : 'daily');
                }}>
                  {range}
                </button>
              ))}
            </div>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MarketsAndChart;
