import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { postAllFormsData } from "../actions/form";

import Countdown, { formatTimeDelta, zeroPad } from "react-countdown";

import Stripe from "../components/Stripe";

let monthArray = [];
for (let i = 1; i <= 12; i++) {
  monthArray.push(i);
}

let startYear = 21;
let startYearArray = [];
for (let i = 1; i <= 12; i++) {
  startYearArray.push(startYear++);
}

const PaymentDetails = ({ history }) => {
  const dispatch = useDispatch();
  const {
    peoplesData,
    data,
    totalPrice,
    appointmentDate,
    loading,
  } = useSelector((state) => state.Form);

  const { paymentApiData } = useSelector((s) => s.Form);
  useEffect(() => {
    if (paymentApiData?.id) {
      let formData = {
        peoplesData,
        data,
        appointmentDate: appointmentDate,
        amountPaid: totalPrice,
      };
      dispatch(postAllFormsData(formData, history));
    }
  }, []);

  const paymentHandler = (e) => {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Redirect to="/" />;
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  let appointmentDateFromDb = appointmentDate?.split(" ");

  return (
    <div>
      <section>
        <div class="Test-Location-box">
          <h3>Payment Details</h3>
        </div>
      </section>
      <div className="wrapper">
        <div class="site-container paymentdetails-wrapper">
          <section>
            <div class="Payment-Details-wrapper">
              <p class="Payment-Details-heading">
                Your appointment has been temporarily secured for the following
                date:{" "}
                <span>
                  {appointmentDate && appointmentDateFromDb[4]}{" "}
                  {appointmentDate && appointmentDateFromDb[5]}{" "}
                  {appointmentDate && appointmentDateFromDb[6]}
                </span>
              </p>
              <p class="Payment-Details-subheading">
                Your appointment will be held for{" "}
                <Countdown
                  zeroPadTime={2}
                  date={Date.now() + 600000}
                  // onComplete={Completionist}
                  renderer={renderer}
                />
              </p>
              <div class="Payment-Details-form">
                <h3>
                  Payment due: <span>£{totalPrice}.00</span>
                </h3>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Stripe />
    </div>
  );
};

export default PaymentDetails;
