import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "components/Typography";
import {
  Avatar,
  Button,
  Card,
  IconButton,
  Paper,
  Rating,
  Skeleton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import CardSkeletonBase from "components/CardSkeltonBase";
import { useLocation } from "react-router-dom";
import {
  useChangeProfileBioMutation,
  useChangeProfileImageMutation,
  useGetSellerByIdQuery,
  useGetUserByEmailQuery,
} from "state/api";
import { useSelector } from "react-redux";
import SmallHeader from "components/SmallHeader";
import { useTheme } from "@emotion/react";
import { OnSaleCattleGetter } from "scenes/sellerdashboard";
import { Check, Edit } from "@mui/icons-material";
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function UserProfile() {
  const location = useLocation();
  const userEmail = useSelector((state) => state.global.userEmail);
  const { data, isLoading, isSuccess } = useGetUserByEmailQuery(userEmail);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [hyperlink, setHyperlink] = React.useState();
  const [editProfileImageButton, setEditProfileImageButton] =
    React.useState(false);
  const [checkButton, setCheckButton] = React.useState(false);
  const [bio, setBio] = React.useState();
  const [image, setImage] = React.useState();
  const [base64Files, setBase64File] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [changeProfileImage] = useChangeProfileImageMutation();
  const [changeProfileBio] = useChangeProfileBioMutation();
  const isExtraLarge = useMediaQuery("(min-width: 1920px)");
  const isLarge = useMediaQuery("(min-width: 1620px)");
  const isNonMobile = useMediaQuery("(min-width: 1070px)");
  const isTab = useMediaQuery("(min-width: 740px)");
  const theme = useTheme();

  const SetButton = () => {
    if (editProfileImageButton) {
      return (
        <Button
          variant="contained"
          sx={{
            mb: "1rem",
          }}
          endIcon={<Check />}
          onClick={() => {
            setEditProfileImageButton(false);
            setCheckButton(true);
          }}
        />
      );
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseFinished = async () => {
    const payload = await changeProfileBio({
      userId: data.id,
      bio: bio,
    });
    setOpen(false);
  };

  const FormDialog = () => {
    return (
      <React.Fragment>
        <Box width={"500px"}>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Bio</DialogTitle>
            <DialogContent>
              <DialogContentText>Enter Bio Details</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="text"
                label="Bio"
                type="text"
                value={bio}
                multiline
                rows={2}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCloseFinished}>Finish</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </React.Fragment>
    );
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleImages = async () => {
    console.log(image);
    const fileBase64 = await convertToBase64(image);
    setBase64File(fileBase64);
    console.log(base64Files);
  };

  React.useEffect(() => {
    if (image) {
      handleImages();
    }
  }, [image]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  React.useEffect(() => {
    if (editProfileImageButton) {
    }
  }, [editProfileImageButton]);

  const handleSubmitProfileImage = async () => {
    const payload = await changeProfileImage({
      userId: data.id,
      image: base64Files,
    });
  };

  React.useEffect(() => {
    if (checkButton) {
      handleSubmitProfileImage();
      setCheckButton(false);
    }
  }, [checkButton]);

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box flex={3}>
          {data || (!isLoading && isSuccess) ? (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              {}
              <Avatar
                src={data.profile.profile_image}
                sx={{
                  width: 250,
                  height: 250,
                  px: "2rem",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  mx: "3rem",
                  marginTop: "0.5rem",
                  marginBottom: "1rem",
                }}
              />
              <Button
                component="label"
                variant="contained"
                sx={{
                  mb: "1rem",
                }}
                endIcon={<Edit />}
                onClick={() => setEditProfileImageButton(true)}
                onChange={(e) => setImage(e.target.files[0])}
              >
                Change Profile Image
                <VisuallyHiddenInput type="file" accept="image/*" />
              </Button>
              <SetButton />
            </Box>
          ) : (
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Box
                sx={{
                  px: "2rem",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  mx: "3rem",
                  marginTop: "0.5rem",
                  marginBottom: "1rem",
                }}
              >
                <Skeleton variant="circular" width={250} height={250} />
              </Box>
            </Box>
          )}
        </Box>
        <Box flex={9}>
          <Card
            sx={{
              flex: 1,
              padding: "1.5rem",
              m: "2.4rem",
            }}
          >
            {data || (!isLoading && isSuccess) ? (
              <SmallHeader title={data.full_name} />
            ) : (
              <Box
                sx={{
                  py: "2rem",
                }}
              >
                <Skeleton
                  width={150}
                  height={50}
                  sx={{
                    mb: "5px",
                    justifyContent: "left",
                  }}
                />
                <Skeleton
                  width={100}
                  height={30}
                  sx={{
                    mb: "5px",
                    justifyContent: "left",
                  }}
                />
              </Box>
            )}
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              Bio:
            </Typography>
            {data || (!isLoading && isSuccess) ? (
              <Typography
                sx={{
                  padding: "0.3rem",
                  my: "0.5rem",
                }}
              >
                {data.profile.bio === undefined ? "No Bio" : data.profile.bio}
              </Typography>
            ) : (
              <Box>
                <Skeleton animation="wave" width={300} height={20} />
                <Skeleton animation="wave" width={300} height={20} />
              </Box>
            )}
            {/* <Button
              disabled={isDisabled}
              href={hyperlink}
              sx={{
                my: "1rem",
              }}
            >
              Get Directions
            </Button> */}

            <Button
              variant="contained"
              sx={{
                my: "1rem",
              }}
              onClick={() => {
                handleClickOpen(true);
              }}
            >
              Edit Bio
            </Button>
          </Card>
          <FormDialog />
        </Box>
      </Box>
      <Box display={"flex"}>
        <Card
          sx={{
            flex: 1,
            marginBottom: "1rem",
            mx: "1rem",
            p: "1rem",
          }}
        >
          <Typography
            flex={1}
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            Favorites:
          </Typography>
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
            {data || (!isLoading && isSuccess) ? (
              data.profile.favorites ? (
                data.profile.favorites.map((onSaleCattleId) => (
                  <OnSaleCattleGetter onSaleCattleId={onSaleCattleId} />
                ))
              ) : (
                <Typography>No Favorites</Typography>
              )
            ) : (
              <></>
            )}
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default UserProfile;
