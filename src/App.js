// src/App.js
import React from 'react';
import Header from './components/Header';
import MarketSummary from './components/MarketSummary';
import SectorPerformance from './components/SectorPerformance';
import MarketsAndChart from './components/MarketsAndChart';
import './App.css';
import { Grid } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Header userName="Jane" />
      <div style={{ padding: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MarketSummary />
          </Grid>
          <Grid item xs={12} md={6}>
            <SectorPerformance />
          </Grid>
          <Grid item xs={12}>
            <MarketsAndChart />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default App;
