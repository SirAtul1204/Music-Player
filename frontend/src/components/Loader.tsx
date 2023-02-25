import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/material";
import { LoaderProps } from "@utils/interfaces";
import { FC } from "react";

const Loader: FC<LoaderProps> = ({ message }) => {
  return (
    <Box
      sx={{
        height: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <CircularProgress />
      {message && <Typography>{message}</Typography>}
    </Box>
  );
};

export default Loader;
