import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Container,
  Link,
  Paper,
  Rating,
  Skeleton,
} from "@mui/material";
import Typography from "components/Typography";
import React, { useEffect, useState } from "react";
import {
  useGetSellerByIdQuery,
  useGetSpecificOnSaleCattleQuery,
} from "state/api";
import CartIcon from "./Icons/CartIcon";
import {
  ChatBubbleOutlineRounded,
  PhoneCallbackRounded,
  WhatsApp,
} from "@mui/icons-material";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import theme from "theme";
import FlexBetween from "components/FlexBetween";

const Description = ({
  _id,
  title,
  description,
  price,
  category,
  location,
  contact,
  seller,
  cattle_info,
  questions,
}) => {
  const [chatButtonAction, setChatButtonAction] = useState(false);
  const [whatsappButtonAction, setWhatsappButtonAction] = useState(false);
  const [callButtonAction, setCallButtonAction] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [areButtonsDisabled, setAreButtonsDisabled] =
    useState(true);

  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useGetSellerByIdQuery(seller);
  console.log(data);

  useEffect(() => {
    if (seller) {
      setAreButtonsDisabled(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setWhatsappNumber(data.seller.contact_info.phone_number);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (whatsappButtonAction) {
      window.open(
        `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=Hey, I found you through *eFarm Cattle Marketplace*.%0AI found your ad of cattle with title: *${title}*%0A`,
        "_blank",
        "location=yes,height=1000,width=1000,scrollbars=yes,status=yes"
      );
      setWhatsappButtonAction(false);
    }
  }, [whatsappButtonAction]);
  
  useEffect(() => {
    if (callButtonAction) {
      window.open(
        `tel:${data.seller.contact_info.phone_number}`,
        "_blank",
        "location=yes,height=1000,width=1000,scrollbars=yes,status=yes"
      );
      setCallButtonAction(false);
    }
  }, [callButtonAction]);

  useEffect(() => {
    if (chatButtonAction) {
      navigate("/chat", {
        replace: false,
        state: { seller },
      });
      setChatButtonAction(false);
    }
  }, [chatButtonAction]);

  return (
    <Box
      sx={{
        flex: 1,
        flexGrow: 1,
      }}
    >
      <Card
        sx={{
          flex: 1,
          padding: "1rem",
          paddingBottom: "2rem",
          marginRight: "1rem",
          my: "1rem",
        }}
      >
        <Header title={title} subtitle={category} />
        {data || (!isLoading && isSuccess) ? (
          <Link
            to="/sellerinfo"
            onClick={(e) => {
              e.preventDefault();
              navigate("/sellerinfo", { state: { propsToPass: seller } });
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                marginBottom: "0.2rem",
              }}
            >
              {data || (!isLoading && isSuccess) ? (
                `${data.seller.name}`
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
            {seller ? (
              <Rating
                name="size-small"
                defaultValue={0}
                value={data.seller.rating}
                size="small"
                readOnly
                sx={{
                  marginBottom: "1rem",
                }}
              />
            ) : (
              <Container>
                <Skeleton width={30} />
                <Skeleton width={20} />
              </Container>
            )}
          </Link>
        ) : (
          <Skeleton />
        )}
        <Box>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              my: "1rem",
            }}
          >
            Rs: {price}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          Description:
        </Typography>
        <Typography>{description}</Typography>
      </Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          disableElevation
          sx={{
            marginRight: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            disabled={areButtonsDisabled}
            startIcon={<ChatBubbleOutlineRounded />}
            onClick={() => {
              setChatButtonAction(true);
            }}
            sx={{
              px: "1.1rem",
              fontSize: "1rem",
            }}
          >
            Chat
          </Button>

          <Button
            variant="contained"
            startIcon={<PhoneCallbackRounded />}
            disabled={areButtonsDisabled}
            onClick={() => {
              setCallButtonAction(true);
            }}
            sx={{
              px: "1.1rem",
              fontSize: "1rem",
            }}
          >
            Call
          </Button>
        </ButtonGroup>
        <Button
          variant="contained"
          disabled={areButtonsDisabled}
          color="success"
          startIcon={<WhatsApp />}
          onClick={() => {
            setWhatsappButtonAction(true);
          }}
          sx={{
            fontSize: "1rem",
            color: "white",
            marginRight: "1rem",
          }}
        >
          WhatsApp
        </Button>
      </Box>
    </Box>
  );
};

export default Description;
