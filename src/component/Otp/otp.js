import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import InputBase from "@material-ui/core/InputBase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import OtpCss from "./otp.css";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AppBar from "@material-ui/core/AppBar";

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

const Otp = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <AppBar
        className={classes.title}
        style={{ minHeight: "10vh", backgroundColor: "#000112" }}
      >
        Verify OTP (3/4 step)
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
          {() => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                  <Typography style={{ color: "grey", fontSize: "14px" }}>
                    Journey Details
                  </Typography>
                  <Typography style={{ textTransform: "capitalize" }}>
                    {props.postData.source}- {props.postData.destination}{" "}
                  </Typography>
                  <Typography>
                    {props.postData.number} Persons, {props.postData.vehicle}
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
              <Grid container spacing={2} style={{ minHeight: "20vh" }}>
                <Grid item xs={12} sm={9}>
                  <Typography
                    style={{
                      color: "grey",
                      fontSize: "14px",
                      marginBottom: "10px",
                    }}
                  >
                    BID DETAILS
                  </Typography>
                  <Grid>
                    <Typography style={{ fontWeight: "bold" }}>
                      {props.postData.phone}
                    </Typography>
                    <Typography>
                      Karuppasamy Orilli <br /> Call me immidiately to finalize
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Grid>
                    <Typography style={{ fontWeight: "bold" }}>
                      {" "}
                      ₹{props.postData.cost}{" "}
                    </Typography>
                    <Typography style={{ color: "grey", fontSize: "14px" }}>
                      Fiexd Price
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <hr />
              <Grid item xs={12} style={{ marginTop: "40px" }}>
                <Typography>
                  We've sent an OTP to your mobile number. Please enter it below
                  to submit your bid <strong>{props.postData.phone}</strong>
                  <Button
                    id="edit"
                    label="edit"
                    name="edit"
                    style={{ color: "blue", textTransform: "lowercase" }}
                    onClick={() => props.history.push("/phoneadd")}
                  >
                    ✎edit
                  </Button>{" "}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "40px" }} id="outer">
                <Grid id="inner">
                  <InputBase
                    id="partitioned"
                    inputProps={{ "aria-label": "naked", maxLength: 4 }}
                    className={OtpCss}
                    value={props.otp}
                    onChange={(e) => props.changeOtp(e)}
                  />
                </Grid>
              </Grid>
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

export default connect(mapStateToProps)(withRouter(Otp));
