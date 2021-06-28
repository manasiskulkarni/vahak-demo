import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
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

const Submit = (props) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <AppBar
        className={classes.title}
        style={{ minHeight: "10vh", backgroundColor: "#000112" }}
      >
        Summary & Submit Bid (4/4 step)
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={props.submitForm}
                disabled= {props.disabled}
              >
                Submit
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

export default connect(mapStateToProps)(withRouter(Submit));
