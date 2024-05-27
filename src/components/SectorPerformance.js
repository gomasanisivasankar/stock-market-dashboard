import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography,Box} from '@mui/material';

const SectorPerformance = () => {
  const [sectors, setSectors] = useState([]);
  const API_KEY = 'LS9PfM3JYjposwzxSgtfIpx83ARsKsRf'; // Replace with your Financial Modeling Prep API key

  useEffect(() => {
    axios.get(`https://financialmodelingprep.com/api/v3/sectors-performance?apikey=${API_KEY}`)
      .then(response => {
        const formattedSectors = response.data.map(sector => ({
          name: sector.sector,
          change: parseFloat(sector.changesPercentage)
        }));
        setSectors(formattedSectors);
      })
      .catch(error => console.error(error));
  }, []);

  // Calculate total percentage change
  const totalChange = sectors.reduce((acc, sector) => acc + sector.change, 0);

  // Split the sectors into two parts
  const halfIndex = Math.floor(sectors.length / 2);
  const firstHalf = sectors.slice(0, halfIndex);
  const secondHalf = sectors.slice(halfIndex);

  return (
    <Card style={{ marginBottom: '20px', background: '#444', color: '#fff' }}>
      <CardContent>
        <Typography variant="h6" style={{ textAlign: 'left' }}>
          Sector Performance
        </Typography>
        <Typography variant="h6" style={{ marginBottom: '35px', display: 'flex', justifyContent: 'space-between',fontSize:"10px", color:"gray" }}>
          <span></span>
          <span>% price change</span>
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ul style={{ padding: 0, margin: 0, listStyleType: 'none' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', width: '250px', marginBottom:'20px'}} >
              <span>All Sector</span>
              <span>{totalChange.toFixed(2)}%</span>
            </li>
            {firstHalf.map(sector => (
              <li key={sector.name} style={{ display: 'flex', justifyContent: 'space-between', width: '250px', marginBottom:'20px'}}>
                <span>{sector.name}</span>
                <span style={{ color: sector.change > 0 ? 'green' : 'red',  backgroundColor:'radial-gradient(circle, rgba(0,0,0,1) 33%, rgba(144,238,171,0.8463760504201681) 100%);'}}>{sector.change.toFixed(2)}%</span>
              </li>
            ))}
          </ul>
          <ul style={{ padding: 0, margin: 0, listStyleType: 'none' }}>
            {secondHalf.map(sector => (
              <li key={sector.name} style={{ display: 'flex', justifyContent: 'space-between', width: '250px', marginBottom:'20px' }}>
                <span>{sector.name}</span>
                <span style={{ color: sector.change > 0 ? 'green' : 'red' }}>{sector.change.toFixed(2)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SectorPerformance;
