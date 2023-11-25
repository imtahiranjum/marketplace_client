import * as React from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import backgroundImage from "../assets/appCurvyLines.png";
import { Card } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";

function AppFormBig(props) {
  const { children } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        backgroundImage: { backgroundImage },
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mt: 8, mb: 11 }}>
          <Card
            background={theme.palette.secondary}
            sx={{
              py: { xs: 3, md: 6 },
              px: { xs: 2, md: 5 },
              backgroundColor: theme.palette.secondary,
              borderRadius: "0.55rem",
              borderWidth: "0.55rem",
              borderColor: "darkgrey",
            }}
          >
            {children}
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

AppFormBig.propTypes = {
  children: PropTypes.node,
};

export default AppFormBig;
