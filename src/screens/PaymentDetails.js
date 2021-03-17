import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentDetails, postAllFormsData } from "../actions/form";
import { errorNotification } from "../utils/notification";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";
import Card from "../components/Card";

const PaymentDetails = ({ history }) => {
  const dispatch = useDispatch();
  const { peoplesData, data } = useSelector((state) => state.Form);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cardHolderName: "",
    cvv: "",
  });

  const { cardNumber, expiryDate, cardHolderName, cvv } = formData;

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function clearNumber(value = "") {
    return value.replace(/\D+/g, "");
  }
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = async (values) => {
  console.log("🚀 ~ file: PaymentDetails.js ~ line 30 ~ onSubmit ~ values", values)
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  function formatExpirationDate(value) {
    const clearValue = clearNumber(value)
  
    if (clearValue.length >= 3) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`
    }
  
    return clearValue
  }

  const paymentHandler = (e) => {
    e.preventDefault();
    if (!cardNumber || !expiryDate || !cardHolderName || !cvv) {
      errorNotification("Fill Required Fields");
      return;
    }
    let paymentData = {
      cardNumber,
      expiryDate,
      cardHolderName,
      cvv,
    };
    dispatch(paymentDetails(paymentData));
    let formData = {
      peoplesData,
      data,
    };
    dispatch(postAllFormsData(formData, history));
    // history.push("/bookingcomplete");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section>
        <div class="Test-Location-box">
          <h3>Payment Details</h3>
        </div>
      </section>
      <div className="wrapper">
        <div class="site-container mt-5">
          <section>
            <div class="Payment-Details-wrapper">
              <p class="Payment-Details-heading">
                Your appointment has been temporarily secured for the following
                <br />
                date: <span> 21 February 2021</span>
              </p>
              <p class="Payment-Details-subheading">
                Your appointment will be held for <span>00:00:00</span>
              </p>
              <div class="Payment-Details-form">
                <h3>
                  Payment due: <span>£298.00</span>
                </h3>
                  <div class="Payment-form-row">
                    <p>Card number*</p>
                    <input
                      type="text"
                      class="form-control"
                      name="cardNumber"
                      onChange={(e) => onFormChange(e)}
                      value={cardNumber}
                    />
                  </div>
                  <Form
                    onSubmit={onSubmit}
                    render={({
                      handleSubmit,
                      form,
                      submitting,
                      pristine,
                      values,
                      active,
                    }) => {
                      

                      return (
                        <form onSubmit={handleSubmit}>
                          <div>
                            <Field
                              name="expiry"
                              component="input"
                              type="text"
                              pattern="\d\d/\d\d"
                              placeholder="Valid Thru"
                              format={formatExpirationDate}
                            />
                          </div>
                          <div className="buttons">
                            <button type="submit" disabled={submitting}>
                              Submit
                            </button>
                            
                          </div>
                        </form>
                      );
                    }}
                  />
                  <div class="Payment-form-row">
                    <p>Cardholder name*</p>
                    <input
                      type="text"
                      class="form-control"
                      name="cardHolderName"
                      onChange={(e) => onFormChange(e)}
                      value={cardHolderName}
                    />
                  </div>
                  <div class="Payment-form-row">
                    <p>CVV*</p>
                    <input
                      type="text"
                      class="form-control"
                      name="cvv"
                      onChange={(e) => onFormChange(e)}
                      value={cvv}
                    />
                  </div>
                  <div class="Payment-form-row Billing-address">
                    <p>
                      Billing address{" "}
                      <i
                        class="fas fa-pen"
                        onClick={() => {
                          localStorage.setItem("editaddress", true);
                          history.push("/appointment");
                        }}
                      ></i>
                    </p>
                    <div class="travelling-tickets">
                      <p>
                        {" "}
                        {data[2]?.address1} {data[2]?.address2}{" "}
                        {data[2]?.address3} {data[2]?.city} {data[2]?.country}{" "}
                        {data[2]?.postCode}{" "}
                      </p>
                    </div>
                  </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <footer>
        <div className="site-container form_buttons">
          <div className="Appointment-modle-footer col-md-6 col-12 ml-auto pl-0 pr-0">
            <div className="row flight-time-footer-buttons ml-0">
              <div className="back-btn-div col-md-4 col-5 footer-btn pr-0 m-auto">
                <Link to="appointmentsummary">
                  <button type="submit" class="Back-btn">
                    Back
                  </button>
                </Link>
              </div>
              <div class="accept-turm-condition col-md-8 col-6 footer-btn pl-0 m-auto">
                <button class="Submit-to-checkout" onClick={paymentHandler}>
                  Complete Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PaymentDetails;
