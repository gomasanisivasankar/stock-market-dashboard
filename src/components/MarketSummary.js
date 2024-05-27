// src/components/MarketSummary.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography,Box } from '@mui/material';
import CallMadeRoundedIcon from '@mui/icons-material/CallMadeRounded';
const MarketSummary = () => {
  const [sentiment, setSentiment] = useState('');
  const [headline, setHeadline] = useState('');
  const API_KEY = '2IJPO2K5OD5LHUBV'; // Replace with your Alpha Vantage API key
  

  useEffect(() => {
    const fetchMarketSummary = async () => {
      try {
        // Fetch news data from Alpha Vantage
        const newsResponse = await axios.get(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=SPY&apikey=${API_KEY}`);
        const news = newsResponse.data.feed[0];
        setHeadline(news.title);

        // Fetch sentiment data (for example, assume the sentiment is included in the news feed)
        const sentimentResponse = newsResponse.data.feed[0].overall_sentiment_label;
        setSentiment(sentimentResponse === 'Positive' ? 'bullish' : 'bearish');
      } catch (error) {
        console.error('Error fetching market summary data:', error);
      }
    };

    fetchMarketSummary();
  }, []);

  return (
    <Card style={{ marginBottom: '20px', background: ' radial-gradient(circle, rgba(97,97,97,1) 33%, rgba(155,197,181,1) 100%)', color: '#fff' }}>
      <CardContent style={{ textAlign: 'left' }}>
      
      <Typography variant="h6" style={{ marginBottom: '5em', paddingLeft:"15px", display:'flex'}} >
      <Box
            style={{
              backgroundColor: '#555',
              borderRadius: '20px',
              padding: '5px 10px',
              marginRight: '20px',
              display: 'flex',
              alignItems: 'center'
            }}
          >The markets are <span style={{color:"green", marginTop:"4px", marginLeft:'5px'}}>bullish</span>
         
         </Box> 
         <Box
            style={{
              backgroundColor: '#555',
              borderRadius: '20px',
              padding: '5px 10px',
              marginRight: '20px',
              display: 'flex',
              alignItems: 'center'
            }}
          ><CallMadeRoundedIcon/></Box>
         
         {/* {sentiment} */}
        </Typography>
        
        <Typography variant='p' style={{paddingLeft:"15px",color:'gray'}}>
        what you need to know today
        </Typography>
        <br/>
        <Typography variant="h4" style={{marginBottom:'12px',marginTop:"12px", paddingLeft:"15px"}}>
          {/* {headline} */}

          Jan Inflation Surges, Squeezing Budgets;S&P 500<br/>Rallies as Markets Face 'Bumpy'2% Path
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MarketSummary;
