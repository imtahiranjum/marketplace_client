import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

const Questions = ({ subject, description }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h7"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {subject}:
      </Typography>
      <br/>
      <Typography variant="h8" color={theme.palette.secondary[300]}>
        {description}
      </Typography>
    </Box>
  );
};

export default Questions;