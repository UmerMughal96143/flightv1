import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorNotification } from "../utils/notification";
import {
  removePersons,
  searchPersonForEdit,
  searchPersonForRemove,
  setPrice,
} from "../actions/form";
import Modall from "../components/Modal";
import { Link } from "react-router-dom";
import SecondModal from "../components/SecondModal";
import { date } from "yup/lib/locale";

const AppointmentSummary = ({ history }) => {
  const { peoplesData, data ,appointmentDate} = useSelector((state) => state.Form);
  const [condition1, setCondition1] = useState(false);
  const [condition2, setCondition2] = useState(false);
  const [modal, setModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [totalPrice, setTotalPRice] = useState("");
  const [hideAmount, setHideAmount] = useState(false);

  let homeTestForOnePerson = 149 * 1;
  let homeTestForTwoPerson = 149 * 2;
  let homeTestForThirdPerson = 139 * 3;
  let homeTestForFourthPerson = 139 * 4;
  let homeTestForFifthPerson = 129 * 5;
  let homeTestForSixthPerson = 129 * 6;
  let homeTestForSeventhPerson = 119 * 7;
  let homeTestForEighthPerson = 119 * 8;
  let homeTestForNinthPerson = 109 * 9;
  let homeTestForTenthPerson = 99 * 10;

  let driveThroughTestForOnePerson = 80 * 1;
  let driveThroughTestForTwoPerson = 80 * 2;
  let driveThroughTestForThirdPerson = 80 * 3;
  let driveThroughTestForFourthPerson = 80 * 4;
  let driveThroughTestForFifthPerson = 80 * 5;
  let driveThroughTestForSixthPerson = 80 * 6;
  let driveThroughTestForSeventhPerson = 80 * 7;
  let driveThroughTestForEighthPerson = 80 * 8;
  let driveThroughTestForNinthPerson = 80 * 9;
  let driveThroughTestForTenthPerson = 80 * 10;

  useEffect(() => {
    if (data[1]?.testLocation == "Home Visit") {
      if (peoplesData.length == 1) {
        setTotalPRice(homeTestForOnePerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 2) {
        setTotalPRice(homeTestForTwoPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 3) {
        setTotalPRice(homeTestForThirdPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 4) {
        setTotalPRice(homeTestForFourthPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 5) {
        setTotalPRice(homeTestForFifthPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 6) {
        setTotalPRice(homeTestForSixthPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 7) {
        setTotalPRice(homeTestForSeventhPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 8) {
        setTotalPRice(homeTestForEighthPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 9) {
        setTotalPRice(homeTestForNinthPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 10) {
        setTotalPRice(homeTestForTenthPerson);
        setHideAmount(false);
      }
    }
    if (peoplesData.length == 0) {
      setHideAmount(true);
    }
    if (data[1].testLocation == "Drive through") {
      if (peoplesData.length == 1) {
        setTotalPRice(driveThroughTestForOnePerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 2) {
        setTotalPRice(driveThroughTestForTwoPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 3) {
        setTotalPRice(driveThroughTestForThirdPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 4) {
        setTotalPRice(driveThroughTestForFourthPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 5) {
        setTotalPRice(driveThroughTestForFifthPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 6) {
        setTotalPRice(driveThroughTestForSixthPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 7) {
        setTotalPRice(driveThroughTestForSeventhPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 8) {
        setTotalPRice(driveThroughTestForEighthPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 9) {
        setTotalPRice(driveThroughTestForNinthPerson);
        setHideAmount(false);
      }
      if (peoplesData.length == 10) {
        setTotalPRice(driveThroughTestForTenthPerson);
        setHideAmount(false);
      }
    }
  }, [peoplesData.length]);

  useEffect(() => {
    if (totalPrice && !hideAmount) {
      dispatch(setPrice(totalPrice));
    }
  }, [totalPrice]);

  const dispatch = useDispatch();

  const proceedToSummaryHandler = (e) => {
    e.preventDefault();

    if (!condition1 || !condition2) {
      errorNotification("Missing Terms and Conditions");
      return;
    }
    history.push("/paymentdetails");
  };

  if (peoplesData) {
    localStorage.setItem("peoples", JSON.stringify(peoplesData));
  }

  const personRemoveHandler = (id) => {
    dispatch(removePersons(id));

    setShowSecondModal(true);
  };

  const editHandler = (id) => {
    dispatch(searchPersonForEdit(id));
    history.push("/peoplebooking");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  return (
    <div>
      <section class="Appointment-Summary">
        <div class="Test-Location-box">
          <h3>Appointment Summary</h3>
        </div>
        <div class="breaking-news-box">
          <h4 class="breaking-news">PCR Fit to Fly</h4>
          <p class="breaking-news-dec">
            You are booking for {localStorage.getItem("numberOfUsers")} people{" "}
            <br />
            between {appointmentDate}
          </p>
        </div>
      </section>
      <div className="wrapper">
        <div class="site-container mt-5 mb-4">
          <section>
            <div class="Payment-Details-wrapper">
              <div class="mini-heading">
                <p>
                  Please check your appointment <br /> details carefully below
                </p>
              </div>
              <div class="appointment-derails-wrapper">
                {peoplesData.map((data) => {
                  return (
                    <div class="person-details">
                      <div class="person-info">
                        <h3 class="person-heading">Patient Name : {data.Person} </h3>
                        <div class="Person-details-name">
                          <p>
                            {data.firstName} {data.lastName} - PCR Fit to Fly
                          </p>
                        </div>
                      </div>
                      <div class="person-personal-detail">
                        <div class="d-flex person-detail-flex-box">
                          <div class="col-6 pl-0">
                            <div class="person-heading-icon">
                              <h3 class="person-heading">Details</h3>
                              <i
                                class="fas fa-pen"
                                onClick={() => editHandler(data.id)}
                              ></i>
                            </div>
                          </div>
                          <div class="col-6 Remove-appointment-modle">
                            <button
                              type="button"
                              class="remove-btn "
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              onClick={() => {
                                setModal(true);
                                dispatch(searchPersonForRemove(data.id));
                              }}
                            >
                              Remove
                            </button>

                            {modal && (
                              <Modall
                                showModal={true}
                                closeModal={() => setModal(false)}
                                personRemoveHandler={() =>
                                  personRemoveHandler(data.id)
                                }
                              />
                            )}
                          </div>
                        </div>
                        <div class="Person-details-info">
                          <p>
                            Passport/ID card number :
                            <span> {data.passportIdCard}</span>
                          </p>
                          <p>
                            Email address: <span> {data.email}</span>
                          </p>
                          <p>
                            Mobile number:<span> {data.mobile}</span>
                          </p>
                        </div>
                        <div class="Person-requird-details">
                          <p>Documents required at appointment:</p>
                        </div>
                        <p class="Passport">Passport</p>
                      </div>
                    </div>
                  );
                })}

                {showSecondModal && <SecondModal showSecondModal={true} />}

                <div class="add-person">
                  <button
                    class="add-person-btn"
                    onClick={() => {
                      localStorage.setItem("addperson", true);
                      localStorage.removeItem("limit");
                      history.push("/peoplebooking");
                    }}
                  >
                    + Add another person
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section>
          {!hideAmount && (
            <div class="amount-due">
              <div class="container-fluid site-container">
                <div class="row">
                  <div class="col-6 amount-due-text">
                    <h3>Amount due</h3>
                  </div>
                  <div class="col-6 amount-due-price">
                    <h3>£{totalPrice}</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
        <section className="site-container">
          <div class="amount-due-points">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                onChange={(e) => setCondition1(e.target.checked)}
              />
              <p>
                I confirm I have checked the above and information and this is
                correct
              </p>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                onChange={(e) => setCondition2(e.target.checked)}
              />
              <p>
                I acknowledge that the date I have selected is appropriate for
                my plans, and I understand that my results may take up to 48
                hours after my test to arrive.
              </p>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <div className="site-container form_buttons">
          <div class="Appointment-modle-footer col-md-6 col-12 ml-auto pl-0 pr-0">
            <div className="row flight-time-footer-buttons ml-0">
              <div class="accept-turm-condition col-md-8 col-8 footer-btn pl-0 m-auto">
                <button
                  type="button"
                  class="Submit-to-checkout appointmentsummary"
                  onClick={(e) => proceedToSummaryHandler(e)}
                >
                  {" "}
                  Continue to Payment{" "}
                </button>
              </div>
              <div class="back-btn-div col-md-4 col-6 footer-btn pr-0 m-auto">
                <button type="submit" class="Back-btn">
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppointmentSummary;
