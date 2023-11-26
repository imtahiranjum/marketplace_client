import { Box, useTheme } from "@mui/material";
import React from "react";
import Typography from "./Typography";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      justifyContent: "left"
    }}>
      <Typography
        variant="h3"
        color={theme.palette.secondary}
        fontWeight="bold"
        sx={{ mb: "5px", justifyContent: "left"}}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;