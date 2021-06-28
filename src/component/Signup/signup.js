import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { Formik, Form } from "formik";
import * as yup from "yup";
import { AppBar } from "@material-ui/core";

let SignupSchema = yup.object().shape({
  source: yup.string().required("This field is required."),
  destination: yup.string().required("This field is required."),
  vehicle: yup
    .string()
    .min(1, "Pick any one car type.")
    .required("This field is required."),
  number: yup
    .number()
    .positive()
    .integer()
    .min(4, "Password is too short.")
    .max(7, "Password is too long."),
});

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    justifyContent: "center",
  },
}));

let Signup = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <AppBar
        className={classes.title}
        style={{ minHeight: "10vh", backgroundColor: "#000112" }}
      >
        Place your Bid (1/4 step)
      </AppBar>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik
          initialValues={{
            source: "",
            destination: "",
            vehicle: "",
            number: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.source && touched.source}
                    autoComplete="source"
                    name="source"
                    variant="outlined"
                    fullWidth
                    value={props.source}
                    onChange={(e) => props.changeSOURCE(e.target.value)}
                    id="source"
                    label="Source Location *"
                    autoFocus
                    helperText={
                      errors.source && touched.source ? errors.source : null
                    }
                  />
                  {props.errors.source !== "" ? (
                    <label style={{ color: "red" }}>
                      {props.errors.source}
                    </label>
                  ) : null}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.destination && touched.destination}
                    variant="outlined"
                    fullWidth
                    value={props.destination}
                    onChange={(e) => props.changeDESTINATION(e.target.value)}
                    id="destination"
                    label="Destination *"
                    name="destination"
                    autoComplete="lname"
                    helperText={
                      errors.destination && touched.destination
                        ? errors.destination
                        : null
                    }
                  />
                  {props.errors.destination !== "" ? (
                    <label style={{ color: "red" }}>
                      {props.errors.destination}
                    </label>
                  ) : null}
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Enter Car type *
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label=" Enter Car type *"
                      value={props.vehicle}
                      onChange={(e) => props.changeVEHICLE(e.target.value)}
                    >
                      <MenuItem value="" />
                      <MenuItem value="HatchBack">HatchBack</MenuItem>
                      <MenuItem value="Sedan">Sedan</MenuItem>
                      <MenuItem value="SUV">SUV</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    style={
                      props.errors.number === "" ? { borderColor: "red" } : null
                    }
                    error={errors.number && touched.number}
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={props.number}
                    onChange={(e) => props.changeNUMBER(e.target.value)}
                    name="travellers"
                    label="Number of Travellers *"
                    id="travellers"
                    helperText={
                      errors.number && touched.number ? errors.number : null
                    }
                  />
                  {props.errors.number !== "" ? (
                    <label style={{ color: "red" }}>
                      {props.errors.number}
                    </label>
                  ) : null}
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={props.postData.number.length < 1 || props.postData.vehicle.length < 1}
                className={classes.submit}
                onClick={props.submit}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    postData: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeSOURCE: (value) => dispatch({ type: "SOURCE", payload: value }),
    changeDESTINATION: (value) =>
      dispatch({ type: "DESTINATION", payload: value }),
    changeVEHICLE: (value) => dispatch({ type: "VEHICLE", payload: value }),
    changeNUMBER: (value) => dispatch({ type: "NUMBER", payload: value }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));
