import React, {useState} from 'react'
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useGetUserQuery } from 'state/api';
import { useSelector } from 'react-redux';
import ResponsiveAppBar from 'components/Appbar';
import AppFooter from 'components/AppFooter';


const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const userId = useSelector((state)=> state.global.userId);
  // const user = useGetUserQuery(userId);
  // console.log("🚀 ~ file: index.jsx:19 ~ Layout ~ data:", user)
  
  return (
    <div>
    <Box display={isNonMobile ? 'flex'  : 'block'} width="100%" height="100%">
      <ResponsiveAppBar
      isSidebarOpen = {isSidebarOpen}
      setIsSidebarOpen = {setIsSidebarOpen}
      />
    </Box>
    <Box mt={"6rem"}>
      <Outlet/>
      <AppFooter/>
    </Box>
    </div>
  )
}

export default Layout;