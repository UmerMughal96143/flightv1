import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAllFormsData } from "../actions/form";

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

  return (
    <div>
      <Stripe />
    </div>
  );
};

export default PaymentDetails;
