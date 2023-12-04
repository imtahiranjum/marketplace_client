import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "components/Typography";
import {
  Avatar,
  Button,
  Card,
  Paper,
  Rating,
  Skeleton,
} from "@mui/material";
import Header from "components/Header";
import CardSkeletonBase from "components/CardSkeltonBase";
import { useLocation } from "react-router-dom";
import { useGetSellerByIdQuery } from "state/api";

function UserProfile() {
  const location = useLocation();
  const recievedProps = location.state.propsToPass;
  const { data, isLoading, isSuccess } = useGetSellerByIdQuery(recievedProps);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [hyperlink, setHyperlink] = React.useState();

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
                value={4}
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
        <Box>
          <Card
            sx={{
              flex: 1,
              padding: "1.5rem",
              m: "2.4rem",
            }}
          >
            {data || (!isLoading && isSuccess) ? (
              <Header title={data.name} subtitle={data.description} />
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
            <Paper elevation={2}>
              {data || (!isLoading && isSuccess) ? (
                <Typography
                  sx={{
                    padding: "0.3rem",
                    my: "0.5rem",
                  }}
                >
                  {data.description}
                </Typography>
              ) : (
                <Box>
                  <Skeleton animation="wave" width={300} height={20} />
                  <Skeleton animation="wave" width={300} height={20} />
                  <Skeleton animation="wave" width={300} height={20} />
                </Box>
              )}
            </Paper>
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
                  data.contact_info.address
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
    </>
  );
}

export default UserProfile
