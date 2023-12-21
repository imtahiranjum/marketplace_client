import * as React from "react";
import { email, required } from "form/validation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useChangeSellerDescriptionMutation,
  useGetOnSaleCattleDetailsQuery,
  useGetOnSaleCattleQuery,
  useGetSellerByEmailQuery,
  useGetSpecificOnSaleCattleQuery,
} from "state/api";
import { setUserEmail } from "state";
import {
  Avatar,
  Box,
  ButtonGroup,
  Card,
  Container,
  Paper,
  Rating,
  Skeleton,
  Button,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import Typography from "components/Typography";
import Header from "components/Header";
import { Add, Edit, EditAttributes } from "@mui/icons-material";
import CardSkeletonBase from "components/CardSkeltonBase";
import SmallHeader from "components/SmallHeader";
import { OnSaleCattle } from "scenes/onsalecattle";
import { useTheme } from "@emotion/react";

export const OnSaleCattleGetter = ({ onSaleCattleId }) => {
  const { data, isLoading, isSuccess } =
    useGetSpecificOnSaleCattleQuery(onSaleCattleId);
  return data || (!isLoading && isSuccess) ? (
    <OnSaleCattle
      key={data._id}
      _id={data._id}
      title={data.title}
      images={data.images}
      description={data.description}
      category={data.category}
      seller_info={data.seller_info}
      contact={data.contact}
      questions={data.questions}
      location={data.location}
      price={data.price}
    />
  ) : (
    <CardSkeletonBase repeatingCount={1} />
  );
};

function SellerDashboard() {
  const [sent, setSent] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [editButton, setEditButton] = React.useState(false);
  const [addCattleToSaleButton, setAddCattleToSaleButton] =
    React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [sellerDescription, setSellerDescription] = React.useState("");
  const navigate = useNavigate();
  const userEmail = useSelector((state) => state.global.userEmail);
  const { data, isLoading, isSuccess } = useGetSellerByEmailQuery(userEmail);
  const [changeSellerDescription] = useChangeSellerDescriptionMutation();
  const isExtraLarge = useMediaQuery("(min-width: 1920px)");
  const isLarge = useMediaQuery("(min-width: 1620px)");
  const isNonMobile = useMediaQuery("(min-width: 1070px)");
  const isTab = useMediaQuery("(min-width: 740px)");
  const theme = useTheme();

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseFinished = async () => {
    const payload = await changeSellerDescription({
      sellerId: data.seller._id,
      description: sellerDescription,
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
              <DialogContentText>Chnage Description</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="text"
                label="Description"
                type="text"
                value={sellerDescription}
                multiline
                rows={2}
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setSellerDescription(e.target.value);
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

  // React.useEffect(() => {
  //   navigate("/addcattletosale", { replace: true });
  // }, [addCattleToSaleButton]);

  // const handleSubmit = async () => {
  //   try {
  //     const payload = await loginUser({
  //       email: newEmail,
  //       password: password,
  //     });
  //     if (!payload.error) {
  //       dispatch(setUserEmail(newEmail));
  //       setSent(true);
  //     } else {
  //       setAlertOpen(true)
  //       setSent(false);
  //     }
  //   } catch (err) {}
  // };

  // React.useEffect(()=> {
  //   (sent? navigate("/onsalecattle", {
  //     replace: false,
  //     state: { email: newEmail },
  //   }) : setAlertOpen(false)
  //   )
  // }, [sent ])

  return (
    <React.Fragment>
      <FormDialog />
      <Box display={"flex"} justifyContent={"left"} alignItems={"center"}>
        <Box>
          {data || (!isLoading && isSuccess) ? (
            <Box
              display={"flex"}
              flex={4}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"left"}
            >
              {data.profile && data.profile.profile_image ? (
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
              ) : (
                <Avatar
                  src={data.seller.name}
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
              )}
              <Rating
                name="size-large"
                defaultValue={0}
                value={data.seller.rating}
                size="large"
                readOnly
                sx={{
                  marginBottom: "1rem",
                }}
              />
            </Box>
          ) : (
            <Box
              display={"flex"}
              flex={4}
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
              <Skeleton variant="rectangular" width={250} height={50} />
            </Box>
          )}
        </Box>
        <Box flex={8}>
          <Card
            sx={{
              flex: 1,
              padding: "1.5rem",
              margin: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexGrow: 1,
                marginBottom: "0.5rem",
              }}
            >
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => {
                  handleClickOpen(true);
                }}
                sx={{
                  px: "1.1rem",
                }}
              >
                Edit Info
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  navigate("/addcattletosale", {
                    replace: false,
                    state: { seller_info: data.seller._id },
                  });
                }}
                sx={{
                  px: "1.1rem",
                }}
              >
                Add Cattle for Sale
              </Button>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Button
                variant="contained"
                color="warning"
                startIcon={<Add />}
                onClick={() => {
                  navigate("/addcattleboardingservice", {
                    replace: false,
                    state: { seller_info: data.seller._id },
                  });
                }}
                sx={{
                  px: "1.1rem",
                }}
              >
                Add Cattle Boarding Service
              </Button>
            </Box>
            {data || (!isLoading && isSuccess) ? (
              <SmallHeader title={data.seller.name} />
            ) : (
              <Box
                flex={8}
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
              Description:
            </Typography>
            {data || (!isLoading && isSuccess) ? (
              <Typography>{data.seller.description}</Typography>
            ) : (
              <Box>
                <Skeleton
                  animation="wave"
                  sx={{
                    margin: "0.2rem",
                  }}
                  height={20}
                />
                <Skeleton
                  animation="wave"
                  sx={{
                    margin: "0.2rem",
                  }}
                  height={20}
                />
                <Skeleton
                  animation="wave"
                  sx={{
                    margin: "0.2rem",
                  }}
                  height={20}
                />
                <Skeleton
                  animation="wave"
                  sx={{
                    margin: "0.2rem",
                  }}
                  height={20}
                />
              </Box>
            )}
            <Box>
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  marginTop: "1.5rem",
                }}
              >
                Location:
              </Typography>
              <Typography
                sx={{
                  marginBottom: "0.5rem",
                }}
              >
                {data || (!isLoading && isSuccess) ? (
                  data.seller.contact_info.address
                ) : (
                  <Skeleton width={170} />
                )}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Total Cattle On Sale:{" "}
                {data ? (
                  data.seller.cattle_on_sale ? (
                    data.seller.cattle_on_sale.length
                  ) : (
                    <Typography>No Data</Typography>
                  )
                ) : (
                  <></>
                )}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Boarding Service:{" "}
                {/* {data ? (
                  data.seller.boarding_service
                ) : (
                  <Typography>No Data</Typography>
                )} */}
              </Typography>
            </Box>
          </Card>
        </Box>
      </Box>
      {data || (!isLoading && isSuccess) ? (
        data.seller.isBoardingService ? (
          <Box
            justifyContent={"space-evenly"}
            alignItems={"center"}
            display={"flex"}
          >
            <Card
              sx={{
                flex: 1,
                marginBottom: "1rem",
                mx: "1rem",
                p: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                Boarding Service
              </Typography>
              {/* {data.seller.boarding_service} */}
            </Card>
          </Box>
        ) : null
      ) : null}
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
            Cattle On Sale
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
              data.seller.cattle_on_sale ? (
                data.seller.cattle_on_sale.map((onSaleCattleId) => (
                  <OnSaleCattleGetter onSaleCattleId={onSaleCattleId} />
                ))
              ) : (
                <Typography>No Cattle On Sale</Typography>
              )
            ) : (
              <></>
            )}
          </Box>
        </Card>
      </Box>
    </React.Fragment>
  );
}

export default SellerDashboard;
