import { StarBorder, StarHalf, StarHalfSharp, StarOutline, StarRate } from "@mui/icons-material";
import { Box, Icon } from "@mui/material";
import React from "react";

function Star({ rating }) {
  const star = Array.from({ length: 5 }, (element, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <StarRate  />
        ) : rating >= number ? (
          <StarHalfSharp />
        ) : (
          <StarOutline />
        )}
      </span>
    );
  });

  return (
    <Box>
      {star}
    </Box>
  );
}

export default Star;
