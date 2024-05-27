import React from 'react';
import { AppBar, Toolbar, Typography, Box, useMediaQuery } from '@mui/material';
import { format } from 'date-fns';
import SearchIcon from '@mui/icons-material/Search';
import DvrIcon from '@mui/icons-material/Dvr';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Header = () => {
  const userName = 'Jane'; // This can be dynamically fetched or passed as a prop
  const currentDate = format(new Date(), 'eeee, MMMM yyyy');
  const isBelow600 = useMediaQuery('(max-width:600px)');

  return (
    <AppBar position="static" style={{ background: '#333' }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6">
            Hello, {userName}
          </Typography>
          <Typography variant="body2">
            {currentDate}
          </Typography>
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          {!isBelow600 && (
            <>
              <Box
                style={{
                  backgroundColor: '#555',
                  borderRadius: '20px',
                  padding: '5px 10px',
                  marginRight: '20px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <AccountCircleOutlinedIcon style={{ marginRight: '5px' }} />
                <Typography variant="h6" style={{ color: '#fff' }}>For you</Typography>
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
              >
                <DvrIcon style={{ marginRight: '5px' }} />
                <Typography variant="h6" style={{ color: '#fff' }}>Screener</Typography>
              </Box>
            </>
          )}
          {!isBelow600 && (
            <Box
              style={{
                backgroundColor: '#555',
                borderRadius: '20px',
                padding: '5px 10px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <SearchIcon />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
