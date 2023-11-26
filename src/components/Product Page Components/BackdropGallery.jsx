import React, { useState, useEffect } from "react";
import { Backdrop, Box, IconButton } from "@mui/material";

import CloseIcon from "./Icons/CloseIcon";
import PreviousIcon from "./Icons/PreviousIcon";
import NextIcon from "./Icons/NextIcon";

const BackdropGallery = ({ IMAGES, THUMBS, open, handleClose, currentPassedImage }) => {

  const [backdropImage, setBackdropImage] = useState(currentPassedImage);
  const [currentPassedImageIndex, setCurrentPassedImageIndex] = useState(1);

  useEffect(() => {
    setBackdropImage(currentPassedImage);
    IMAGES.forEach((imgg, index) => {
      imgg === currentPassedImage && setCurrentPassedImageIndex(index);
    });
  }, [currentPassedImage]);

  const handleClick = (index = null) => {
    setBackdropImage(IMAGES[index]);
    setCurrentPassedImageIndex(index);
  };

  const handleIncrement = () => {
    if (currentPassedImageIndex === IMAGES.length - 1) {
      setBackdropImage(IMAGES[0]);
      setCurrentPassedImageIndex(0);
    } else {
      setBackdropImage(IMAGES[currentPassedImageIndex + 1]);
      setCurrentPassedImageIndex(currentPassedImageIndex + 1);
    }
  };

  const handleDecrement = () => {
    if (currentPassedImageIndex === 0) {
      setBackdropImage(IMAGES[IMAGES.length - 1]);
      setCurrentPassedImageIndex(IMAGES.length - 1);
    } else {
      setBackdropImage(IMAGES[currentPassedImageIndex - 1]);
      setCurrentPassedImageIndex(currentPassedImageIndex - 1);
    }
  };

  const removeActivatedClass = (parent) => {
    parent.childNodes.forEach((node) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };

  return (
    <Backdrop
      className="backdrop"
      sx={{
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <Box className="backdrop-content">
        <IconButton
          onClick={handleClose}
          sx={{ color: "#fff", bgcolor: "transparent", alignSelf: "flex-end" }}
        >
          <CloseIcon fillColor={"#fff"} />
        </IconButton>
        <Box className="image">
          <IconButton
            className="icon-button-prev"
            disableRipple
            onClick={() => {
              handleDecrement();
              removeActivatedClass(document.querySelector(".thumbnails"));
            }}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <PreviousIcon />
          </IconButton>
          <IconButton
            className="icon-button-next"
            disableRipple
            onClick={() => {
              handleIncrement();
              removeActivatedClass(document.querySelector(".thumbnails"));
            }}
            sx={{
              height: "42px",
              width: "42px",
              bgcolor: "#fff",
            }}
          >
            <NextIcon />
          </IconButton>
          <img
            width={720} 
            height={480}
            src={backdropImage}
            alt="selected-product"
            style={{ cursor: "auto" }}
          />
        </Box>
        <Box className="thumbnails">
          {THUMBS.map((th, index) => {
            return (
              <Box
                className="img-holder-backd"
                key={index}
                onClick={(e) => {
                  handleClick(index);
                  removeActivatedClass(e.currentTarget.parentNode);
                  e.currentTarget.childNodes[0].classList.toggle("activated");
                }}
              >
                <Box
                  className={`outlay ${
                    index === currentPassedImageIndex && "activated"
                  }`}
                ></Box>
                <img width={75} height={40} src={th} alt={`product-${index + 1}`} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Backdrop>
  );
};

export default BackdropGallery;
