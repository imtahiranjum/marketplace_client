import React, { useState, useEffect } from "react";
import Typography from "./Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Box, Button } from "@mui/material";
import { ChevronLeftOutlined, ChevronRightOutlined } from "@mui/icons-material";
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import FormControlLabel from '@mui/material/FormControlLabel';

// const icon = (
//   <Paper sx={{ m: 1 }} elevation={4}>
//     <Box component="svg" sx={{ width: 100, height: 100 }}>
//       <Box
//         component="polygon"
//         sx={{
//           fill: (theme) => theme.palette.common.white,
//           stroke: (theme) => theme.palette.divider,
//           strokeWidth: 1,
//         }}
//         points="0,100 50,00, 100,100"
//       />
//     </Box>
//   </Paper>
// );

// export default function SimpleSlide() {
//   const [checked, setChecked] = React.useState(false);

//   const handleChange = () => {
//     setChecked((prev) => !prev);
//   };

//   return (
//     <Box sx={{ height: 180 }}>
//       <Box sx={{ width: `calc(100px + 16px)` }}>
//         <FormControlLabel
//           control={<Switch checked={checked} onChange={handleChange} />}
//           label="Show"
//         />
//         <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
//           {icon}
//         </Slide>
//       </Box>
//     </Box>
//   );
// }


function Slider() {
  const adsStored = [
    {
      image:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
       },
    {
      image:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
      },
    {
      image:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959121/person-1_aufeoq.jpg",
    },
    {
      image:
        "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
     },
  ];
  const [ads, setAds] = useState(adsStored);
  const [index, setIndex] = useState(0);
  const [slideState, setSlideState] = useState(false);

  useEffect(() => {
    setSlideState(true);
    const lastIndex = ads.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
    setSlideState(false);
  }, [index, ads]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => clearInterval(slider);
  }, [index]);

  return (
            <Box>
              {/* <Slide direction="left" in={slideState} mountOnEnter unmountOnExit> */}
                <Card sx={{ margin: "1rem" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="180"
                      image={ads[0].image}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </Card>
              {/* </Slide> */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <Button onClick={() => setIndex(index - 1)}>
                  <ChevronLeftOutlined />
                </Button>
                <Button onClick={() => setIndex(index + 1)}>
                  <ChevronRightOutlined />
                </Button>
              </Box>
            </Box>
          );
              };


export default Slider;
