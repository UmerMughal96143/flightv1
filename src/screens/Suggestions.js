import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAppointmentDate, suggestions } from "../actions/form";
import { errorNotification } from "../utils/notification";
import date from "date-and-time";

const Suggestions = ({ history }) => {
  const [flightTime, setFlightTime] = useState("");

  const [formatedTime, setFormatedTime] = useState("");

  const [isTimeBt12pm12am, setTimeBt12pm12am] = useState(false);
  const [isTimeBt12am12pm, setTimeBt12am12pm] = useState(false);
  const [renderFlightTime, setRenderFlighTime] = useState(false);
  const [continueButton, setContinueButton] = useState(false);


  const [inputDay, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  

  const [finalDateAfterAlgo, setFinalDateAfterAlgo] = useState("");
  const [amPmTime, setTimeToAmPm] = useState("");
  const [bestChoice, setBestChoice] = useState("");
  const [activeParagraph, setActiceParagraph] = useState("");

  const [selectedTimeByUser, setSelectedTimeByUser] = useState("");

  const [bestMediumWrostTimeForUser, setBestMediumWrostTimeForUser] = useState(
    []
  );

  const [startDate, setStartDate] = useState("");

  useEffect(() => {

    setStartDate(month + '-' + inputDay + "-" + year)

  },[ inputDay , month , year])

  const dispatch = useDispatch();

  const now = new Date();

  var day = new Date();
  var nextDay = new Date(day);
  nextDay.setDate(day.getDate() + 1);
  const submitFormHandler = (e) => {
    e.preventDefault();
    if (flightTime && startDate) {
      let data = {
        flightTime,
        startDate,
      };
      dispatch(suggestions(data));
      history.push("/peoplebooking");
    } else {
      errorNotification("Please fill All fields");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onTimeChange = (e) => {
    var timeSplit = e.target.value.split(":"),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      meridian = "AM";
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }
    setTimeToAmPm(hours + ":" + minutes + " " + meridian);
    setFlightTime(e.target.value);
    setRenderFlighTime(!renderFlightTime);
  };

  let row1 = ["8am - 10am", "10am - 12pm", "12pm - 2pm", "2pm - 4pm"];
  let row2 = ["8am - 10am", "10am - 12pm", "12pm - 2pm", "2pm - 4pm"];
  let row3 = ["8am - 10am", "10am - 12pm", "12pm - 2pm", "2pm - 4pm"];

  let row4 = ["10am - 12pm", "12pm - 2pm", "2pm - 4pm"];
  let row5 = ["12pm - 2pm", "2pm - 4pm"];
  let row6 = ["2pm - 4pm"];
  let row7 = ["6am - 8am", "8am - 10am", "10am - 12pm", "12pm - 2pm"];
  let row8 = ["8am - 10am", "10am - 12pm", "12pm - 2pm", "2pm - 4pm"];
  let row9 = ["8am - 10am", "10am - 12pm", "12pm - 2pm", "2pm - 4pm"];
  let row10 = ["8am - 10am", "10am - 12pm", "12pm - 2pm", "2pm - 4pm"];
  let row11 = ["8am - 10am", "10am - 12pm", "12pm - 2pm", "2pm - 4pm"];
  let row12 = ["8am - 10am", "10am - 12pm", "12pm - 2pm", "2pm - 4pm"];

// Date loop
  let dateArray = [];
  for(let i=1; i<32; i++){
    dateArray.push(i);
  }
// Date loop

// Month Loop
let monthArray =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// Month Loop

// Year Loop
let yearArray = [];
let startYear = 2021 ;
for(let i=1; i <71; i++){
  yearArray.push(startYear++)
}
// Year Loop

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  let currentTime = formatAMPM(new Date());

  useEffect(() => {
    if (isTimeBt12am12pm) {
      const getdate = () => {
        var date = new Date(startDate);
        var newdate = new Date(date);

        newdate.setDate(newdate.getDate() - 3);

        var dd = newdate.getDate();
        var mm = newdate.getMonth() + 1;
        var y = newdate.getFullYear();

        var someFormattedDate = mm + "/" + dd + "/" + y;

        setFinalDateAfterAlgo(someFormattedDate);
      };

      getdate();
    }
    if (isTimeBt12pm12am) {
      const getdate = () => {
        var date = new Date(startDate);
        var newdate = new Date(date);

        newdate.setDate(newdate.getDate() - 2);

        var dd = newdate.getDate();
        var mm = newdate.getMonth() + 1;
        var y = newdate.getFullYear();

        var someFormattedDate = mm + "/" + dd + "/" + y;
        setFinalDateAfterAlgo(someFormattedDate);
      };
      getdate();
    }
  }, [isTimeBt12am12pm, isTimeBt12pm12am, startDate]);

  useEffect(() => {
    if (flightTime) {
      setTimeBt12pm12am(false);
      setTimeBt12am12pm(false);
      let splitedTimeHour = amPmTime.split(":")[0];
      if (
        splitedTimeHour == "01" ||
        splitedTimeHour == "02" ||
        splitedTimeHour == "03" ||
        splitedTimeHour == "04" ||
        splitedTimeHour == "05" ||
        splitedTimeHour == "06" ||
        splitedTimeHour == "07" ||
        splitedTimeHour == "08" ||
        splitedTimeHour == "09"
      ) {
        splitedTimeHour = splitedTimeHour.slice(splitedTimeHour.length - 1);
      }
      let splitedTimeMinutes = amPmTime.split(":")[1].substring(0, 2);
      let splitedTimeZone = amPmTime.split(" ")[1].toLowerCase();
      if (splitedTimeHour % 2 == 1) {
        let newXone;
        if (splitedTimeHour == 10 || splitedTimeHour == 12) {
          newXone = "pm";
          let prevHour;
          prevHour = parseInt(splitedTimeHour) - 1;
          let nextHour;
          nextHour = parseInt(splitedTimeHour) + 1;
          setFormatedTime(
            prevHour + splitedTimeZone + " " + "-" + " " + nextHour + newXone
          );
          return;
        }
        if (splitedTimeHour == 1 && splitedTimeZone == "pm") {
          newXone = "pm";
          let prevHour;
          prevHour = 12;
          let nextHour;
          nextHour = parseInt(splitedTimeHour) + 1;
          setFormatedTime(
            `${
              prevHour + splitedTimeZone + " " + "-" + " " + nextHour + newXone
            }`
          );
          return;
        }
        if (splitedTimeHour == 1 && splitedTimeZone == "am") {
          newXone = "am";
          let prevHour;
          prevHour = 12;
          let nextHour;
          nextHour = parseInt(splitedTimeHour) + 1;
          setFormatedTime(
            `${
              prevHour + splitedTimeZone + " " + "-" + " " + nextHour + newXone
            }`
          );
          return;
        }
        if (splitedTimeHour == 11 && splitedTimeZone == "pm") {
          newXone = "am";
          let prevHour;
          prevHour = 10;
          let nextHour;
          nextHour = parseInt(splitedTimeHour) + 1;
          setFormatedTime(
            `${
              prevHour + splitedTimeZone + " " + "-" + " " + nextHour + newXone
            }`
          );
          return;
        }
        if (splitedTimeHour == 11 && splitedTimeZone == "am") {
          newXone = "pm";
          let prevHour;
          prevHour = 10;
          let nextHour;
          nextHour = parseInt(splitedTimeHour) + 1;
          setFormatedTime(
            `${
              prevHour + splitedTimeZone + " " + "-" + " " + nextHour + newXone
            }`
          );
          return;
        }
        let prevHour;
        prevHour = parseInt(splitedTimeHour) - 1;
        let nextHour;
        nextHour = parseInt(splitedTimeHour) + 1;
        setFormatedTime(
          `${
            prevHour +
            splitedTimeZone +
            " " +
            "-" +
            " " +
            nextHour +
            splitedTimeZone
          }`
        );
      } else {
        let newXone;
        if (splitedTimeHour == 10 && splitedTimeZone == "am") {
          newXone = "pm";
          let nextHour;
          nextHour = parseInt(splitedTimeHour) + 2;
          setFormatedTime(
            `${
              splitedTimeHour +
              splitedTimeZone +
              " " +
              "-" +
              " " +
              nextHour +
              newXone
            }`
          );

          return;
        }
        if (splitedTimeHour == 10 && splitedTimeZone == "pm") {
          newXone = "am";
          let nextHour;
          nextHour = parseInt(splitedTimeHour) + 2;
          setFormatedTime(
            `${
              splitedTimeHour +
              splitedTimeZone +
              " " +
              "-" +
              " " +
              nextHour +
              newXone
            }`
          );
          return;
        }
        if (splitedTimeHour == 12) {
          let nextHour;
          nextHour = (parseInt(splitedTimeHour) % 12) + 2;
          setFormatedTime(
            `${
              splitedTimeHour +
              splitedTimeZone +
              " " +
              "-" +
              " " +
              nextHour +
              splitedTimeZone
            }`
          );
          return;
        }

        let nextHour;
        nextHour = parseInt(splitedTimeHour) + 2;
        setFormatedTime(
          `${
            splitedTimeHour +
            splitedTimeZone +
            " " +
            "-" +
            " " +
            nextHour +
            splitedTimeZone
          }`
        );
      }
    }
  }, [flightTime, renderFlightTime]);

  useEffect(() => {
    if (formatedTime == "12am - 2am") {
      setBestMediumWrostTimeForUser(row1);
      setBestChoice("6am - 8am");
    }
    if (formatedTime == "2am - 4am") {
      setBestMediumWrostTimeForUser(row2);
      setBestChoice("6am - 8am");
    }
    if (formatedTime == "4am - 6am") {
      setBestMediumWrostTimeForUser(row3);
      setBestChoice("6am - 8am");
    }
    if (formatedTime == "6am - 8am") {
      setBestMediumWrostTimeForUser(row4);
      setBestChoice("8am - 10am");
    }
    if (formatedTime == "8am - 10am") {
      setBestMediumWrostTimeForUser(row5);
      setBestChoice("10am - 12pm");
    }
    if (formatedTime == "10am - 12pm") {
      setBestMediumWrostTimeForUser(row6);
      setBestChoice("12pm - 2pm");
    }
    if (formatedTime == "12pm - 2pm") {
      setBestMediumWrostTimeForUser(row7);
      setBestChoice("2pm - 4pm");
    }
    if (formatedTime == "2pm - 4pm") {
      setBestMediumWrostTimeForUser(row8);
      setBestChoice("6am - 8am");
    }
    if (formatedTime == "4pm - 6pm") {
      setBestMediumWrostTimeForUser(row9);
      setBestChoice("6am - 8am");
    }
    if (formatedTime == "6pm - 8pm") {
      setBestMediumWrostTimeForUser(row10);
      setBestChoice("6am - 8am");
    }
    if (formatedTime == "8pm - 10pm") {
      setBestMediumWrostTimeForUser(row11);
      setBestChoice("6am - 8am");
    }
    if (formatedTime == "10pm - 12am") {
      setBestMediumWrostTimeForUser(row12);
      setBestChoice("6am - 8am");
    }

    if (formatedTime) {
      if (formatedTime == "12am - 2am") {
        setTimeBt12am12pm(true);
        return;
      }
      if (formatedTime == "2am - 4am") {
        setTimeBt12am12pm(true);
        return;
      }
      if (formatedTime == "4am - 6am") {
        setTimeBt12am12pm(true);
        return;
      }
      if (formatedTime == "6am - 8am") {
        setTimeBt12am12pm(true);
        return;
      }
      if (formatedTime == "8am - 10am") {
        setTimeBt12am12pm(true);
        return;
      }
      if (formatedTime == "10am - 12pm") {
        setTimeBt12am12pm(true);
        return;
      }
      if (formatedTime == "12pm - 2pm") {
        setTimeBt12pm12am(true);
        return;
      }
      if (formatedTime == "2pm - 4pm") {
        setTimeBt12pm12am(true);
        return;
      }
      if (formatedTime == "4pm - 6pm") {
        setTimeBt12pm12am(true);
        return;
      }
      if (formatedTime == "6pm - 8pm") {
        setTimeBt12pm12am(true);
        return;
      }
      if (formatedTime == "8pm - 10pm") {
        setTimeBt12pm12am(true);
        return;
      }
      if (formatedTime == "10pm - 12am") {
        setTimeBt12pm12am(true);
        return;
      }
    }
  }, [formatedTime]);



  const chooseTimeHandler = (e) => {
    setSelectedTimeByUser(e.target.textContent);
    dispatch(setAppointmentDate(e.target.textContent));
    setContinueButton(true);
  };

  return (
    <div>
      <div className="wrapper">
        <div class="site-container">
          <section>
            <div class="appointment-header">
              <h4 class="appointment-heading">
                Enter your flight times and let our clever system give you the
                best option for your appointment time to ensure you get results
                back in time for your flight
              </h4>
            </div>
          </section>
          <section>
            <form class="appointment-form">
              <div class="form-group">
                <p class="appointment-form-heading">
                  What is your departure date?
                </p>
                <div class="suggestion-date-row">
                  {/* <input
                    type="date"
                    class={`form-control`}
                    name="dob"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  /> */}
                  <div className="form-row departure-date-box">
                    <div className="form-group">
                      <div className="date-select">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => setDay(e.target.value)}
                        >
                          <option value="">DD</option>
                          {dateArray.map((d,ind) => {
                            return(
                              <option key={ind} value={d}>{d}</option>
                            )
                          })}
                        </select>
                      </div>
                    </div>
                    <span>/</span>
                    <div className="form-group">
                      <div className="month-select">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => setMonth(e.target.value)}

                        >
                          <option value="">MM</option>
                          {monthArray.map((m,ind) =>
                            <option key={ind} value={m}>{m}</option>
                          )}
                        </select>
                      </div>
                    </div>
                    <span>/</span>
                    <div className="form-group">
                      <div className="year-select">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) => setYear(e.target.value)}

                        >
                          <option value="">YYYY</option>
                            {yearArray.map((y,ind) => 
                              <option key={ind} value={y}>{y}</option>
                            )}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div class="form-group">
                  <p class="appointment-form-heading appointment-date-div">
                    What time is your flight?
                  </p>
                  <div class="suggestion-date-row">
                    <input
                      type="time"
                      class={`form-control`}
                      name="dob"
                      value={flightTime}
                      onChange={(e) => {
                        onTimeChange(e);
                      }}
                    />
                  </div>
                </div>
              </div>
              {flightTime && (
                <div class="appointment-prosecer-steps">
                  <p class="appointment-prosecer-steps-subheading">
                    Please choose your preferred appointment time
                  </p>
                  <h3 class="appointment-prosecer-steps-mainheading">
                    Best choice
                  </h3>
                  <div class="suggest-best-time">
                    <p
                      class={`${
                        activeParagraph == bestChoice
                          ? "active"
                          : "user-choose-conent"
                      }`}
                      style={{ textAlign: "center" }}
                      onClick={(e) => {
                        setActiceParagraph(bestChoice);
                        chooseTimeHandler(e);
                      }}
                    >
                      {bestChoice}{" "}
                      {finalDateAfterAlgo &&
                        date.format(
                          new Date(finalDateAfterAlgo),
                          " DD MMM YYYY"
                        )}
                    </p>
                  </div>

                  <div class="user-choose">
                    <p class="user-choose-heading">You can also choose</p>
                    {bestMediumWrostTimeForUser?.map((time, index) => {
                      return (
                        <div class="user-choose-box" key={index}>
                          <p
                            class={`${
                              activeParagraph == time
                                ? "active"
                                : "user-choose-conent"
                            }`}
                            style={{ textAlign: "center" }}
                            onClick={(e) => {
                              setActiceParagraph(time);
                              chooseTimeHandler(e);
                            }}
                          >
                            {time}{" "}
                            {finalDateAfterAlgo &&
                              date.format(
                                new Date(finalDateAfterAlgo),
                                " DD MMM YYYY"
                              )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </form>
          </section>
        </div>
      </div>
      <footer>
        <div class="site-container">
          <div className="pl-0 pr-0 col-md-6 col-12 row ml-auto flight-time-footer-buttons mt-0 mb-2 mr-0">
            <div class="col-md-6 col-6 footer-btn">
              <Link to="/appointment">
                <button type="submit" class="Back-btn">
                  Back
                </button>
              </Link>
            </div>
            <div class="col-md-6 col-6 footer-btn pl-2 pr-0">
              <Link to="/peoplebooking">
                <button
                  type="submit"
                  class="Next-btn"
                  onClick={(e) => submitFormHandler(e)}
                  disabled={continueButton ? false : true}
                >
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Suggestions;
