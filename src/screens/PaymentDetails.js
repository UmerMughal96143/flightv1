import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emerchantPay, paymentDetails, postAllFormsData } from "../actions/form";
import { errorNotification } from "../utils/notification";
import { Link, Redirect } from "react-router-dom";
import Countdown, { formatTimeDelta, zeroPad } from "react-countdown";


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
  const { peoplesData, data, totalPrice, appointmentDate ,loading} = useSelector(
    (state) => state.Form
  );
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolderName: "",
    cvv: "",
  });

  const [expiryYear, setExpiryYear] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");

  const { cardNumber, cardHolderName, cvv } = formData;

  const onFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const {paymentApiData} = useSelector((s) => s.Form)
  useEffect(() => {

    dispatch(emerchantPay())
  },[])

  const paymentHandler = (e) => {
   
    // dispatch(paymentDetails(paymentData));
    // let formData = {
    //   peoplesData,
    //   data,
    //   paymentData,
    //   appointmentDate: appointmentDate,
    //   amountPaid: totalPrice,
    // };
    // dispatch(postAllFormsData(formData, history));
    // history.push("/bookingcomplete");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

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
            {/* <div class="Payment-Details-wrapper">
              <p class="Payment-Details-heading">
                Your appointment has been temporarily secured for the following
                <br />
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
                <form className="appointment-form">
                  <div class="form-group">
                    <p>Card number*</p>
                    <input
                      type="text"
                      class="form-control"
                      name="cardNumber"
                      onChange={(e) => onFormChange(e)}
                      value={cardNumber}
                    />
                  </div>
                  <div className="form-group">
                    <p>Expiry Date*</p>
                    {/* <div class="expiration"> */}
                    {/* <span class="expiration-input-wrapper">
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
                            style={{textAlign : 'center' , marginRight : '7px' , width : '90px'}}
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
                            style={{textAlign : 'center',width : '90px'}}

                          />
                        </span> */}
                    {/* </div> */}
                    {/* <div className="form-row departure-date-box">
                      <div className="form-group">
                        <div className="month-select">
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            onChange={(e) => setExpiryMonth(e.target.value)}
                          >
                            <option value="">MM</option>
                            {monthArray.map((m, ind) => (
                              <option key={ind} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <span>/</span>
                      <div className="form-group">
                        <div className="month-select">
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            onChange={(e) => setExpiryYear(e.target.value)}
                          >
                            <option value=""> YY </option>
                            {startYearArray.map((m, ind) => (
                              <option key={ind} value={m}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <p>Cardholder name*</p>
                    <input
                      type="text"
                      class="form-control"
                      name="cardHolderName"
                      onChange={(e) => onFormChange(e)}
                      value={cardHolderName}
                    />
                  </div>
                  <div class="form-group">
                    <p>CVV*</p>
                    <input
                      type="text"
                      class="form-control"
                      name="cvv"
                      onChange={(e) => onFormChange(e)}
                      value={cvv}
                    />
                  </div>
                  <div class="form-group">
                    <div className="Billing-address">
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
                </form>
              </div>
            </div> */}
            <iframe src={paymentApiData?.redirect_url}></iframe>          
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
                  {loading  ? <div class="spinner-border text-info" role="status">
                    <span class="sr-only">Loading...</span>
                  </div> : 'Complete Payment'}
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
