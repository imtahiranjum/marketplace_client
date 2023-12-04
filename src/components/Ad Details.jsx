import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, TextField } from "@mui/material";
import InputField from "./styled-components/TextField";
import { Field, Form, FormSpy } from "react-final-form";
import RFTextField from "form/RFTextField";

export default function AdDetails() {
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  


  return (
    <React.Fragment>
      <Box
        sx={{
          mt: "3rem",

          mx: "8rem",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Ad Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="title"
              label="Title"
              fullWidth
              autoComplete="title"
              sx={{
                my: "0.5rem",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="price"
              label="Price"
              fullWidth
              autoComplete="price"
              sx={{
                my: "0.5rem",
              }}
            />
          </Grid>
        </Grid>
        <TextField
          fullWidth
          required
          name="description"
          label="Description"
          type="description"
          multiline
          rows={4}
          sx={{
            my: "0.5rem",
          }}
        />
      </Box>
    </React.Fragment>
  );
}
