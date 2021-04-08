import React, { createRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PdfDocument from "../components/PdfDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QRCode from "qrcode.react";
import useDynamicRefs from "use-dynamic-refs";
import { emerchantPay } from "../actions/form";

const BookingCOmplete = () => {
  const { postedData } = useSelector((state) => state.Form);
  const [base64ImagesURl, setBase64ImagesUrl] = useState([]);
  const [showPdf, setShowPdf] = useState(false);

  let canvasId = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
    converBase64();
  }, []);

  let base64Images = [];
  const converBase64 = () => {
    console.log("convertBase64 Happens");
    for (var i = 1; i <= canvasId; i++) {
      var canvas = document.getElementById(`canvas-${i}`);
      var dataURL = canvas.toDataURL();
      base64Images.push(dataURL);
      setBase64ImagesUrl(base64Images);
    }
  };

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  let appointmentDateFromDb = postedData?.savedform?.appointmentDate.split(" ");

  let appointmentLocation = JSON.parse(localStorage.getItem("clinetAddress"));

  useEffect(() => {
    setTimeout(() => {
      setShowPdf(true);
    }, [3000]);
  }, []);

  return (
    <div>
      <section class="Appointment-Summary">
        <div class="Test-Location-box">
          <h3>Booking Complete</h3>
        </div>
        <div class="Appointment-subheader">
          <i class="fas fa-check-circle"></i>
        </div>
      </section>
      <div class="site-container">
        <section>
          <div class="Booking-Complete-wrapper">
            <div class="subheading">
              <p>Appointment Confirmation</p>
              <div className="Save-PDF-new-btn">
                {showPdf ? (
                  <PDFDownloadLink
                    document={
                      <PdfDocument
                        peoples={postedData?.savedform?.peoples}
                        imageUrls={base64ImagesURl}
                      />
                    }
                    fileName="flight_details.pdf"
                    style={{
                      fontSize: "14px",
                      padding: "10px 15px",
                      color: "white",
                      border: "none",
                      borderRradius: "6px",
                      display: "flex",
                      margin: "0 auto",
                      cursor: "pointer",
                      alignItems: "center",
                      fontFamily: "Poppins-Regular",
                      justifyContent: "center",
                      borderRadius: "6px",
                      backgroundImage:
                        "linear-gradient(45deg, #018195, #7CC1B1)",
                    }}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        "Loading document..."
                      ) : (
                        <span className="new-pdf-btn">
                          <i class="fas fa-file-pdf PDF_ICON"></i> Save booking
                          confirmation as a PDF
                        </span>
                      )
                    }
                  </PDFDownloadLink>
                ) : (
                  <div class="spinner-border text-info" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
              </div>
            </div>
            <div class="Booking-Complete-Inner-wrapper" id="capture">
              <div class="Booking-Complete-details">
                <div class="person-info">
                  <h3 class="person-heading">Your appointment details</h3>
                  <div class="Person-details-info">
                    <p>
                      Appointment date :{" "}
                      <span>
                        {postedData?.savedform && appointmentDateFromDb[4]}{" "}
                        {postedData?.savedform && appointmentDateFromDb[5]}{" "}
                        {postedData?.savedform && appointmentDateFromDb[6]}{" "}
                      </span>
                    </p>
                    <p>
                      Appointment time :{" "}
                      <span>
                        {" "}
                        Between{" "}
                        {postedData?.savedform && appointmentDateFromDb[0]}{" "}
                        {postedData?.savedform && appointmentDateFromDb[1]}{" "}
                        {postedData?.savedform && appointmentDateFromDb[2]}
                      </span>
                    </p>
                    <p>
                      Test type :{" "}
                      <span> {postedData?.savedform?.testType}</span>
                    </p>
                    <p>
                      Number of person :{" "}
                      <span>
                        {" "}
                        {postedData?.savedform?.peoples?.length} person
                      </span>
                    </p>
                    <p>
                      Appointment Type :{" "}
                      <span> {postedData?.savedform?.testLocation}</span>
                    </p>
                    <p>
                      Appointment Location :{" "}
                      <span>
                        {" "}
                        {/* {postedData?.savedform?.address1}{" "}
                        {postedData?.savedform?.address2}{" "}
                        {postedData?.savedform?.city}{" "}
                        {postedData?.savedform?.postCode} */}
                        {appointmentLocation.address1}{" "}
                        {appointmentLocation.address2}{" "}
                        {appointmentLocation.city}{" "}
                        {appointmentLocation.postCode}
                      </span>
                    </p>
                    <p>
                      Amount Paid :{" "}
                      <span>£{postedData?.savedform?.amountPaid}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="Booking-Complete-person-data">
                {postedData &&
                  postedData?.savedform?.peoples.map((peo) => {
                    return (
                      <div class="Booking-Complete-person-data-box">
                        <div class="Booking-Complete-person-data-box-header">
                          <h4 class="Booking-person-info">
                            Patient Name :{" "}
                            <span>
                              {peo.firstName} {peo.lastName}
                            </span>
                          </h4>
                          <h4 class="Booking-person-identity">
                            Booking Refrence ID: <span>{peo.referenceId}</span>
                          </h4>
                          <div>
                            <div className="Booking-person-detail-box">
                              <div className="Qr-scanner">
                                <QRCode
                                  value={`https://master.dptkbhd952i0u.amplifyapp.com/qrcode?id=${peo.referenceId}`}
                                  id={`canvas-${(canvasId = canvasId + 1)}`}
                                />
                              </div>
                              <p class="Booking-person-dec">
                                Please have you photo ID present at the
                                appointment as we will be required to take a
                                photo of it. We will not be able to issue your
                                test results without taking photo ID
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div class="Booking-person-FAQ">
                <h4 class="Booking-person-question-heading">
                  Do you have any questions?
                </h4>
                <p>
                  We have client service agents waiting on hand to help you 24
                  hours a day.
                </p>
                <div class="Booking-person-chat-type">
                  <div class="Save-PDF">
                    <button type="submit" class="Save-PDF-btn">
                      <i class="fas fa-file-pdf"></i> Contact via webchat
                    </button>
                  </div>
                  <div class="Save-PDF Booking-ml">
                    <button type="submit" class="Save-PDF-btn">
                      <i class="fas fa-envelope"></i> Contact via email
                    </button>
                  </div>
                  <div class="Save-PDF">
                    <button type="submit" class="Save-PDF-btn">
                      <i class="fas fa-phone-alt phono-min-size"></i> Contact
                      via telephone
                    </button>
                  </div>
                </div>
                <p class="Booking-person-content-tagline">
                  We have agents online right now
                </p>
              </div>
              <div class="invite-frinds-box">
                <h3 class="invite-frinds-heading">
                  Invite your friends to book test with Atehcy Health
                </h3>
                <p>
                  Became a brand ambassador of Atehcy Health and earn £10 per
                  appointment booked through your own affiliate link
                </p>
                <div class="w-75 m-auto">
                  <button class="Submit-to-checkout">Apply now</button>
                </div>
              </div>
              <div class="invite-frinds-box">
                <h3 class="invite-frinds-heading">
                  Want to change your appointment date?
                </h3>
                <p>
                  Appointment dates can be changedanywhere up to 2 days. If you
                  need to change your appointment within 48 hours, you will need
                  to book a new appointment
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookingCOmplete;
