import React from 'react'
import eFarmLogo from "assets/efarmlogo.png"
import { Box } from '@mui/material';

function EFarm() {
  return (
    <div>
        <Box
              sx={{
                margin: "1rem",
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img width={150} height={150} src={eFarmLogo} />
            </Box>
    </div>
  )
}

export default EFarm;