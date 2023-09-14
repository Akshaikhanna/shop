import React from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { EMAIL_REGEX, ERROR_MESSAGE } from "./Error";

const StyledCard = styled(Grid)`
  width: 100%;
  max-width: 400px;
  padding: 20px;
`;

const StyledForm = styled("form")`
  width: 100%;
`;

const StyledButton = styled(Button)`
  margin-top: 16px;
`;

// validation for email and password, store the error message in empty object.
const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = ERROR_MESSAGE.EMAIL_REQUIRED;
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = ERROR_MESSAGE.INVALID_EMAIL;
  } else if (values.email.length > 30) {
    errors.email = ERROR_MESSAGE.LONG_EMAIL;
  }

  if (!values.password) {
    errors.password = ERROR_MESSAGE.PASSWORD_REQUIRED;
  } else if (values.password.length < 8) {
    errors.password = ERROR_MESSAGE.INVALID_PASSWORD;
  }

  return errors;
};

const Sign = () => {
  const nav = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    nav("/product");
  };

  // Applied custom validation
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <StyledCard>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <StyledForm onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{mt: 5}}>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                helperText={formik.touched.email && formik.errors.email}
                inputProps={{ maxLength: 30 }} // Set max length to 30 characters
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={formik.touched.password && formik.errors.password}
                inputProps={{ maxLength: 8 }} // Set max length to 8 characters
              />
            </Grid>
          </Grid>
          <StyledButton type="submit" variant="contained" color="primary">
            Submit
          </StyledButton>
        </StyledForm>
      </StyledCard>
    </Container>
  );
};

export default Sign;
