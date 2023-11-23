import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Field, Form, FormSpy } from "react-final-form";
import Typography from "components/Typography";
import { required } from "form/validation";
import RFTextField from "form/RFTextField";
import FormButton from "form/FormButton";
import FormFeedback from "form/FormFeedback";
import { useCreateSellerMutation } from "state/api";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EFarm from "components/EFarm";
import { useDispatch } from "react-redux";
import AppFormBig from "components/AppFormBig";

function RegisterSeller() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [sent, setSent] = React.useState(false);
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const props = location.state;
  const [createSeller] = useCreateSellerMutation();

  const validate = (values) => {
    const errors = required(
      ["name", "description", "phoneNumber", "address"],
      values
    );

    // if (!errors.phoneNumber) {
    //   const phoneNumberError = email(values.email);
    //   if (emailError) {
    //     errors.email = emailError;
    //   }
    // }

    // return errors;
  };

  const handleSubmit = async () => {
    try {
      const payload = await createSeller({
        name: displayName,
        display_name: displayName,
        description: description,
        rating: 0,
        contact_info: {
          phone_number: phoneNumber,
          address: address,
        },
        userEmail: props.userEmail,
      });
      if (!payload.error)
      {
        setSent(true);
        navigate("/sellerdashboard", {
          replace: false,
          state: { userId: props.userId },
        });
      }
      else {
        setSent(false)
      }
    } catch (error) {
      console.log("Error Occurred", error);
    }
  };

  return (
    <React.Fragment>
      <AppFormBig>
        <EFarm />
        <React.Fragment>
          <Typography variant="h4" gutterBottom marked="center" align="center">
            Seller Registration Form
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/signin" underline="always">
              Already have seller account?
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
                    label="Display Name"
                    name="displayName"
                    required
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete=""
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Address"
                margin="normal"
                name="address"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="description"
                label="Description"
                type="text"
                margin="normal"
                multiline
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
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
                {submitting || sent ? "In progress…" : "Register"}
              </FormButton>
            </Box>
          )}
        </Form>

        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            // alignContent: "center",
            justifyContent: "center",
          }}
        >
          {"© "}
          <Link color="inherit" href="http://localhost:3000/">
            eFarm
          </Link>{" "}
          {" All Rights Reserved. "}
          {new Date().getFullYear()}
        </Box>
      </AppFormBig>
    </React.Fragment>
  );
}

export default RegisterSeller;
