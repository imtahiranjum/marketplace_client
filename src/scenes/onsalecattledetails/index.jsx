import { useTheme } from "@emotion/react";
import { Box, Skeleton } from "@mui/material";
import Description from "components/Product Page Components/Description";
import Gallery from "components/Product Page Components/Gallery";
import MobileGallery from "components/Product Page Components/MobileGallery";
import React, { useEffect, useState } from "react";
import profileImage from "assets/profile.jpeg";
import { useLocation } from "react-router-dom";
import FAQs from "components/Product Page Components/FAQs";
import {
  useGetOnSaleCattleDetailsQuery, useGetOnSaleCattleImagesQuery,
} from "state/api";

const OnSaleCattleDetails = () => {
  const theme = useTheme();
  const location = useLocation();
  const recievedProps = location.state.propsToPass;
  const { dataForRecievedProps } = `"${recievedProps}"`;
  const { data, isLoading, isSuccess } = useGetOnSaleCattleImagesQuery(
    recievedProps.cattle_info
  );
  // })
  // console.log(recievedProps);
  // console.log(id);
  // console.log(data);

  return (
    <div>
      <Box>
        <Box className="core">
          {data || (!isLoading && isSuccess) ? (
            <Gallery images={data} />
          ) : (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={720}
              height={480}
            />
          )}
          {data || (!isLoading && isSuccess) ? (
            <MobileGallery images={data} />
          ) : <></>}
          <Description
            key={recievedProps._id}
            _id={recievedProps._id}
            title={recievedProps.title}
            image={profileImage}
            description={recievedProps.description}
            category={recievedProps.category}
            cattle_info={recievedProps.cattle_info}
            contact={recievedProps.contact}
            questions={recievedProps.questions}
            location={recievedProps.location}
            price={recievedProps.price}
          />
        </Box>
        <Box
          sx={{
            flexDirection: "column",
            margin: "1rem",
            marginTop: "1rem",
            marginBottom: "2rem",
          }}
        >
          <FAQs questions={recievedProps.questions} />
        </Box>
      </Box>
    </div>
  );
};

export default OnSaleCattleDetails;
