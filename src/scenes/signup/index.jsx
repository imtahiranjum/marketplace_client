import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "components/Typography";
import AppForm from "components/AppForm";
import { email, required } from "form/validation";
import RFTextField from "form/RFTextField";
import FormButton from "form/FormButton";
import FormFeedback from "form/FormFeedback";
import { useCreateUserMutation } from "state/api";
import { useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import AllOnSaleCattle from "scenes/products";
import EFarm from "components/EFarm";

function SignUp() {
  const [sent, setSent] = React.useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [createUser] = useCreateUserMutation();

  const validate = (values) => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async () => {
    setSent(true);
    console.log(firstName, lastName, newEmail, password, passwordVerify);
    try{
    const payload = await createUser({
      firstName: firstName,
      lastName: lastName,
      email: newEmail,
      password: password,
      passwordVerify: passwordVerify,
    });
    console.log("User Created");
    return (
      <Navigate to="/products" replace />
    )
  }
  catch(error){
    console.log("Error Occurred", error);

  }
  };

  return (
    <React.Fragment>
      <AppForm>
        <EFarm/>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/signin" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    subscription={{ value: true, active: true }}
                    disabled={submitting || sent}
                    component={RFTextField}
                    autoComplete="given-name"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="passwordVerify"
                autoComplete="new-password"
                label="Re-Enter Password"
                type="password"
                margin="normal"
                onChange={(e) => setPasswordVerify(e.target.value)}
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign Up"}
              </FormButton>
            </Box>
          )}
        </Form>

          <Box
              sx={{
                marginTop: "2rem",
                display: "flex",
                // alignContent: "center",
                justifyContent: "center"
              }}
            >
              {"© "}
              <Link color="inherit" href="http://localhost:3000/">
                eFarm 
              </Link>
              {" "}
              {" All Rights Reserved. "}
              {new Date().getFullYear()}
            </Box>

      </AppForm>
    </React.Fragment>
  );
}

export default SignUp;
