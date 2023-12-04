import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button, Input } from "@mui/material";
import { useTheme } from "@emotion/react";
import { CloudUpload } from "@mui/icons-material";
import styled from "@emotion/styled";
import { useState } from "react";

export default function CattleDetails(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [base64Files, setBase64Files] = useState([]);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const theme = useTheme();

  props.func({
    "name": name,
    "age": age,
    "gender": gender,
    "weight": weight,
    "category": category,
    "breed": breed,
    "color": color,
    "base64Files": base64Files,
  });

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleImages = async () => {
    console.log(image);
    const fileBase64 = await convertToBase64(image);
    setBase64Files((current) => [...current, fileBase64]);
    console.log(base64Files);
  };

  React.useEffect(() => {
    if (image) {
      handleImages();
    }
  }, [image]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <React.Fragment>
      <Box
        // component="form"
        // onSubmit={handleSubmit2}
        // noValidate
        sx={{
          mt: "3rem",

          mx: "8rem",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              //
              sx={{
                color: theme.palette.primary,
                my: "0.5rem",
                ml: "0.2rem",
                ml: "0.2rem",
              }}
              subscription={{ value: true, active: true }}
              // disabled={submitting || sent}
              // component={RFTextField}
              autoComplete="given-name"
              fullWidth
              label="Nick Name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              // component={RFTextField}
              // disabled={submitting || sent}
              //
              sx={{
                color: theme.palette.primary,
                my: "0.5rem",
                ml: "0.2rem",
                ml: "0.2rem",
              }}
              autoComplete="family-name"
              fullWidth
              label="Age"
              name="age"
              required
              onChange={(e) => setAge(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="email"
              // component={RFTextField}
              // disabled={submitting || sent}
              //
              sx={{
                color: theme.palette.primary,
                my: "0.5rem",
                ml: "0.2rem",
                ml: "0.2rem",
              }}
              fullWidth
              label="Gender"
              margin="normal"
              name="gender"
              required
              onChange={(e) => setGender(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              // component={RFTextField}
              // disabled={submitting || sent}
              //
              sx={{
                color: theme.palette.primary,
                my: "0.5rem",
                ml: "0.2rem",
                ml: "0.2rem",
              }}
              required
              fullWidth
              name="weight"
              autoComplete="weight"
              label="Weight"
              type="number"
              margin="normal"
              onChange={(e) => setWeight(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              // component={RFTextField}
              // disabled={submitting || sent}
              //
              sx={{
                color: theme.palette.primary,
                my: "0.5rem",
                ml: "0.2rem",
                ml: "0.2rem",
              }}
              fullWidth
              label="Category"
              margin="normal"
              name="category"
              required
              onChange={(e) => setCategory(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              // component={RFTextField}
              // disabled={submitting || sent}
              //
              sx={{
                color: theme.palette.primary,
                my: "0.5rem",
                ml: "0.2rem",
                ml: "0.2rem",
              }}
              required
              fullWidth
              name="breed"
              autoComplete="breed"
              label="Breed"
              type="text"
              margin="normal"
              onChange={(e) => setBreed(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              // component={RFTextField}
              // disabled={submitting || sent}
              //
              sx={{
                color: theme.palette.primary,
                my: "0.5rem",
                ml: "0.2rem",
                ml: "0.2rem",
              }}
              fullWidth
              label="Color"
              margin="normal"
              name="color"
              required
              onChange={(e) => setColor(e.target.value)}
            />
          </Grid>
        </Grid>
        {/* <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy> */}

        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
          onChange={(e) => setImage(e.target.files[0])}
          sx={{
            my: "1rem",
            mr: "1rem",
          }}
        >
          Upload Images
          <VisuallyHiddenInput type="file" accept="image/*" />
        </Button>

        <Box
          sx={{
            my: "1rem",
          }}
        >
          Selected Images:
        </Box>
        <Box
          sx={{
            my: "1rem",
          }}
        >
          {base64Files ? (
            base64Files.map((image) => (
              <img
                width={160}
                height={120}
                src={image}
                border={"3px solid"}
                borderColor={"#FFFFFF"}
                border-radius={"4px"}
              />
            ))
          ) : (
            <p>No Image Uploaded</p>
          )}
        </Box>

        {/* <Button
              component="label"
              variant="contained"
              size="medium"
              color="success"
              onClick={handleNext}
              sx={{
                my: "1rem",
                fontSize: "1rem",
                fontWeight: "bold",
                fontPalette: "primary",
              }}
            >
              Next
            </Button> */}
        {/* <Button
                component="label"
                variant="contained"
                size="large"
                color="success"
                onClick={handleSubmit}
                sx={{
                  my: "1rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Add Cattle
              </Button> */}
      </Box>
    </React.Fragment>
  );
}
