import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Rating,
  useTheme,
  useMediaQuery,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import Header from "../../components/Header";
import { useGetOnSaleCattleQuery } from "state/api";
import profileImage from "assets/profile.jpeg";
import { Image } from "@mui/icons-material";
import Questions from "components/Questions";
import Slider from "components/Slider";
import Typography from "components/Typography";
import { useNavigate } from "react-router-dom";
// import BannerSlide from "components/BannerSlide";

const OnSaleCattle = ({
  _id,
  title,
  image,
  description,
  price,
  category,
  location,
  contact,
  cattle_info,
  questions,
}) => {
  const navigate = useNavigate();
  const propsToPass = {
    _id,
    title,
    image,
    description,
    price,
    category,
    location,
    contact,
    cattle_info,
    questions,
  };
  const navigateToDetailsPage = () => {
    navigate('/productdetails', { replace: true, state: {propsToPass} });
  };
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [buttonName, setButtonName] = useState("View More")
  const handleClick = () => {
    navigateToDetailsPage();
  }

  const handleButtonName = () => {
    if (isExpanded){
      setButtonName("View Less")
    }
    else {
      setButtonName("View More") 
    }
  } 
  
  useEffect(() => {
    handleButtonName()}
    , [isExpanded]);
  
    // useEffect(() => {
    //   handleButtonName()}
    //   , [isExpanded]);

  return (
    <Card
      sx={{
        // backgroundImage: {profileImage}
        backgroundColor: theme.palette.secondary,
        borderRadius: "0.55rem",
        borderColor: "darkgrey",
        maxWidth: 345,
             
      }}
      >
      <CardActions>
        <Button onClick={handleClick}>

      <CardMedia
        sx={{ height: 200, width: 300, alignItems: "center", '&:hover': {
          backgroundColor: 'primary.secondary',
          opacity: [0.9, 0.8, 0.7],
          justifyItems: "center"
        },}}
        image={image}
        title={title}
        />
          </Button>
      </CardActions>
      <CardContent>
        <Typography
          sx={{ fontSize: 19 }}
          color={theme.palette.secondary}
          gutterBottom
        >
          {category}
        </Typography>
        
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary}>
          Rs: {Number(price).toFixed(2)}
        </Typography>

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
        sx={{
          '&:hover': {
            backgroundColor: 'primary.secondary',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
          >
          {buttonName}
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.secondary,
        }}
      >
        <CardContent>
        <Typography>
            Questions: {questions.map(
              ({
              description,
              subject,

            }) => ( <Questions
              subject= {subject}
              description= {description}
            />
            )
            
            )}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const AllOnSaleCattle = () => {
  const { data, isLoading } = useGetOnSaleCattleQuery();
  const isExtraLarge = useMediaQuery("(min-width: 1920px)");
  const isLarge = useMediaQuery("(min-width: 1620px)");
  const isNonMobile = useMediaQuery("(min-width: 1070px)");
  const isTab = useMediaQuery("(min-width: 740px)");
  const theme = useTheme()
  const images = [
          "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959131/person-2_ipcjws.jpg",
          "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg",
          "https://res.cloudinary.com/diqqf3eq2/image/upload/v1595959121/person-1_aufeoq.jpg",
          "https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg",
    ];
  

  return (
    <Box m="1.5rem 2.5rem">
      {/* <Header sx={{
         justifyContent: "left"
      }} title="Cattle for Sale" subtitle="Currently available cattle for sale." /> */}
      {/* <BannerSlide imageArray={images}/> */}
        <Box

          backgroundColor={"theme.palette.secondary"}
          mt="23px"
          color={theme.palette.primary}
          display="grid"
          position={"static"}
          gridTemplateColumns={isExtraLarge? "repeat(5, minmax(0, 1fr))":isLarge? "repeat(4, minmax(0, 1fr))" :  isNonMobile ? "repeat(3, minmax(0, 1fr))" : isTab? "repeat(2, minmax(0, 1fr))": "repeat(1, minmax(0, 1fr))" }  
          // : isTab? {gridTemplateColumns:"repeat(2, minmax(0, 1fr))"}:
          //  {gridTemplateColumns:"repeat(1, minmax(0, 1fr))"}}
          justifyContent="space-between"
          rowGap="25px"
          columnGap="1.0%"
          justifyItems={"center"}
          alignItems={"baseline"}
          // sx={{
          //   "& > div": { gridColumn: isNonMobile ? "span 1" : isTab? "span 2": "span 4" }, alignItems:"baseline"
          // }}
        >
        {data || !isLoading ? (
          data.map(
            ({
              _id,
              title,
              image,
              description,
              location,
              contact,
              category,
              cattle_info,
              price,
              questions,
            }) => (
              <OnSaleCattle
                key={_id}
                _id={_id}
                title={title}
                image={profileImage}
                description={description}
                category={category}
                cattle_info={cattle_info}
                contact={contact}
                questions={questions}
                location={location}
                price={price}

              />
            )
          )
      ) : (
        "Loading..."
      )}
          
        </Box>
        
    </Box>
  );
};

export default AllOnSaleCattle;