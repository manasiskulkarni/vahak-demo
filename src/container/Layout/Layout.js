import React, { Component } from "react";
import BidSignup from "../../component/Signup/signup";
import Details from "../../component/Details/details";
import Next from "../../component/Phoneadd/phoneadd";
import Otp from "../../component/Otp/otp";
import Submit from "../../component/Submit/submit";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    errors: {},
    otp: "",
    disabled: false,
  };

  changeOtp = (e) => {
    this.setState({ otp: e.target.value });
    if (e.target.value === "1234") this.props.history.push("/submit");
  };

  submit = (e) => {
    e.preventDefault();
    const { vehicle, number, source, destination } = this.props.postData;
    let errors = { vehicle: "", number: "", source: "", destination: "" };

    if (vehicle === "SUV" && number > 6) {
      errors.number =
        "Maximum number of passenger should not be greater than 6 for SUV car type";
      console.log(errors.number);
    } else if ((vehicle === "HatchBack" || vehicle === "Sedan") && number > 4)
      errors.number =
        "Maximum number of passenger should not be greater than 4 for HatchBack or Sedan car type";
    else if (source.length < 1) errors.source = "This field is required";
    else if (destination.length < 1)
      errors.destination = "This field is required";
    else {
      this.props.history.push("/details");
    }
    this.setState({ errors: errors });
  };

  submitDetails = (e) => {
    e.preventDefault();
    this.props.history.push("/phoneadd");
  };

  submitBid = (e) => {
    e.preventDefault();
    this.props.history.push("/otp");
  };

  submitForm = (e) => {
    const list = {
      source: this.props.postData.source,
      destination: this.props.postData.destination,
      vehicle: this.props.postData.vehicle,
      number: this.props.postData.number,
      phone: this.props.postData.phone,
      cost: this.props.postData.cost,
    };
    axios
      .post(
        "https://post-get-64282-default-rtdb.firebaseio.com/vahak.json",
        list
      )
      .then((response) => console.log(response));
    alert("Congragulations! Information sent to database.");
    this.setState({ disabled: true });
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <BidSignup submit={this.submit} errors={this.state.errors} />
          </Route>
          <Route path="/details">
            <Details submit={this.submitDetails} />
          </Route>
          <Route path="/phoneadd">
            <Next submit={this.submitBid} />
          </Route>
          <Route path="/otp">
            <Otp
              otp={this.state.otp}
              changeOtp={this.changeOtp}
              submitForm={this.submitForm}
            />
          </Route>
          <Route path="/submit">
            <Submit
              submitForm={this.submitForm}
              disabled={this.state.disabled}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postData: state,
  };
};

export default connect(mapStateToProps)(withRouter(Layout));
