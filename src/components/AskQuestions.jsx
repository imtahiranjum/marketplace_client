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
  const user = useGetUserByEmailQuery(userEmail);
  const [addQuestion] = useAddQuestionMutation();
  const [description, setDescription] = React.useState("");
  const theme = useTheme();
  //   const [userId, setUserId] = React.useState("");

  const handleSubmit = async () => {
    const payload = await addQuestion({
      onsalecattle: onsalecattle,
      description: description,
      user: user.data.id,
    });
    setDescription("");
  };

  return (
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
  );
};

export default AskQuestions;
