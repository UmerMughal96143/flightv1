import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { errorNotification } from "../utils/notification";
import { peopleBookingAction, updatePersonAction } from "../actions/form";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const PeopleBooking = (props) => {
  const [isValidSubmitCheckout, setIsValidSubmitCheckout] = useState(false);
  const [isValidNextPerson, setIsValidNextPerson] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    ethnicity: "",
    email: "",
    confirmEmail: "",
    mobile: "",
    confirmMobile: "",
    passportIdCard: "",
    confIrmpassportIdCard: "",
  });

  const {
    firstName,
    lastName,
    dob,
    ethnicity,
    email,
    confirmEmail,
    mobile,
    confirmMobile,
    passportIdCard,
    confIrmpassportIdCard,
  } = formData;

  const dispatch = useDispatch();
  const [sex, setSex] = useState("");
  const [checkboxStatus, setCheckBoxStatus] = useState(false);
  const [copyDetailObject, setCopyDetailObject] = useState({
    email: "",
    mobile: "",
    confirmEmail: "",
    confirmMobile: "",
  });
  const [NumberOfPersonsLimit, setNumberOfPersonsLimit] = useState(1);

  const { peoplesData, editMan } = useSelector((state) => state.Form);

  let sexArray = ["Male", "Female"];

  const submitCheckout = (values, resetForm) => {
    values.Person = values.firstName;
    values.id = Math.floor(100000 + Math.random() * 900000);
    dispatch(peopleBookingAction(values));
    setNumberOfPersonsLimit(NumberOfPersonsLimit + 1);
    localStorage.setItem("limit", NumberOfPersonsLimit);
    props.history.push("/termsconditions");
  };

  const nextPersonHandler = (values, resetForm) => {
    values.Person = values.firstName;
    values.id = Math.floor(100000 + Math.random() * 900000);

    dispatch(peopleBookingAction(values));

    setNumberOfPersonsLimit(NumberOfPersonsLimit + 1);
    localStorage.setItem("limit", NumberOfPersonsLimit + 1);
    setCheckBoxStatus(false);
    window.scrollTo(0, 0);
    resetForm();
  };

  const updatePersonHandler = (values) => {
    values.Person = values.firstName;
    values.id = editMan.id;
    dispatch(updatePersonAction(values));
    props.history.push("/appointmentsummary");
    // let peoplesData = []
    // peoplesData.unshift(data)
    // localStorage.setItem('peoples' , JSON.stringify(peoplesData) )
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (checkboxStatus) {
      setCopyDetailObject({
        email: peoplesData[0].email,
        mobile: peoplesData[0].mobile,
        confirmEmail: peoplesData[0].confirmEmail,
        confirmMobile: peoplesData[0].mobile,
      });
    }
  }, [checkboxStatus]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("submitType");
    };
  }, []);

  return (
    <div class="container-fluid p-0">
      <Formik
        enableReinitialize
        initialValues={{
          firstName: editMan?.firstName ? editMan.firstName : "",
          lastName: editMan?.lastName ? editMan.lastName : "",
          dob: editMan?.dob ? editMan.dob : "",
          ethnicity: editMan?.ethnicity ? editMan.ethnicity : "",
          email: copyDetailObject.email
            ? copyDetailObject.email
            : editMan?.email
            ? editMan.email
            : "",
          confirmEmail: copyDetailObject.confirmEmail
            ? copyDetailObject.confirmEmail
            : editMan?.confirmEmail
            ? editMan.confirmEmail
            : "",
          mobile: copyDetailObject.mobile
            ? copyDetailObject.mobile
            : editMan?.mobile
            ? editMan.mobile
            : "",
          confirmMobile: copyDetailObject.confirmMobile
            ? copyDetailObject.confirmMobile
            : editMan?.confirmMobile
            ? editMan.confirmMobile
            : "",
          passportIdCard: editMan?.passportIdCard ? editMan.passportIdCard : "",
          confIrmpassportIdCard: editMan?.confIrmpassportIdCard
            ? editMan.confIrmpassportIdCard
            : "",
          sex: editMan?.sex ? editMan.sex : "",
          ethnicity: editMan?.ethnicity ? editMan.ethnicity : "",
        }}
        onSubmit={async (values, { resetForm }) => {
          if (localStorage.getItem("submitType") == "nextPerson") {
            nextPersonHandler(values, resetForm);
          }
          if (localStorage.getItem("submitType") == "proceedToCheckout") {
            submitCheckout(values);
          }
          if (localStorage.getItem("submitType") == "updatePerson") {
            updatePersonHandler(values);
          }
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required("Required"),
          confirmEmail: Yup.string()
            .oneOf([Yup.ref("email"), null], "Email don't match!")
            .required("Required"),
          passportIdCard: Yup.string().required("Required"),
          confIrmpassportIdCard: Yup.string()
            .oneOf(
              [Yup.ref("passportIdCard"), null],
              "Passport id don't match!"
            )
            .required("Required"),
          mobile: Yup.string().required("Required"),
          confirmMobile: Yup.string()
            .oneOf([Yup.ref("mobile"), null], "Mobile no don't match!")
            .required("Required"),
          firstName: Yup.string()
            .matches(
              /^[A-Z][a-z0-9_-]{1,100}$/,
              "First Letter must be Uppercase,"
            )
            .required("Required"),
          lastName: Yup.string()
            .matches(
              /^[A-Z][a-z0-9_-]{1,100}$/,
              "First Letter must be Uppercase,"
            )
            .required("Required"),
          sex: Yup.string().required("Required"),
          ethnicity: Yup.string().required("Required"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
          } = props;

          return (
            <Form>
              <section>
                <div class="flite-time">
                  <h4 class="PRC-flite-heading">PCR Fit to Fly</h4>
                  <p class="PRC-flite-dec">
                    You are booking for {localStorage.getItem('numberOfUsers')} people <br /> 12th February 2021
                    between 8am - 4pm
                  </p>
                  {!localStorage.getItem("addperson") && !editMan && (
                    <button class="passenger-btn">
                      Person{" "}
                      {`${NumberOfPersonsLimit}  of ${localStorage.getItem(
                        "numberOfUsers"
                      )}`}
                    </button>
                  )}
                </div>
                {peoplesData[0] && !editMan && (
                  <div class="people-booking-copy-dedail-person">
                    <div className="site-container">
                      <label>
                        <input
                          type="checkbox"
                          onChange={(e) => setCheckBoxStatus(e.target.checked)}
                          checked={checkboxStatus}
                        />
                        <h3>Copy contact details from person 1</h3>
                      </label>
                    </div>
                  </div>
                )}
              </section>
              <section className="position-relative">
                <div className="wrapper">
                  <div className="site-container">
                    <form>
                      <div class="form-row">
                        <div class="form-group col-md-12">
                          <label for="inputEmail4">First name*</label>
                          <input
                            type="text"
                            class={
                              errors.firstName && touched.firstName
                                ? "form-control error"
                                : `form-control`
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="firstName"
                            value={values.firstName}
                          />
                          {errors.firstName && touched.firstName && (
                            <div className="input-feedback">
                              {errors.firstName}
                            </div>
                          )}
                        </div>
                        <div class="form-group col-md-12">
                          <label for="inputPassword4">Last name*</label>
                          <input
                            type="text"
                            class={
                              errors.lastName && touched.lastName
                                ? "form-control error"
                                : `form-control`
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="lastName"
                            value={values.lastName}
                          />
                          {errors.lastName && touched.lastName && (
                            <div className="input-feedback">
                              {errors.lastName}
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputAddress">DOB*</label>
                        <input
                          type="date"
                          class={
                            errors.dob && touched.dob
                              ? "form-control error"
                              : `form-control`
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="dob"
                          value={values.dob}
                        />
                        {errors.dob && touched.dob && (
                          <div className="input-feedback">{errors.dob}</div>
                        )}
                      </div>
                      <div>
                        <label for="inputAddress"> Sex*</label>
                        <div class="selectdiv">
                          <select
                            onChange={(e) => setSex(e.target.value)}
                            value={values.sex}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="sex"
                          >
                            <option value="">
                              ---Please Select your sex---
                            </option>
                            {sexArray.map((se) => {
                              return <option>{se}</option>;
                            })}
                          </select>
                          {errors.sex && touched.sex && (
                            <div className="input-feedback">{errors.sex}</div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className=" mt-3">
                          <label for="inputAddress"> Ehitinicity*</label>
                          <div class="selectdiv">
                            <select
                              onChange={(e) => setSex(e.target.value)}
                              value={values.ethnicity}
                              name="ethnicity"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">
                                ---Please Select your sex---
                              </option>
                              {sexArray.map((se) => {
                                return <option>{se}</option>;
                              })}
                            </select>
                            {errors.ethnicity && touched.ethnicity && (
                              <div className="input-feedback">
                                {errors.ethnicity}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div class="form-row mt-4">
                        <div class="form-group col-md-12">
                          <label for="inputCity">Email*</label>
                          <input
                            type="email"
                            class={
                              errors.email && touched.email
                                ? "form-control error"
                                : `form-control`
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="email"
                            value={values.email.toLowerCase()}
                          />
                          {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                          )}
                          <div className="input-result">
                            <p>Your results will be Sent to you via email</p>
                          </div>
                        </div>
                        {/* <div class="drive-gide people-email-booking">
                    <p>Your results will be Sent to you via email</p>
                  </div> */}
                        <div class="form-group col-md-12">
                          <label for="inputCity">Confirm Email*</label>
                          <input
                            type="emai"
                            class={
                              errors.confirmEmail && touched.confirmEmail
                                ? "form-control error"
                                : `form-control`
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmEmail.toLowerCase()}
                            name="confirmEmail"
                          />
                          {errors.confirmEmail && touched.confirmEmail && (
                            <div className="input-feedback">
                              {errors.confirmEmail}
                            </div>
                          )}
                        </div>
                        <div class="form-group col-md-12">
                          <label for="inputCity">Mobile Number*</label>
                          <input
                            type="tel"
                            class={
                              errors.mobile && touched.mobile
                                ? "form-control error"
                                : `form-control`
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="mobile"
                            value={values.mobile}
                            pattern="\d*"
                          />
                          {errors.mobile && touched.mobile && (
                            <div className="input-feedback">
                              {errors.mobile}
                            </div>
                          )}
                          <div className="input-result">
                            <p>Your results will be Sent to you via sms</p>
                          </div>
                        </div>
                        {/* <div class="drive-gide people-email-booking">
                    <p>Your results will be Sent to you via email</p>
                  </div> */}
                        <div class="form-group col-md-12">
                          <label for="inputCity">Confirm Mobile Number*</label>
                          <input
                            type="tel"
                            class={
                              errors.confirmMobile && touched.confirmMobile
                                ? "form-control error"
                                : `form-control`
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="confirmMobile"
                            value={values.confirmMobile}
                            pattern="\d*"
                          />
                          {errors.confirmMobile && touched.confirmMobile && (
                            <div className="input-feedback">
                              {errors.confirmMobile}
                            </div>
                          )}
                        </div>
                        <div class="form-group col-md-12">
                          <label for="inputZip">Passport/ID card number*</label>
                          <input
                            type="text"
                            class={
                              errors.passportIdCard && touched.passportIdCard
                                ? "form-control error"
                                : `form-control`
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="passportIdCard"
                            value={values.passportIdCard}
                          />
                          {errors.passportIdCard && touched.passportIdCard && (
                            <div className="input-feedback">
                              {errors.passportIdCard}
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="form-group Confirm-passport col-md-12 p-0">
                        <label for="inputZip">
                          Confirm Passport/ID card number*
                        </label>
                        <input
                          type="text"
                          class={
                            errors.confIrmpassportIdCard &&
                            touched.confIrmpassportIdCard
                              ? "form-control error"
                              : `form-control`
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="confIrmpassportIdCard"
                          value={values.confIrmpassportIdCard}
                        />
                        {errors.confIrmpassportIdCard &&
                          touched.confIrmpassportIdCard && (
                            <div className="input-feedback">
                              {errors.confIrmpassportIdCard}
                            </div>
                          )}
                      </div>
                    </form>
                  </div>
                </div>
                <footer>
                  <div className="site-container">
                    <div class="col-md-6 col-12 p-0 pr-0 pl-0 ml-auto mt-0">
                      <div className="row">
                        {!editMan ? (
                          <>
                            {localStorage.getItem("numberOfUsers") ==
                            localStorage.getItem("limit") ? (
                              <div class="col-6">
                                <Link to="/suggestions">
                                  <button type="submit" class="Back-btn">
                                    Back
                                  </button>
                                </Link>
                              </div>
                            ) : (
                              <>
                                <div class="col-6">
                                  <Link to="/suggestions">
                                    <button type="submit" class="Back-btn">
                                      Back
                                    </button>
                                  </Link>
                                </div>
                                {!localStorage.getItem("addperson") && localStorage.getItem('numberOfUsers') !== '1' && (
                                  <div class="col-6">
                                    <button
                                      type="submit"
                                      onClick={() => {
                                        handleSubmit();
                                        localStorage.setItem(
                                          "submitType",
                                          "nextPerson"
                                        );
                                      }}
                                      class={`${
                                        isValid
                                          ? "Next-btn"
                                          : "Next-btn-disabled"
                                      }`}
                                    >
                                      Next Person
                                    </button>
                                  </div>
                                )}
                              </>
                            )}

                            <div class="col-12">
                              <button
                                class={`${
                                  isValid
                                    ? "Submit-to-checkout mb-0"
                                    : "Submit-to-checkout-disabled"
                                }`}
                                type="submit"
                                onClick={(e) => {
                                  handleSubmit();
                                  localStorage.setItem(
                                    "submitType",
                                    "proceedToCheckout"
                                  );
                                }}
                              >
                                Submit and go to checkout
                              </button>
                            </div>
                          </>
                        ) : (
                          <div class="col-12">
                            <button
                              class="Submit-to-checkout"
                              onClick={() => {
                                handleSubmit();
                                localStorage.setItem(
                                  "submitType",
                                  "updatePerson"
                                );
                              }}
                            >
                              Update Person
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </footer>
              </section>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PeopleBooking;
