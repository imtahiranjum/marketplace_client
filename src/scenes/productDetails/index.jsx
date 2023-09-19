import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import Description from "components/Product Page Components/Description";
import Gallery from "components/Product Page Components/Gallery";
import MobileGallery from "components/Product Page Components/MobileGallery";
import React from "react";
import profileImage from "assets/profile.jpeg";
import { useLocation } from "react-router-dom";
import FAQs from "components/Product Page Components/FAQs";

const ProductDetails = () => {
  const theme = useTheme();
  const location = useLocation();
  const recievedProps = location.state.propsToPass;
  const { data } = `"${recievedProps}"`;
  // console.log(recievedProps);
  // console.log(id);
  // console.log(data);

  return (
    <div>
      <Box>
        <section className="core">
          <Gallery />
          <MobileGallery />
          <Description
            key={recievedProps._id}
            _id={recievedProps._id}
            title={recievedProps.title}
            image={profileImage}
            description={recievedProps.description}
            category={recievedProps.category}
            cattle_info={recievedProps.cattle_info}
            contact={recievedProps.contact}
            questions={recievedProps.questions}
            location={recievedProps.location}
            price={recievedProps.price}
          />
        </section>
        <Box sx={{
          flexDirection: "column",
          margin: "1rem",
          marginTop: "1rem",
          marginBottom: "2rem"
        }}>
          <FAQs questions={recievedProps.questions}/>
        </Box>
      </Box>
    </div>
  );
};

export default ProductDetails;
