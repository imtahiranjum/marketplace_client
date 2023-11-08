import { useTheme } from "@emotion/react";
import { Box, Card, Skeleton, useMediaQuery } from "@mui/material";
import React from "react";
import RepeatedCardSkeleton from "./RepeatedCardSkeleton";

function CardSkeletonBase({ repeatingCount }) {
  const theme = useTheme();
  const isExtraLarge = useMediaQuery("(min-width: 1920px)");
  const isLarge = useMediaQuery("(min-width: 1620px)");
  const isNonMobile = useMediaQuery("(min-width: 1070px)");
  const isTab = useMediaQuery("(min-width: 740px)");
  const counter = Array.from({ length: repeatingCount });

  return (
    <Box
      m="1.5rem 2.5rem"
      backgroundColor={theme.palette.secondary}
      mt="23px"
      color={theme.palette.primary}
      display="grid"
      justifyContent={"space-evenly"}
      position={"static"}
      gridTemplateColumns={
        isExtraLarge
          ? "repeat(5, minmax(0, 1fr))"
          : isLarge
          ? "repeat(4, minmax(0, 1fr))"
          : isNonMobile
          ? "repeat(3, minmax(0, 1fr))"
          : isTab
          ? "repeat(2, minmax(0, 1fr))"
          : "repeat(1, minmax(0, 1fr))"
      }
      rowGap="25px"
      columnGap="1.0%"
      justifyItems={"center"}
      alignItems={"baseline"}
    >
      <RepeatedCardSkeleton repeatingCount={repeatingCount}/>
    </Box>
  );
}
export default CardSkeletonBase;
