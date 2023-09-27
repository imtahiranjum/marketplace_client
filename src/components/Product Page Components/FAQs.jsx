import { useTheme } from "@emotion/react";
import { Box, Card } from "@mui/material";
import Typography from "components/Typography";
import React from "react";

function FAQs({ questions, answers }) {
  const theme = useTheme();
  return (
    <div>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "Bold",
          margin: "1rem",
        }}
      >
        Questions
      </Typography>
      {(questions).length != "0" ? <Typography>
        {questions.map(({ subject, description, user }) => (
          <Card
            sx={{
              // backgroundImage: {profileImage}
              backgroundColor: theme.palette.secondary.light,
              borderRadius: "0.55rem",
              borderColor: "darkgrey",
              margin: "1rem",
            }}
          >
            <Box sx={{
                margin: "1rem",
                marginLeft: "1.5rem"
            }}>

            <Typography
              sx={{
                fontWeight: "Bold",
              }}
            >
              Subject:
            </Typography>
            <Typography>{subject}</Typography>
            <Typography
              sx={{
                fontWeight: "Bold",
              }}
            >
              Question:
            </Typography>
            <Typography>{description}</Typography>
            <Typography
              sx={{
                fontWeight: "Bold",
            }}
            >
              Answer:
            </Typography>
            <Typography>Answer here{}</Typography>
            </Box>
          </Card>
        ))}
      </Typography>
          : <Typography sx={{
            margin: "1rem",
            marginLeft: "1.5rem"
        }}>
                No queries yet
            </Typography>}
      
    </div>
  );
}

export default FAQs;
