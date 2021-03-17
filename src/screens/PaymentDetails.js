import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAllFormsData } from "../actions/form";
import { errorNotification } from "../utils/notification";
import { Link } from "react-router-dom";

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

  const paymentHandler = (e) => {
    e.preventDefault();
    if (!cardNumber || !expiryDate || !cardHolderName || !cvv) {
      errorNotification("Fill Required Fields");
      return;
    }
    let formData = {
      peoplesData,
      data,
    };
    dispatch(postAllFormsData(formData,history));
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
                  <div class="Payment-form-row">
                    <p>Expiry Date*</p>
                    <input
                      type="date"
                      class="form-control"
                      name="expiryDate"
                      onChange={(e) => onFormChange(e)}
                      value={expiryDate}
                    />
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
                      Billing address <i class="fas fa-pen"></i>
                    </p>
                    <div class="travelling-tickets">
                      <p>14 Fernview Drive, Ramsbottom, BL0 9XB UK, England.</p>
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
