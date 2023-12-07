import * as React from "react";
import Box from "@mui/material/Box";
import {
  useAddNewOnSaleCattleMutation,
  useAddOneCattleToSaleMutation,
  useGetOneCattleQuery,
  useGetSellerByEmailQuery,
} from "state/api";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "components/Typography";
import { Button, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { DoneRounded } from "@mui/icons-material";
import CattleDetails from "components/CattleDetails";
import AdDetails from "components/Ad Details";
import { useSelector } from "react-redux";
import state from "state";

const AddNewCattleToSale = () => {
  const [sent, setSent] = React.useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [base64Files, setBase64Files] = useState([]);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [sellerId, setSellerId] = React.useState("");
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const userEmail = useSelector((state) => state.global.userEmail);
  const { data, isLoading, isSuccess } = useGetSellerByEmailQuery(userEmail);
  const [addNewOnSaleCattle, addNewCattleResult] =
  useAddNewOnSaleCattleMutation();
  const theme = useTheme();

  React.useEffect(() => {
    if (isSuccess) {
      setSellerId(data.seller._id);
    }
  }, [isSuccess]);

  const steps = ["Cattle Details", "Ad Details"];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CattleDetails func={pullDataCattleDetails} />;
      case 1:
        return <AdDetails func={pullDataAdDetails} />;
      default:
        throw new Error("Unknown step");
    }
  };

  const pullDataCattleDetails = (data) => {
    setName(data.name);
    setAge(data.age);
    setBreed(data.breed);
    setColor(data.color);
    setWeight(data.weight);
    setCategory(data.category);
    setBase64Files(data.base64Files);
    setGender(data.gender);
  };
  const pullDataAdDetails = (data) => {
    setDescription(data.description);
    setPrice(data.price);
    setTitle(data.title);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if (activeStep === steps.length - 1) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleImages = async () => {
    const fileBase64 = await convertToBase64(image);
    setBase64Files((current) => [...current, fileBase64]);
  };

  React.useEffect(() => {
    if (image) {
      handleImages();
    }
  }, [image]);

  const handleSubmit = async () => {
    setSent(true);
    console.log(
      name,
      gender,
      age,
      breed,
      color,
      weight,
      category,
      base64Files,
      title,
      price,
      description,
      sellerId
    );
    try {
      const payload = await addNewOnSaleCattle({
        name: name,
        seller_info: sellerId,
        images: base64Files,
        gender: gender,
        age: age,
        breed: breed,
        color: color,
        weight: weight,
        category: category,
        title: title,
        price: price,
        description: description,
      });
      setSent(true);
    } catch (error) {
      console.log("Error Occurred", error);
    }
  };

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
      <Paper variant="outlined" sx={{ my: "2rem", mx: "5rem" }}>
        <Typography component="h1" variant="h4" align="center">
          Add Cattle To Sale
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, mx: "8rem" }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" align="center" gutterBottom>
              Cattle Added To Sale Successfully
              <DoneRounded />
            </Typography>
            <Button
              onClick={() => {
                navigate("/sellerdashboard");
              }}
            ></Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button
                  onClick={handleBack}
                  sx={{ mt: 3, ml: 1, mr: "1rem", mb: "1rem" }}
                >
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1, mr: "1rem", mb: "1rem" }}
              >
                {activeStep === steps.length - 1 ? "Add Now" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default AddNewCattleToSale;
