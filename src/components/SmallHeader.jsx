import { Box, useTheme } from "@mui/material";
import React from "react";
import Typography from "./Typography";

const SmallHeader = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box sx={{
      justifyContent: "left"
    }}>
      <Typography
        variant="h4"
        color={theme.palette.secondary}
        fontWeight="bold"
        sx={{ mb: "5px", justifyContent: "left"}}
      >
        {title}
      </Typography>
      <Typography variant="h6" color={theme.palette.secondary}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default SmallHeader;