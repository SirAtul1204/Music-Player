import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { openToast } from "@redux/toastSlice";
import Service from "@utils/service";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const username = "Atul";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await Service.logout();
    console.log(res);
    if (res.isSuccess) {
      dispatch(openToast({ message: "Logged out", severity: "success" }));

      navigate("/login");
    }
  };

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
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Nav;
