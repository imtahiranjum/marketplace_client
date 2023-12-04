import {
  Typography,
  Box,
  useTheme,
  TextField,
  Button,
  Card,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  useAddNewCattleMutation,
  useAddQuestionMutation,
  useGetSellerByEmailQuery,
  useGetSellerByIdQuery,
  useGetUserByEmailQuery,
} from "state/api";

const AskQuestions = ({ onsalecattle, seller }) => {
  const theme = useTheme();
  const userEmail = useSelector((state) => state.global.userEmail);
  const isLoggedIn = useSelector((state) => state.global.isLoggedIn);
  const user = useGetUserByEmailQuery(userEmail);
  const sellerRetrieved = useGetSellerByIdQuery(seller);
  const [addQuestion] = useAddQuestionMutation();
  const [toQuestion, setToQuestion] = React.useState(false);
  const [sellerEmail, setSellerEmail] = React.useState("");
  const [description, setDescription] = React.useState("");

  //   const [userId, setUserId] = React.useState("");

  useEffect(() => {
    if (!sellerRetrieved.isLoading && sellerRetrieved.isSuccess) {
      setSellerEmail(sellerRetrieved.data.seller.user.email);
    }
  }, [sellerRetrieved.isSuccess]);

  useEffect(() => {
    if (!user.isLoading && user.isSuccess) {
        if (user.data.id !== seller) {
          setToQuestion(true);
        }
    }
  }, [user.isSuccess]);

  const handleSubmit = async () => {
    const payload = await addQuestion({
      onsalecattle: onsalecattle,
      description: description,
      user: user.data.id,
    });
  };

  return isLoggedIn && toQuestion ? (
    <Card
      sx={{
        flex: 1,
        backgroundColor: theme.palette.secondary,
        padding: "1rem",
      }}
    >
      <Box
        display={"flex"}
        sx={{
          alignItems: "center",
          width: "500px",
        }}
      >
        <TextField
          required
          fullWidth
          name="askQuestion"
          label="Ask Question"
          type="askQuestion"
          multiline
          rows={2}
          sx={{
            my: "0.5rem",
            mx: "0.5rem",
          }}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          handleSubmit();
        }}
        sx={{
          my: "0.5rem",
          mx: "0.5rem",
        }}
      >
        Submit
      </Button>
    </Card>
  ) : (
    <></>
  );
};

export default AskQuestions;
