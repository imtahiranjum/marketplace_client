import { useTheme } from "@emotion/react";
import { Box, Card, Skeleton, useMediaQuery } from "@mui/material";
import React from "react";

function RepeatedCardSkeleton({ repeatingCount }) {
  const theme = useTheme();
  const isExtraLarge = useMediaQuery("(min-width: 1920px)");
  const isLarge = useMediaQuery("(min-width: 1620px)");
  const isNonMobile = useMediaQuery("(min-width: 1070px)");
  const isTab = useMediaQuery("(min-width: 740px)");
  const counter = Array.from({ length: repeatingCount });
  return (
    <>
      {counter.map((item, index) => (
        <Card
          sx={{
            // backgroundImage: {profileImage}
            backgroundColor: theme.palette.secondary,
            borderRadius: "0.55rem",
            borderColor: "darkgrey",
            width: 320,
            height: 400,
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{
              height: 200,
              width: 310,
              alignItems: "center",
              "&:hover": {
                backgroundColor: "primary.secondary",
                opacity: [0.9, 0.8, 0.7],
                justifyItems: "center",
              },
            }}
          />
          <Skeleton width="10%" />
          <Skeleton width="40%" />
          <Skeleton width="60%" />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Card>
      ))}
    </>
  );
}

export default RepeatedCardSkeleton;
