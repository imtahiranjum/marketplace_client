import React, { useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import {
  useAddToFavoriteMutation,
  useGetOnSaleCattleImagesQuery,
  useGetOnSaleCattleQuery,
  useGetUserByEmailQuery,
  useRemoveFromFavoriteMutation,
} from "state/api";
import Typography from "components/Typography";
import { useNavigate } from "react-router-dom";
import RepeatedCardSkeleton from "components/RepeatedCardSkeleton";
import CardSkeletonBase from "components/CardSkeltonBase";
import {
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  FavoriteRounded,
  FavoriteSharp,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
// import BannerSlide from "components/BannerSlide";

export const OnSaleCattle = ({
  _id,
  title,
  images,
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
    images,
    description,
    price,
    category,
    location,
    contact,
    cattle_info,
    seller_info,
    questions,
  };
  const userEmail = useSelector((state) => state.global.userEmail);
  const isLoggedIn = useSelector((state) => state.global.isLoggedIn);
  const [userId, setUserId] = React.useState("");
  const { data, isLoading, isSuccess } = useGetUserByEmailQuery(userEmail);
  console.log(data);
  const navigateToDetailsPage = () => {
    navigate("/onsalecattledetails", {
      replace: false,
      state: { propsToPass },
    });
  };
  const theme = useTheme();
  const [favorite, setFavorite] = React.useState(false);
  const [favoriteButtonClick, setFavoriteButtonClick] = React.useState(false);
  const handleClick = () => {
    navigateToDetailsPage();
  };
  const [addToFavorite] = useAddToFavoriteMutation();
  const [removeFromFavorite] = useRemoveFromFavoriteMutation();

  // const handleFavoriteClick = () => {
  // };

  useEffect(() => {
    if (isLoggedIn && isSuccess && !isLoading) {
      data.profile && data.profile.favorites
        ? data.profile.favorites.map((favorite) => {
            if (favorite.onSaleCattleId === _id) {
              setFavorite(true);
            }
          })
        : setFavorite(false);
    }
  }, [isLoading, isSuccess]);

  const FavoriteIcon = () => {
    if (favorite) {
      return <FavoriteSharp color="#FF0000" />;
    } else {
      return <FavoriteBorder />;
    }
  };

  const favoriteAdder = async () => {
    const payload = await addToFavorite({
      onSaleCattleId: _id,
      userId: userId,
    });
  };

  const favoriteRemover = async () => {
    const payload = await removeFromFavorite({
      onSaleCattleId: _id,
      userId: userId,
    });
  };

  const favoriteHandler = () => {
    console.log("favorite clicked");
    if (favorite) {
      console.log("add");
      favoriteAdder();
      setFavorite(true);
    } else {
      if (data.profile && data.profile.favorites !== undefined) {
        data.profile.favorites.map((favor) => {
          if (favor.onSaleCattleId === _id) {
            console.log("remove");
            favoriteRemover();
            setFavorite(false);
          }
        });
      }
    }
    setFavorite(!favorite);
  };

  useEffect(() => {
    if (isSuccess && !isLoading) {
      setUserId(data.id);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (favoriteButtonClick) {
      favoriteHandler();
      setFavoriteButtonClick(false);
    }
  }, [favoriteButtonClick]);

  return (
    <Card
      sx={{
        // backgroundImage: {profileImage}
        backgroundColor: theme.palette.secondary,
        borderRadius: "0.55rem",
        borderColor: "darkgrey",
        width: 320,
        maxHeight: 500,
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
              images && images[0] ? (
                images[0]
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
      {isLoggedIn ? (
        <IconButton onClick={() => setFavoriteButtonClick(true)}>
          <FavoriteIcon />
        </IconButton>
      ) : (
        <></>
      )}
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
        // position={"static"}
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
        // justifyItems={"center"}
        // alignItems={"baseline"}
      >
        {data || (isSuccess && !isLoading) ? (
          data.map(
            ({
              _id,
              title,
              images,
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
                images={images}
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
