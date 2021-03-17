import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { errorNotification } from "../utils/notification";
import { removePersons, searchPersonForEdit } from "../actions/form";
import Modall from "../components/Modal";
import { Link } from "react-router-dom";

const AppointmentSummary = ({ history }) => {
  const { peoplesData } = useSelector((state) => state.Form);
  const [condition1, setCondition1] = useState(false);
  const [condition2, setCondition2] = useState(false);
  const [modal, setModal] = useState(false);

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
  };

  const editHandler = (id) => {
    dispatch(searchPersonForEdit(id));
    history.push("/peoplebooking");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <section class="Appointment-Summary">
        <div class="Test-Location-box">
          <h3>Appointment Summary</h3>
        </div>
        <div class="breaking-news-box">
          <h4 class="breaking-news">PCR Fit to Fly</h4>
          <p class="breaking-news-dec">
            You are booking for 3 people 12th February 2021 between 8am - 4pm
          </p>
        </div>
      </section>
      <div className="wrapper">
        <div class="site-container mt-5 mb-4">
          <section>
            <div class="Payment-Details-wrapper">
              <div class="mini-heading">
                <p>
                  Please check your appointment <br /> derails carefully below
                </p>
              </div>
              <div class="appointment-derails-wrapper">
                {peoplesData.map((data) => {
                  return (
                    <div class="person-details">
                      <div class="person-info">
                        <h3 class="person-heading">Person {data.Person} </h3>
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
                            {/* <button
                              type="button"
                              class="remove-btn "
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              onClick={() => setModal(true)}
                            >
                              Remove
                            </button>




                              
                            {/* <!-- Modal --> */}

                            {/* {modal && (
                              <Modall
                                showModal={true}
                                closeModal={() => setModal(false)}
                                personRemoveHandler={() =>
                                  personRemoveHandler(data.Person)
                                }
                              />
                            )}  */}
                            <button type="button" 
                            class="remove-btn"
                            data-bs-toggle="modal" 
                            data-bs-target="#staticBackdrop">
                            Remove
                            </button>
                    
                    {/* <!-- Modal --> */}
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body">
                                    <p>
                                        Are you sure you what to remove <br /> "jammer smith" from the appointment ?
                                    </p>
                                    <div class="Appointment-model-footer-btns">
                                        {/* <button type="button" class="btn">YES</button> */}
                                        <button type="button" 
                                          class="btn"
                                          data-bs-toggle="modal" 
                                          data-bs-target="#staticBackdrop-new">
                                          YES
                                          </button>
                    
                    {/* <!-- Modal --> */}
                                        <div class="modal fade" id="staticBackdrop-new" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                              <div class="modal-content">
                                                  <div class="modal-header border-0 pb-0 Appointment-yes-model">
                                                      <i type="button" class="fas fa-times text-right" data-bs-dismiss="modal" aria-label="Close"></i>
                                                  </div>
                                                  <div class="modal-body">
                                                      <p>
                                                      "jammer smith" has been removed from the appointment
                                                      </p>
                                                  </div>
                                              </div>
                                            </div>
                                        </div>
                                        <button type="button" class="btn ml-2" data-bs-dismiss="modal">NO</button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
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
          <div class="amount-due">
            <div class="container-fluid site-container">
              <div class="row">
                <div class="col-6 amount-due-text">
                  <h3>Amount due</h3>
                </div>
                <div class="col-6 amount-due-price">
                  <h3>£149</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="site-container">
          <div class="amount-due-points">
            <label>
              <input
                type="checkbox"
                className="check-box-input"
                onChange={(e) => setCondition1(e.target.checked)}
              />
              <p>
                I confirm I have checked the above and information and this is
                correct
              </p>
            </label>
            <label>
              <input
                type="checkbox"
                className="check-input-extra-big"
                onChange={(e) => setCondition2(e.target.checked)}
              />
              <p>
                I acknowledge that the date I have selected is appropriate for
                my plans, and I understand that my results may take up to 48
                hours after my test to arrive.
              </p>
            </label>
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
