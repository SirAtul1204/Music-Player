import { Typography, TextField, Button, Paper, Grid, Box } from "@mui/material";
import { emailSchema, nameSchema, passwordSchema } from "@utils/zodSchemas";
import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openToast } from "@redux/toastSlice";
import Service from "@utils/service";
import Loader from "@components/Loader";
import useAuth from "@hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const isAuth = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isNameError, setNameError] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);
  const [isConfirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (
      isNameError ||
      isEmailError ||
      isPasswordError ||
      isConfirmPasswordError
    ) {
      dispatch(
        openToast({ message: "Enter all valid details", severity: "error" })
      );
      return;
    }

    const res = await Service.register({ name, email, password });
    console.log(res);
    if (res.isSuccess) {
      dispatch(openToast({ message: res.message, severity: "success" }));
      navigate("/login");
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
    return <Loader message="Submitting Details...." />;
  }

  return (
    <Box
      sx={{
        height: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <Grid item>
          <Typography variant="h6">
            Fill the following details to create an account
          </Typography>
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="center"
          direction="column"
          gap={2}
        >
          <Grid item width={400}>
            <form onSubmit={handleRegister}>
              <Paper elevation={10} sx={{ paddingX: 2, paddingY: 3 }}>
                <Grid container direction="column" gap={2}>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Name"
                      fullWidth
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={isNameError}
                      onBlur={() =>
                        setNameError(!nameSchema.safeParse(name).success)
                      }
                      helperText={isNameError ? "Name is required" : ""}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Email"
                      fullWidth
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={isEmailError}
                      onBlur={() =>
                        setEmailError(!emailSchema.safeParse(email).success)
                      }
                      helperText={isEmailError ? "Enter a valid Email" : ""}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Password"
                      fullWidth
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      error={isPasswordError}
                      onBlur={() =>
                        setPasswordError(
                          !passwordSchema.safeParse(password).success
                        )
                      }
                      helperText={
                        isPasswordError
                          ? "Password must contain 4 characters"
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Confirm Password"
                      fullWidth
                      required
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      error={isConfirmPasswordError}
                      onBlur={() =>
                        setConfirmPasswordError(
                          password === confirmPassword ? false : true
                        )
                      }
                      helperText={
                        isConfirmPasswordError ? "Passwords don't match" : ""
                      }
                    />
                  </Grid>
                  <Grid item alignSelf="center">
                    <Button variant="contained" type="submit">
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </Grid>
          <Grid item>
            <Typography>
              Already have an account?
              <Button onClick={() => navigate("/login")}>Login</Button>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
