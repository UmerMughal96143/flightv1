import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emerchantPay,
  paymentDetails,
  postAllFormsData,
} from "../actions/form";

const PaymentSuccess = ({history}) => {
  const {
    peoplesData,
    data,
    totalPrice,
    appointmentDate,
    loading,
  } = useSelector((state) => state.Form);
  const dispatch = useDispatch();

  useEffect(() => {
    let formData = {
      peoplesData,
      data,
      appointmentDate: appointmentDate,
      amountPaid: totalPrice,
    };
    dispatch(postAllFormsData(formData, history));
  }, []);
  return <div></div>;
};

export default PaymentSuccess;
