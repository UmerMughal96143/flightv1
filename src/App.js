import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Appointment from "./screens/Appointment";
import Header from "./components/Header";
import AppointmentSummary from "./screens/AppointmentSummary";
import BookingCOmplete from "./screens/BookingComplete";
import FlightTime from "./screens/FlightTime";
import Landing from "./screens/Landing";
import PaymentDetails from "./screens/PaymentDetails";
import PeopleBooking from "./screens/PeopleBooking";
import Suggestions from "./screens/Suggestions";
import TermsConditions from "./screens/TermsConditions";
import TestLocation from "./screens/TestLocation";
import UserDetail from "./screens/UserDetail";
import Qrcode from "./screens/Qrcode";
import PaymentSuccess from "./screens/PaymentSuccess";
import PaymentFailure from "./screens/PaymentFailure";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentAtechy from "./screens/atechy/PaymentAtechy";

const App = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);
  return (
    <>
      <Elements stripe={stripePromise}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/appointmentsummary" component={AppointmentSummary} />
            <Route path="/bookingcomplete" component={BookingCOmplete} />
            <Route path="/flighttime" component={FlightTime} />
            <Route path="/appointment" component={Appointment} />
            <Route path="/paymentdetails" component={PaymentDetails} />
            <Route path="/peoplebooking" component={PeopleBooking} />
            <Route path="/suggestions" component={Suggestions} />
            <Route path="/termsconditions" component={TermsConditions} />
            <Route path="/testlocation" component={TestLocation} />
            <Route path="/userdetail" component={UserDetail} />
            <Route path="/qrcode" component={Qrcode} />
            <Route path="/paymentsuccess" component={PaymentSuccess} />
            <Route path="/paymentfail" component={PaymentFailure} />
            <Route path="/atechypay" component={PaymentAtechy} />
          </Switch>
        </Router>
      </Elements>
    </>
  );
};

export default App;
