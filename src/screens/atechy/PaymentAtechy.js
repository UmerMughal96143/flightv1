import React from "react";
import Stripe from "../../components/Stripe";

const PaymentAtechy = ({location}) => {
  let reference_id = location.search.split('=')[1]
  return (
    <div>
      <div class="Atechy-heading-box">
        <h3>Payment Details</h3>
      </div>
      <div className="Atechy-Payment-box">
        <div class="Payment-Details-form">
          <h3 className="Atechy-payment-heading">
            Payment due: <span>£150.00</span>
          </h3>
        </div>
      </div>
      <Stripe pageType="Atechy" reference_id={reference_id}/>
    </div>
  );
};

export default PaymentAtechy;
