import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { atechyPayment, stripePayment } from "../actions/form";
import { withRouter } from "react-router";

import "./style.css";
import { Link } from "react-router-dom";

const Stripe = withRouter(({ history, pageType, reference_id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const {
    totalPrice,
    paymentApiData,
    loading,
    atechyPaymentStatus,
    atechySuccessUrl,
    atechyFailUrl,
  } = useSelector((s) => s.Form);
  const [loader, setloader] = useState(false);

  const handleSubmit = async (event, pageType) => {
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
    } else if (pageType == "myFlight") {
      const { id } = paymentMethod;
      const data = {
        id,
        totalPrice,
      };
      dispatch(stripePayment(data, history));
    } else {
      const { id } = paymentMethod;
      let data = {
        id,
        reference_id,
      };
      dispatch(atechyPayment(data));
      //Atechy COde
    }
  };

  useEffect(() => {
    if (atechySuccessUrl) {
      setloader(false);
      window.open(atechySuccessUrl, "_self");
    } else if (atechyFailUrl) {
      window.open(atechyFailUrl, "_self");
    }
  }, [atechySuccessUrl, atechyFailUrl]);

  return (
    <>
      <div className="stripe-form">
        <form className="stripe-main-form atechy-pay">
          <CardElement
            className="payment-form"
            options={{
              hidePostalCode: true,
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
                {pageType == "Atechy" ? (
                  loading || loader ? (
                    <div class="spinner-border text-info" role="status">
                      <span class="sr-only">Loading...</span>
                    </div>
                  ) : (
                    <button
                      className="Atechypay"
                      type="submit"
                      disabled={!stripe}
                      onClick={(e) => handleSubmit(e, pageType)}
                    >
                      Complete Payment
                    </button>
                  )
                ) : loader ? (
                  <div class="spinner-border text-info" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <button
                    className="Complete-Button"
                    type="submit"
                    disabled={!stripe}
                    onClick={(e) => handleSubmit(e, pageType)}
                  >
                    Complete Payment
                  </button>
                )}
                {/* {loading ? (
                  <div class="spinner-border text-info" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <button
                    className="Complete-Button"
                    type="submit"
                    disabled={!stripe}
                    onClick={(e) => handleSubmit(e, pageType)}
                  >
                    Complete Payment
                  </button>
                )} */}

                {/* {loader ? (
                  <div class="spinner-border text-info" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                ) : (
                  <button
                    className="Complete-Button"
                    type="submit"
                    disabled={!stripe}
                    onClick={(e) => handleSubmit(e, pageType)}
                  >
                    Complete Payment
                  </button>
                )} */}
              </div>

              {pageType == "myFlight" && (
                <div className="back-btn-div-stripe">
                  <Link to="/appointmentsummary">
                    <button>Back</button>
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </form>
      </div>
    </>
  );
});

export default Stripe;
