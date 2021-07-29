import React, { useState, useContext } from "react";
//  import { useQuery } from "react-query";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import { AlertContext } from "../../Context/AlertContext/AlertContext";
import { useStyles } from "../styles";
import { initialValues, validationSchema } from "./formInitials";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { loginApi } from "../../Context/AuthContext/Api";

export default function SignIn() {
  const history = useHistory();
  const classes = useStyles();
  const [passwordType, setPasswordType] = useState("password");
  const { setUser, setIsSignedIn, setLoading } = useContext(AuthContext);
  const { showServerError, showLoginError } = useContext(AlertContext);

  const handleClickShowPassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          // Loader();
          setLoading(true);
          const user = await loginApi(values);
          setIsSignedIn(true);
          setUser(user);
          setLoading(false);

          history.push("/");
          // Loader();
        } catch (e) {
          // Loader();
          if (e.response && e.response.status === 400) {
            setLoading(false);

            showLoginError();
          } else {
            setLoading(false);
            showServerError();
          }
        }
      },
    });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            error={errors.email && touched.email ? true : false}
            onBlur={handleBlur}
            helperText={errors.email && touched.email ? errors.email : ""}
            value={values.email}
            onChange={handleChange}
            name="email"
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={errors.password && touched.password ? true : false}
            onBlur={handleBlur}
            helperText={
              errors.password && touched.password ? errors.password : ""
            }
            value={values.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={passwordType}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {passwordType === "password" ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/signup">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
