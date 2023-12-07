import { useTheme } from "@emotion/react";
import { Box, Button, Card, TextField } from "@mui/material";
import Typography from "components/Typography";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useAddAnswerMutation,
  useGetAnswerQuery,
  useGetSellerByIdQuery,
  useGetUserIdQuery,
  useGetUserQuery,
} from "state/api";

function FAQs({ questions, answers, seller }) {
  const theme = useTheme();
  const currentUser = useSelector((state) => state.global.userEmail);
  const isLoggedIn = useSelector((state) => state.global.isLoggedIn);
  const { data, isLoading, isSuccess } = useGetSellerByIdQuery(seller);
  const [cattleSeller, setCattleSeller] = React.useState("");
  const [toAnswer, setToAnswer] = React.useState(false);
  const [answer, setAnswer] = React.useState("");
  const [addAnswer] = useAddAnswerMutation();

  const handleSubmit = async (_id) => {
    const payload = await addAnswer({
      questionId: _id,
      answer: answer,
    });
    setAnswer("");
  };


  useEffect(() => {
    if (!isLoading && isSuccess) {
      setCattleSeller(data.seller.user.email);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (currentUser === cattleSeller) {
      setToAnswer(true);
    }
  }, [cattleSeller]);

  return (
    <Card
      sx={{
        flex: 1,
        backgroundColor: theme.palette.secondary,
        padding: "1rem",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "Bold",
          margin: "1rem",
        }}
      >
        Questions
      </Typography>
      {questions.length != "0" ? (
        <Typography>
          {questions.map(({ _id, subject, description, user, answer }) => (
            <Card
              sx={{
                // backgroundImage: {profileImage}
                backgroundColor: theme.palette.secondary.light,
                borderRadius: "0.55rem",
                borderColor: "darkgrey",
                margin: "1rem",
              }}
            >
              <Box
                sx={{
                  margin: "1rem",
                  marginLeft: "1.5rem",
                }}
              >
                {subject !== undefined ? (
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "Bold",
                      }}
                    >
                      Subject:
                    </Typography>
                    <Typography>{subject}</Typography>
                  </Box>
                ) : (
                  <></>
                )}
                <Typography
                  sx={{
                    fontWeight: "Bold",
                  }}
                >
                  Question:
                </Typography>
                <Typography>{description}</Typography>
                {/* <Typography variant="caption" >Asked by: {}</Typography> */}
                {answer !== undefined ? (
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "Bold",
                      }}
                    >
                      Answer:
                    </Typography>
                    <Typography>{answer}</Typography>
                  </Box>
                ) : (
                  <Box>
                    {isLoggedIn && data && isSuccess && toAnswer ? (
                      <Box>
                        <TextField
                          required
                          fullWidth
                          name="answer"
                          label="Write Answer"
                          type="answer"
                          multiline
                          rows={2}
                          sx={{
                            my: "0.5rem",
                            mx: "0.5rem",
                          }}
                          onChange={(e) => setAnswer(e.target.value)}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleSubmit(_id);
                          }}
                          sx={{
                            my: "0.5rem",
                            mx: "0.5rem",
                          }}
                        >Submit</Button>
                      </Box>
                    ) : (
                      <Typography
                        sx={{
                          fontStyle: "italic",
                        }}
                      >
                        Not answered yet
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            </Card>
          ))}
        </Typography>
      ) : (
        <Typography
          sx={{
            margin: "1rem",
            marginLeft: "1.5rem",
          }}
        >
          No queries yet
        </Typography>
      )}
    </Card>
  );
}

export default FAQs;
