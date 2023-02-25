import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";

const username = "Atul";

const Nav = () => {
  return (
    <Box
      sx={{
        paddingX: 2,
        paddingTop: 3,
        borderBottom: "2px solid #fff",
        paddingBottom: 1,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <Typography>Hi, {username}</Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="error">
            Logout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Nav;
