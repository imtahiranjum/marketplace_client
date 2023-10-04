import { Box } from "@mui/material";
import Typography from "components/Typography";
import React, { useEffect, useState } from "react";
import { useGetSpecificOnSaleCattleQuery } from "state/api";
import CartIcon from "./Icons/CartIcon";

const Description = ({
  _id,
  title,
  image,
  description,
  price,
  category,
  location,
  contact,
  cattle_info,
  questions,
}) => {
  const [clickedBuyButton, setClickedBuyButton] = useState(false);

  return (
    <div className="description">
      <Typography className="pre">{category}</Typography>
    <h1>{title}</h1>
      <p className="desc">
        {description}
      </p>
      <div className="price">
        <div className="main-tag">
          <p>{price}</p>
        </div>
      </div>
      <div className="buttons">
      <button
          className="add-to-cart"
          onClick={() => {
            setClickedBuyButton(true);
          }}
        >
          <CartIcon />
          add to cart
        </button>
      </div>
    </div>
  );
};

export default Description;
