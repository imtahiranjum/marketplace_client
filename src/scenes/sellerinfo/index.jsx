import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "components/Typography";
import AppForm from "components/AppForm";
import { email, required } from "form/validation";
import RFTextField from "form/RFTextField";
import FormButton from "form/FormButton";
import FormFeedback from "form/FormFeedback";
import EFarm from "components/EFarm";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetSellerByEmailQuery,
  useGetSellerByIdQuery,
  useGetSellerQuery,
  useLoginUserMutation,
} from "state/api";
import Snackbar from "components/Snackbar";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Paper,
  Rating,
  Skeleton,
} from "@mui/material";
import { setUserEmail } from "state";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import Star from "components/Star";
import CardSkeletonBase from "components/CardSkeltonBase";
import SmallHeader from "components/SmallHeader";
import SellerDashboard, { OnSaleCattleGetter } from "scenes/sellerdashboard";

function SellerInfo() {
  const location = useLocation();
  const recievedProps = location.state.propsToPass;
  const { data, isLoading, isSuccess } = useGetSellerByIdQuery(recievedProps);
  const userEmail = useSelector((state) => state.global.userEmail);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [hyperlink, setHyperlink] = React.useState();
  const navigate = useNavigate();


  React.useEffect(() => {
    if (isSuccess && userEmail === data.seller.user.email) {
        navigate("/sellerdashboard", { replace: true });
    }
  }, [isSuccess]);

  React.useEffect(() => {
    if (data && !isLoading) {
      setHyperlink(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=&lon=`
      );
      // ${data.seller.contact_info.location.latitude}
      // ${data.seller.contact_info.location.longitude}
      setIsDisabled(false);
    }
  }, [isLoading]);

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Box>
          {data || (!isLoading && isSuccess) ? (
            <Box
              display={"flex"}
              flex={3}
              flexDirection={"column"}
              alignItems={"center"}
            >
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
        <Box flex={9}>
          <Card
            sx={{
              flex: 1,
              padding: "1.5rem",
              m: "2.4rem",
            }}
          >
            {data || (!isLoading && isSuccess) ? (
              <SmallHeader title={data.seller.name} />
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
              Description:
            </Typography>
            {data || (!isLoading && isSuccess) ? (
              <Typography>
                {data.seller.description}
              </Typography>
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
            <Button
              disabled={isDisabled}
              href={hyperlink}
              sx={{
                my: "1rem",
              }}
            >
              Get Directions
            </Button>
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
          {data || (!isLoading && isSuccess) ? (
            data.seller.cattle_on_sale? data.seller.cattle_on_sale.map((onSaleCattleId) => (
              <OnSaleCattleGetter onSaleCattleId={onSaleCattleId} />
            )): <Typography>No Cattle On Sale</Typography>
          ) : (
            <CardSkeletonBase repeatingCount={3} />
          )}
        </Card>
      </Box>
    </>
  );
}

export default SellerInfo;
