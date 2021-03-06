import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { errorNotification } from "../utils/notification";
import { peopleBookingAction, updatePersonAction } from "../actions/form";
import { Formik, Form } from "formik";
import * as Yup from "yup";

// Date loop
let dateArray = [];
for (let i = 1; i < 32; i++) {
  dateArray.push(i);
}
// Date loop

// Month Loop
let monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// Month Loop

// Year Loop
let yearArray = [];
let startYear = 2021;
for (let i = 1; i < 103; i++) {
  yearArray.push(startYear--);
}
// Year Loop

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

  const { peoplesData, editMan, appointmentDate } = useSelector(
    (state) => state.Form
  );

  let sexArray = ["Male", "Female"];
  let ethinicityArray = [
    "ANY OTHER ETHNIC CATEGORY",
    "ANY OTHER MIXED GROUP",
    "BANGLADESHI",
    "BLACK - AFRICAN",
    "BLACK - CARIBBEAN",
    "BLACK - OTHER",
    "CHINESE",
    "INDIAN",
    "ISC - UNSPECIFIED",
    "OTHER / MIXED",
    "PAKISTANI",
    "UNKNOWN",
    "WHITE",
    "WHITE AND ASIAN",
    "WHITE AND BLACK AFRICAN",
    "WHITE AND BLACK CARIBBEAN",
    "WHITE BRITISH",
    "WHITE IRISH",
    "WHITE OTHER",
  ];

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

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

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
          month: editMan?.month ? editMan.month : "",
          day: editMan?.day ? editMan.day : "",
          year: editMan?.year ? editMan.year : "",
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
            .matches(/^[A-Z]/, "First Letter must be Uppercase,")
            .required("Required"),
          lastName: Yup.string()
            .matches(
              /^[A-Z][a-z0-9_-]{1,100}$/,
              "First Letter must be Uppercase,"
            )
            .required("Required"),
          sex: Yup.string().required("Required"),
          ethnicity: Yup.string().required("Required"),
          month: Yup.string().required("Required"),
          day: Yup.string().required("Required"),
          year: Yup.string().required("Required"),
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
            <Form className="appointment-form">
              <section>
                <div class="flite-time">
                  <h4 class="PRC-flite-heading">PCR Fit to Fly</h4>
                  <p class="PRC-flite-dec">
                    You are booking for {localStorage.getItem("numberOfUsers")}{" "}
                    people <br />
                    between {appointmentDate}
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
                      <label className="person-person">
                        <input
                          type="checkbox"
                          className="form-check-input"
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
                      <div class="form-group">
                        <div className="col-md-12">
                          <p>First name*</p>
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
                      </div>
                      <div class="form-group">
                        <div className="col-md-12">
                          <p>Last name*</p>
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
                        <p>DOB*</p>
                        {/* <input
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
                        )} */}
                        <div className="form-row departure-date-box">
                          <div className="form-group">
                            <div className="date-select">
                              <select
                                aria-label="Default select example"
                                class={
                                  errors.day && touched.day
                                    ? "form-control error"
                                    : `form-control`
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="day"
                                value={values.day}
                              >
                                <option value="">DD</option>
                                {dateArray.map((d, ind) => {
                                  return (
                                    <option key={ind} value={d}>
                                      {d}
                                    </option>
                                  );
                                })}
                              </select>
                              {errors.day && touched.day && (
                            <div className="input-feedback">{errors.day}</div>
                          )}
                            </div>
                          </div>
                          <span>/</span>
                          <div className="form-group">
                            <div className="month-select">
                              <select
                                class={
                                  errors.month && touched.month
                                    ? "form-control error"
                                    : `form-control`
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="month"
                                value={values.month}
                                aria-label="Default select example"
                              >
                                <option value="">MM</option>
                                {monthArray.map((m, ind) => (
                                  <option key={ind} value={m}>
                                    {m}
                                  </option>
                                ))}
                              </select>
                              {errors.month && touched.month && (
                            <div className="input-feedback">{errors.month}</div>
                          )}
                            </div>
                          </div>
                          <span>/</span>
                          <div className="form-group">
                            <div className="year-select">
                              <select
                                class={
                                  errors.year && touched.year
                                    ? "form-control error"
                                    : `form-control`
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="year"
                                value={values.year}
                                aria-label="Default select example"
                              >
                                <option value="">YYYY</option>
                                {yearArray.map((y, ind) => (
                                  <option key={ind} value={y}>
                                    {y}
                                  </option>
                                ))}
                              </select>
                              {errors.year && touched.year && (
                            <div className="input-feedback">{errors.year}</div>
                          )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <p> Sex*</p>
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
                      <div class="form-group">
                        <div className=" mt-3">
                          <p> Ethnicity*</p>
                          <div class="selectdiv">
                            <select
                              onChange={(e) => setSex(e.target.value)}
                              value={values.ethnicity}
                              name="ethnicity"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">
                                ---Please Select your ethnicity---
                              </option>
                              {ethinicityArray.map((se) => {
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
                      <div class="form-group">
                        <div class="form-group col-md-12">
                          <p>Email*</p>
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
                          <p>Confirm Email*</p>
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
                          <p>Mobile Number*</p>
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
                          <p>Confirm Mobile Number*</p>
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
                          <p>Passport/ID card number*</p>
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
                      <div class="form-group">
                        <div className="Confirm-passport col-md-12 p-0">
                          <p>Confirm Passport/ID card number*</p>
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
                                {!localStorage.getItem("addperson") &&
                                  localStorage.getItem("numberOfUsers") !==
                                    "1" && (
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
