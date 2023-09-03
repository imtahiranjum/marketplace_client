// import { createTheme } from "@mui/material";

// export const themeSettings = (mode) =>
//   createTheme({
//     palette: {
//       mode: mode,
//       ...(mode === "dark"
//         ? {
//             palette: {
//               mode: "dark",
//               primary: {
//                 main: "#90caf9",
//               },
//               secondary: {
//                 main: "#dc5c5e",
//               },
//               background: {
//                 default: "#121212",
//                 paper: "#121212",
//               },
//             },
//           }
//         : {
//             palette: {
//               mode: "light",
//               primary: {
//                 main: "#1976d2",
//               },
//               secondary: {
//                 main: "#9c27b0",
//               },
//               background: {
//                 default: "#fff",
//                 paper: "#fff",
//               },
//             },
//           }),
//     },
//   });

import { createTheme } from '@mui/material/styles';
import { green, grey, red } from '@mui/material/colors';

export const themeSettings = createTheme({
  palette: {
    primary: {
      light: '#69696a',
      main: '#28282a',
      dark: '#1e1e1f',
    },
    secondary: {
      light: '#fff5f8',
      main: '#ff3366',
      dark: '#e62958',
    },
    warning: {
      main: '#ffc071',
      dark: '#ffb25e',
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700],
    },
    success: {
      light: green[50],
      main: green[500],
      dark: green[700],
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700, // Roboto Condensed
  },
});

const fontHeader = {
  color: themeSettings.palette.text.primary,
  fontWeight: themeSettings.typography.fontWeightMedium,
  fontFamily: "'Roboto Condensed', sans-serif",
  textTransform: 'uppercase',
};

const theme = {
  ...themeSettings,
  palette: {
    ...themeSettings.palette,
    background: {
      ...themeSettings.palette.background,
      default: themeSettings.palette.common.white,
      placeholder: grey[200],
    },
  },
  typography: {
    ...themeSettings.typography,
    fontHeader,
    h1: {
      ...themeSettings.typography.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60,
    },
    h2: {
      ...themeSettings.typography.h2,
      ...fontHeader,
      fontSize: 48,
    },
    h3: {
      ...themeSettings.typography.h3,
      ...fontHeader,
      fontSize: 42,
    },
    h4: {
      ...themeSettings.typography.h4,
      ...fontHeader,
      fontSize: 36,
    },
    h5: {
      ...themeSettings.typography.h5,
      fontSize: 20,
      fontWeight: themeSettings.typography.fontWeightLight,
    },
    h6: {
      ...themeSettings.typography.h6,
      ...fontHeader,
      fontSize: 18,
    },
    subtitle1: {
      ...themeSettings.typography.subtitle1,
      fontSize: 18,
    },
    body1: {
      ...themeSettings.typography.body2,
      fontWeight: themeSettings.typography.fontWeightRegular,
      fontSize: 16,
    },
    body2: {
      ...themeSettings.typography.body1,
      fontSize: 14,
    },
  },
};

export default theme;
