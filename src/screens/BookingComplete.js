import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PdfDocument from "../components/PdfDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";

const BookingCOmplete = () => {
  const ref = React.createRef();
  const { postedData } = useSelector((state) => state.Form);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <div class="site-container mb-4">
        <section>
          <div class="Booking-Complete-wrapper">
            <PDFDownloadLink
              document={<PdfDocument peoples={postedData?.savedform?.peoples} />}
              fileName="flight_details.pdf"
              style={{
                textDecoration: "none",
                padding: "10px",
                color: "#4a4a4a",
                backgroundColor: "#f2f2f2",
                border: "1px solid #4a4a4a",
              }}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download Pdf"
              }
            </PDFDownloadLink>
            <div class="subheading">
              <p>Appointment Confirmation</p>
              <div class="Save-PDF">
                <button type="submit" class="Save-PDF-btn">
                  <i class="fas fa-file-pdf"></i> Save booking confirmation as a
                  PDF
                </button>
              </div>
            </div>
            <div class="Booking-Complete-Inner-wrapper" id="capture" ref={ref}>
              <div class="Booking-Complete-details">
                <div class="person-info">
                  <h3 class="person-heading">Your appointment details</h3>
                  <div class="Person-details-info">
                    <p>
                      Appointment date :<span> 21 February 2021 </span>
                    </p>
                    <p>
                      Appointment time: <span> Between 8am - 4pm</span>
                    </p>
                    <p>
                      Test type: <span> PCR Test + Fit to Fly Certificate</span>
                    </p>
                    <p>
                      Number of tests: <span> 3 people</span>
                    </p>
                    <p>
                      Appointment Location:
                      <span> 14 Fernview Drive, Rammasbottom, BL0 9XB</span>
                    </p>
                    <p>
                      Amount Paid: <span> £300.00</span>
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
                            Person :{" "}
                            <span>
                              {peo.firstName} {peo.lastName}
                            </span>
                          </h4>
                          <h4 class="Booking-person-identity">
                            Booking Refrence ID: <span>{peo._id}</span>
                          </h4>
                          <p class="Booking-person-dec">
                            Please have you photo ID present at the appointment
                            as we will be required to take a photo of it. We
                            will not be able to issue your test results without
                            taking photo ID
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookingCOmplete;
