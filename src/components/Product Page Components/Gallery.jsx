import React, { useState, useEffect } from "react";
import BackdropGallery from "./BackdropGallery";
import { Box } from "@mui/material";

const Gallery = (images) => {
  const THUMBS = images.images;
  const IMAGES = images.images;

  console.log(IMAGES);

  const [currentImage, setCurrentImage] = useState(IMAGES[0]);
  const [currentPassedImage, setCurrentPassedImage] = useState(IMAGES[0]);

  const [open, setOpen] = useState(false);
  const handleClick = (index) => {
    setCurrentImage(IMAGES[index]);
  };
  const handleToggle = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const removeActivatedClass = (parent) => {
    parent.childNodes.forEach((node) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };
  useEffect(() => {
    setCurrentPassedImage(currentImage);
  }, [currentImage]);

  return (
    <Box className="gallery-holder hide-in-mobile">
      <Box className="gallery">
        <Box className="image">
          <img width={600} height={380} src={currentImage} alt="Product" onClick={handleToggle} />
        </Box>
        <BackdropGallery
          IMAGES={IMAGES}
          THUMBS={THUMBS}
          handleClose={handleClose}
          open={open}
          currentPassedImage={currentPassedImage}
        />
        <Box className="thumbnails">
          {THUMBS.map((th, index) => {
            return (
              <Box
                className="img-holder"
                key={index}
                onClick={(e) => {
                  handleClick(index);
                  removeActivatedClass(e.currentTarget.parentNode);
                  e.currentTarget.childNodes[0].classList.toggle("activated");
                }}
              >
                <Box className={`outlay ${index === 0 && "activated"}`}></Box>
                <img width={90} height={40} src={th} alt={`product-${index + 1}`} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Gallery;
