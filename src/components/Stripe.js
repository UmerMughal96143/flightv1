import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { stripePayment } from "../actions/form";
import { withRouter } from "react-router";

import "./style.css";
import { Link } from "react-router-dom";

const Stripe = withRouter(({ history }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { totalPrice } = useSelector((s) => s.Form);
  const [loader, setloader] = useState(false);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);
    setloader(true);
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      setloader(false);
    } else {
      const { id } = paymentMethod;
      const data = {
        id,
        totalPrice,
      };
      dispatch(stripePayment(data, history));
    }
  };

  return (
    <>
      <div className="stripe-form">
        <form className="stripe-main-form" onSubmit={handleSubmit}>
          <CardElement
            className="payment-form"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <footer>
            <div className="stripe-form-buttons">
              <div className="accept-turm-condition-stripe">
                {loader ? (
                  <div class="spinner-border text-info" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <button
                    className="Complete-Button"
                    type="submit"
                    disabled={!stripe}
                  >
                    Complete Payment
                  </button>
                )}
              </div>
              <div className="back-btn-div-stripe">
                <Link to="/appointmentsummary">
                  <button>Back</button>
                </Link>
              </div>
            </div>
          </footer>
        </form>
      </div>
    </>
  );
});

export default Stripe;
