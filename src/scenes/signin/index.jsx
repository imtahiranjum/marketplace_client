import * as React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "components/Typography";
import AppForm from "components/AppForm";
import { email, required } from "form/validation";
import RFTextField from "form/RFTextField";
import FormButton from "form/FormButton";
import FormFeedback from "form/FormFeedback";
import { useTheme } from "@emotion/react";
import EFarm from "components/EFarm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "state/api";
import Snackbar from "components/Snackbar";
import { Alert } from "@mui/material";
import { setUserEmail, setIsLoggedIn } from "state";

function SignIn() {
  const [sent, setSent] = React.useState(false);
  const [newEmail, setNewEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = required(["email", "password"], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const payload = await loginUser({
        email: newEmail,
        password: password,
      });
      if (!payload.error) {
        dispatch(setUserEmail(newEmail));
        dispatch(setIsLoggedIn(true))
        setSent(true);
      } else {
        setAlertOpen(true)
        setSent(false);
      }
    } catch (err) {}
  };

  React.useEffect(()=> {
    (sent? navigate("/onsalecattle", {
      replace: false,
      state: { email: newEmail },
    }) : setAlertOpen(false)
    )
  }, [sent ])

  return (
    <React.Fragment>
      <AppForm>
        <Box sx={{ width: 500 }}>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={alertOpen}
            onClose={handleAlertClose}
            autoHideDuration={6000}
            key={"bottomcenter"}
          >
            <Alert
              onClose={handleAlertClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Wrong Email or Password
            </Alert>
          </Snackbar>
        </Box>
        <EFarm />
        <React.Fragment>
          <Typography variant="h4" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {"Not a member yet? "}
            <Link href={"/signup"} align="center" underline="always">
              Sign Up here
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
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
                onChange={(e) => setPassword(e.target.value)}
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
                size="medium"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
            </Box>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/forgotpassword/">
            Forgot password?
          </Link>

          <Box
            sx={{
              marginTop: "2rem",
              alignItems: "center",
            }}
          >
            {"© "}
            <Link color="inherit" href="http://localhost:3000/">
              eFarm
            </Link>{" "}
            {"All Rights Reserved "}
            {new Date().getFullYear()}
          </Box>
        </Typography>
      </AppForm>
    </React.Fragment>
  );
}

export default SignIn;
