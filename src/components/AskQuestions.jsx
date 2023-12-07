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
  const userEmail = useSelector((state) => state.global.userEmail);
  const isLoggedIn = useSelector((state) => state.global.isLoggedIn);
  const user = useGetUserByEmailQuery(userEmail);
  const {data, isLoading, isSuccess} = useGetSellerByIdQuery(seller);
  const [addQuestion] = useAddQuestionMutation();
  const [toQuestion, setToQuestion] = React.useState(false);
  const [sellerEmail, setSellerEmail] = React.useState("");
  const [description, setDescription] = React.useState("");
  const theme = useTheme();

  //   const [userId, setUserId] = React.useState("");

  useEffect(() => {
    if (data && !isLoading && isSuccess) {
      setSellerEmail(data.seller.user.email);
    }
  }, [isLoading, isSuccess]);

  useEffect(() => {
    if (data && !user.isLoading && user.isSuccess) {
      console.log(user.data.email, sellerEmail);
        if (user.data.email !== sellerEmail) {
          setToQuestion(true);
        }
    }
  }, [sellerEmail]);

  const handleSubmit = async () => {
    const payload = await addQuestion({
      onsalecattle: onsalecattle,
      description: description,
      user: user.data.id,
    });
    setDescription("");
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
          value={description}
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
