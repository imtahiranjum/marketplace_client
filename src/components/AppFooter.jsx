import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { TextField, Typography } from '@mui/material';
import facebookLogo from "../assets/facebook.png"
import instaLogo from "../assets/insta.png"
// import Typography from '../components/Typography';
// import TextField from '../components/TextField';

function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="/">
        eFarm
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  mr: 1,
  '&:hover': {
    // bgcolor: 'success.dark',
  },
};

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
];

export default function AppFooter() {
  return (
    <Typography
    component="footer"
    sx={{ display: 'flex', bgcolor: 'secondary.light' }}
    >
      <br/>
      <Container sx={{ my: 8, display: 'flex' }}>
        <Grid container spacing={5}>
          <Grid item xs={6} sm={4} md={3}>
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              spacing={2}
              sx={{ height: 120 }}
            >
              <Grid item sx={{ display: 'flex' }}>
                <Box component="a" href="https://facebook.com/imtahiranjum" sx={iconStyle}
                >
                  <img
                    width= "48"
                    height= "48"              
                    src={facebookLogo}
                    alt="Facebook Logo"
                  />
                </Box>
                <Box component="a" href="https://instagram.com/tahir_anjum" sx={iconStyle} > 
                  <img
                    width= "48"
                    height= "48"
                    src={instaLogo}
                    alt="Instagram Logo"
                  />
                </Box>
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} md={2}>
            <Typography variant="h6" marked="left" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/">Terms</Link>
              </Box>
              <Box component="li" sx={{ py: 0.5 }}>
                <Link href="/">Privacy</Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} sm={8} md={4}>
            <Typography variant="h6" marked="left" gutterBottom>
              Language
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <Typography variant="caption">
              {'All Rights Reserved © 2023'}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}
