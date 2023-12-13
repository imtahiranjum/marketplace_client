import logo from "./logo.svg";
import "./index.css";
import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { themeSettings } from "./theme";
import AllOnSaleCattle from "./scenes/onsalecattle";
import Layout from "scenes/layout";
import SignIn from "scenes/signin";
import SignUp from "scenes/signup";
import ForgotPassword from "scenes/forgotPassword";
import OnSaleCattleDetails from "scenes/onsalecattledetails";
import SellerInfo from "scenes/sellerinfo";
import SellerDashboard from "scenes/sellerdashboard";
import RegisterSeller from "scenes/registerasseller";
import Chat from "scenes/chat";
import UserProfile from "scenes/userprofile";
import AddNewCattleToSale from "scenes/addCattleToSale";
import Chat2 from "scenes/chat2";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={themeSettings}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={<Navigate to="/onsalecattle" replace />}
              />
              <Route path="/onsalecattle" element={<AllOnSaleCattle />} />
              <Route
                path="/onsalecattledetails"
                element={<OnSaleCattleDetails />}
              />
              <Route path="/sellerinfo" element={<SellerInfo />} />
              <Route path="/sellerdashboard" element={<SellerDashboard />} />
              <Route path="/userprofile" element={<UserProfile />} />
              <Route path="/addcattletosale" element={<AddNewCattleToSale />} />
              <Route path="/chat" element={<Chat2 />} />
            </Route>
            <Route path="/registerseller" element={<RegisterSeller />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
