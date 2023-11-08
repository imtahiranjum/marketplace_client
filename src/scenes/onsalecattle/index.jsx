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
import {
  useGetOnSaleCattleImagesQuery,
  useGetOnSaleCattleQuery,
} from "state/api";
import profileImage from "assets/profile.jpeg";
import Typography from "components/Typography";
import { useNavigate } from "react-router-dom";
import RepeatedCardSkeleton from "components/RepeatedCardSkeleton";
import CardSkeletonBase from "components/CardSkeltonBase";
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
  seller_info,
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
    seller_info,
    questions,
  };
  const navigateToDetailsPage = () => {
    navigate("/onsalecattledetails", {
      replace: false,
      state: { propsToPass },
    });
  };
  const theme = useTheme();
  const handleClick = () => {
    navigateToDetailsPage();
  };
  const { data, isLoading, isSuccess } =
    useGetOnSaleCattleImagesQuery(cattle_info);
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
            image={
              data && isSuccess ? (
                data[0]
              ) : (
                <Skeleton
                  animation="wave"
                  variant="square"
                  width={310}
                  height={200}
                />
              )
            }
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

const AllOnSaleCattle = () => {
  const { data, isLoading, isSuccess } = useGetOnSaleCattleQuery();
  const isExtraLarge = useMediaQuery("(min-width: 1920px)");
  const isLarge = useMediaQuery("(min-width: 1620px)");
  const isNonMobile = useMediaQuery("(min-width: 1070px)");
  const isTab = useMediaQuery("(min-width: 740px)");
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      {/* <Header sx={{
         justifyContent: "left"
      }} title="Cattle for Sale" subtitle="Currently available cattle for sale." /> */}
      {/* <BannerSlide imageArray={images}/> */}
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
        {data || (isSuccess && !isLoading) ? (
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
              seller_info,
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
                seller_info={seller_info}
                contact={contact}
                questions={questions}
                location={location}
                price={price}
              />
            )
          )
        ) : (
          <CardSkeletonBase repeatingCount={6} />
        )}
      </Box>
    </Box>
  );
};

export default AllOnSaleCattle;
