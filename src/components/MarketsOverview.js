// src/components/MarketsOverview.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

const MarketsOverview = () => {
  const [markets, setMarkets] = useState([]);
  const API_KEY = 'LS9PfM3JYjposwzxSgtfIpx83ARsKsRf'; // Replace with your API key

  useEffect(() => {
    axios.get(`https://financialmodelingprep.com/api/v3/quote/^GSPC,^IXIC,^DJI,CL=F,GC=F,SI=F,BTC-USD?apikey=${API_KEY}`)
      .then(response => {
        setMarkets(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <Card style={{ marginBottom: '20px', background: '#444', color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" style={{ textAlign: 'left' }}>
        
        </Typography>
        <ul>
          {markets.map(market => (
            <li key={market.symbol}>
              {market.symbol}: {market.price} ({market.change} / {market.changesPercentage}%)
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default MarketsOverview;
