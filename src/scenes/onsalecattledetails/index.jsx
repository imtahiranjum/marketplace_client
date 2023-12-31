import { useTheme } from "@emotion/react";
import { Box, Divider, Skeleton } from "@mui/material";
import Description from "components/Product Page Components/Description";
import Gallery from "components/Product Page Components/Gallery";
import MobileGallery from "components/Product Page Components/MobileGallery";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FAQs from "components/Product Page Components/FAQs";
import { useDispatch, useSelector } from "react-redux";
import AskQuestions from "components/AskQuestions";
import { useGetSellerByEmailQuery, useGetSellerByIdQuery, useGetUserByEmailQuery } from "state/api";

const OnSaleCattleDetails = () => {
  const isLoggedIn = useSelector((state) => state.global.isLoggedIn);
  const userEmail = useSelector((state) => state.global.userEmail);
  const location = useLocation();
  const recievedProps = location.state.propsToPass;
  const [toQuestion, setToQuestion] = React.useState(false);
  const [sellerItself, setSellerItself] = React.useState(true);
  const { data, isLoading, isSuccess } = useGetSellerByIdQuery(recievedProps.seller_info);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (data.seller.user.email !== userEmail) {
        setSellerItself(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!sellerItself) {
      setToQuestion(true);
    }
  }, [sellerItself]);

  return (
    <div>
      <Box>
        <Box className="core" display={"flex"}>
          {recievedProps.images && recievedProps.images[0] ? (
            <Gallery images={recievedProps.images} />
          ) : (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={720}
              height={480}
            />
          )}
          {recievedProps.images && recievedProps.images[0] ? (
            <MobileGallery images={recievedProps.images} />
          ) : (
            <></>
          )}
          <Description
            key={recievedProps._id}
            _id={recievedProps._id}
            title={recievedProps.title}
            description={recievedProps.description}
            category={recievedProps.category}
            cattle_info={recievedProps.cattle_info}
            contact={recievedProps.contact}
            seller={recievedProps.seller_info}
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
          <FAQs
            questions={recievedProps.questions}
            seller={recievedProps.seller_info}
          />
          <Box>
            {isLoggedIn && isSuccess && toQuestion ? (
              <AskQuestions
                onsalecattle={recievedProps._id}
                seller={recievedProps.seller_info}
              />
            ) : (
              <></>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default OnSaleCattleDetails;
