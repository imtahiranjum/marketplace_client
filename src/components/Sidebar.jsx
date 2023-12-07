import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  FoodBankOutlined,
  SupportOutlined,
  AddCircleOutlineOutlined,
  MedicalInformationOutlined,
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  TodayOutlined,
  PieChartOutlined,
  SellOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

const navItems = [
  {
    text: "Dashboard",
    value: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "User Management",
    value: "User Management",
    icon: null,
  },
  {
    text: "Staff",
    value: "Staff",
    icon: <Groups2Outlined />,
  },
  {
    text: "Doctors",
    value: "Doctors",
    icon: <MedicalInformationOutlined />,
  },
  {
    text: "Marketplace Management",
    value: "Marketplace Management",
    icon: null,
  },
  {
    text: "View On Sale Cattles",
    value: "products",
    icon: <SellOutlined />,
  },
  {
    text: "Add/Reomove Cattle",
    value: "addProduct",
    icon: <AddCircleOutlineOutlined />,
  },
  
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary,
              backgroundColor: theme.palette.secondary,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.primary}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold" sx={{
                        color: theme.palette.secondary.main
                      }}>
                    eFarm
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, value }) => {
                const lcText = value.toLowerCase();
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{
                        textAlign:"left",
                        m: "2.25rem 0 1rem 2rem",
                        color:
                          active === lcText
                            ? theme.palette.primary
                            : theme.palette.secondary,
                      }}
                    >
                      {text}
                      <Divider sx={{
                        margin: "0.3rem",
                      }} />
                    </Typography>
                    
                  );
                }

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary.main
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{
                          color:
                            active === lcText
                              ? theme.palette.primary.main
                              : theme.palette.secondary[200],
                        }}
                      />
                      {active === lcText && (
                        <ChevronRightOutlined
                          sx={{
                            ml: "auto",
                            color:
                              active === lcText
                                ? theme.palette.primary.main
                                : theme.palette.secondary[200],
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box marginBottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  Tahir
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  Manager
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
