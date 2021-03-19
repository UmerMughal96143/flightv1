import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paymentDetails, postAllFormsData } from "../actions/form";
import { errorNotification } from "../utils/notification";
import { Link, Redirect } from "react-router-dom";
import Countdown, { formatTimeDelta } from "react-countdown";

const PaymentDetails = ({ history }) => {
  const dispatch = useDispatch();
  const { peoplesData, data , totalPrice } = useSelector((state) => state.Form);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cardHolderName: "",
    cvv: "",
  });

  const { cardNumber, expiryMonth, expiryYear, cardHolderName, cvv } = formData;

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const paymentHandler = (e) => {
    e.preventDefault();
    if (!cardNumber || !expiryMonth || !expiryYear || !cardHolderName || !cvv) {
      errorNotification("Fill Required Fields");
      return;
    }
    let paymentData = {
      cardNumber,
      expiryDate: `${expiryMonth} / ${expiryYear}`,
      cardHolderName,
      cvv,
    };
    dispatch(paymentDetails(paymentData));
    let formData = {
      peoplesData,
      data,
      paymentData,
    };
    dispatch(postAllFormsData(formData, history));
    // history.push("/bookingcomplete");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Redirect to='/' />
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

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
                <form>
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
                  <div className="Payment-form-row">
                    <p>Expiry Date*</p>
                    {/* <div class="expiration"> */}
                      <span class="expiration-input-wrapper">
                        <input
                          type="text"
                          name="expiryMonth"
                          placeholder="MM"
                          maxlength="2"
                          size="2"
                          required="true"
                          class="input-month"
                          onChange={(e) => onFormChange(e)}
                          value={expiryMonth}
                          style={{textAlign : 'center' , marginRight : '7px'}}
                        />
                        <input
                          type="text"
                          name="expiryYear"
                          placeholder="YY"
                          maxlength="2"
                          size="2"
                          required="true"
                          class="input-year"
                          onChange={(e) => onFormChange(e)}
                          value={expiryYear}
                          style={{textAlign : 'center'}}

                        />
                      </span>
                    {/* </div> */}
                  </div>
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
                </form>
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
