import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Checkbox from "@material-ui/core/Checkbox";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";

import { Formik, Form } from "formik";
import * as yup from "yup";

let SignupSchema = yup.object().shape({
  firstName: yup.string().required("This field is required."),
  lastName: yup.string().required("This field is required."),
  carType: yup
    .string()
    .min(1, "Pick any one car type.")
    .required("This field is required."),
  password: yup
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

const Details = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <AppBar
        className={classes.title}
        style={{ minHeight: "10vh", backgroundColor: "#000112" }}
      >
        Place your Bid (2/4 step)
      </AppBar>
      <CssBaseline />
      <div className={classes.paper}>
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
                <Grid item xs={12} sm={9}>
                  <Typography style={{ color: "grey", fontSize: "14px" }}>
                    Journey Details
                  </Typography>
                  <Typography style={{ textTransform: "capitalize" }}>
                    {props.postData.source}- {props.postData.destination}{" "}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button
                    id="edit"
                    label="edit"
                    name="edit"
                    style={{ color: "blue", textTransform: "lowercase" }}
                    onClick={() => props.history.push("/")}
                  >
                    ✎edit
                  </Button>
                </Grid>
              </Grid>
              <hr />
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "20vh" }}
              >
                <Grid item xs={3}>
                  <CurrencyTextField
                    error={errors.password && touched.password}
                    currencySymbol="₹"
                    placeholder="0"
                    outputFormat="string"
                    decimalCharacter="."
                    digitGroupSeparator=","
                    value={props.cost}
                    onChange={(e) => props.changeCOST(e.target.value)}
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
                style={{ minHeight: "15vh" }}
              >
                <Checkbox
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <Typography style={{ color: "grey", fontSize: "14px" }}>
                  Rate Negotiable
                </Typography>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={props.submit}
                disabled={props.postData.cost < 1}
              >
                Next
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
    changeCOST: (value) => dispatch({ type: "COST", payload: value }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Details));
