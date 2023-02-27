import Loader from "@components/Loader";
import { Typography, TextField, Button, Box, Paper, Grid } from "@mui/material";
import { openToast } from "@redux/toastSlice";
import Service from "@utils/service";
import { emailSchema, passwordSchema } from "@utils/zodSchemas";
import { FormEvent, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useAuth from "@hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const isAuth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (isEmailError || isPasswordError) {
      dispatch(
        openToast({ message: "Enter Valid Details", severity: "error" })
      );
      return;
    }
    const res = await Service.login({ email, password });
    if (res.isSuccess) {
      dispatch(openToast({ message: res.message, severity: "success" }));
      navigate("/");
    } else {
      setLoading(false);
      dispatch(openToast({ message: res.message, severity: "error" }));
    }
  };

  if (isAuth === null) {
    return <Loader />;
  }

  if (isAuth) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <Loader message="Submitting details..." />;
  }

  return (
    <Box sx={{ height: "100svh", display: "flex", alignItems: "center" }}>
      <Grid
        container
        justifyContent="center"
        gap={2}
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <Typography variant="h6" textAlign="center">
            Please enter your Email and Password to continue
          </Typography>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center">
          <Grid item width={400}>
            <form onSubmit={handleLogin}>
              <Paper elevation={10} sx={{ paddingX: 2, paddingY: 3 }}>
                <Grid container direction="column" gap={2}>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Email"
                      type="email"
                      fullWidth
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={isEmailError}
                      helperText={
                        isEmailError ? "Please enter a valid email" : ""
                      }
                      onBlur={() =>
                        setIsEmailError(!emailSchema.safeParse(email).success)
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Password"
                      type="password"
                      fullWidth
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={isPasswordError}
                      helperText={
                        isPasswordError ? "Must have at least 4 characters" : ""
                      }
                      onBlur={() =>
                        setIsPasswordError(
                          !passwordSchema.safeParse(password).success
                        )
                      }
                    />
                  </Grid>
                  <Grid item alignSelf="center">
                    <Button variant="contained" type="submit">
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </Grid>
        </Grid>
        <Grid item>
          <Typography textAlign="center">
            Don't have an account?{" "}
            <Button size="small" onClick={() => navigate("/register")}>
              Create Now
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
