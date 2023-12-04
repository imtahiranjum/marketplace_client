import React from "react";
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
  Skeleton,
} from "@mui/material";
import { useGetOnSaleCattleQuery } from "state/api";
import profileImage from "assets/profile.jpeg";
import Typography from "components/Typography";
import { useNavigate } from "react-router-dom";
import BannerSlide from "components/BannerSlide";

const OnSaleCattle = () => {
  const navigate = useNavigate();
  const navigateToDetailsPage = () => {
    navigate("/productdetails", { replace: false, state: { propsToPass } });
  };
  const theme = useTheme();
  const handleClick = () => {
    navigateToDetailsPage();
  };

  return (
    <Card
      sx={{
        // backgroundImage: {profileImage}
        backgroundColor: theme.palette.secondary,
        borderRadius: "0.55rem",
        borderColor: "darkgrey",
        width: 320,
        height: 400,
      }}
    >
      <CardActions>
        <Button onClick={handleClick}>
          <CardMedia
            sx={{
              height: 200,
              width: 310,
              alignItems: "center",
              "&:hover": {
                backgroundColor: "primary.secondary",
                opacity: [0.9, 0.8, 0.7],
                justifyItems: "center",
              },
            }}
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
    </Card>
  );
};

const HomePage = () => {
  const { data, isLoading } = useGetOnSaleCattleQuery();
  const isExtraLarge = useMediaQuery("(min-width: 1920px)");
  const isLarge = useMediaQuery("(min-width: 1620px)");
  const isNonMobile = useMediaQuery("(min-width: 1070px)");
  const isTab = useMediaQuery("(min-width: 740px)");
  const theme = useTheme();


  return (
    <Box m="1.5rem 2.5rem">
      <Box
        backgroundColor={theme.palette.secondary}
        mt="23px"
        color={theme.palette.primary}
        display="grid"
        position={"static"}
        gridTemplateColumns={
          isExtraLarge
            ? "repeat(5, minmax(0, 1fr))"
            : isLarge
            ? "repeat(4, minmax(0, 1fr))"
            : isNonMobile
            ? "repeat(3, minmax(0, 1fr))"
            : isTab
            ? "repeat(2, minmax(0, 1fr))"
            : "repeat(1, minmax(0, 1fr))"
        }
        justifyContent="space-between"
        rowGap="25px"
        columnGap="1.0%"
        justifyItems={"center"}
        alignItems={"baseline"}
      >
      </Box>
    </Box>
  );
};

export default HomePage;
