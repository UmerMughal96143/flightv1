import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { suggestions } from "../actions/form";
import { errorNotification } from "../utils/notification";
import Time from "../components/Time";
import Date from "../components/Date";

const Suggestions = ({ history }) => {
  const [flightTime, setFlightTime] = useState("");
  const [formatedTime, setFormatedTime] = useState("");
  const [bestChoice, setBestChoice] = useState("");
  console.log("🚀 ~ file: Suggestions.js ~ line 14 ~ Suggestions ~ formatedTime", formatedTime)
  const [bestMediumWrostTimeForUser, setBestMediumWrostTimeForUser] = useState([]);
  console.log("🚀 ~ file: Suggestions.js ~ line 15 ~ Suggestions ~ bestMediumWrostTimeForUser", bestMediumWrostTimeForUser)


  const [startDate, setStartDate] = useState("");

  const dispatch = useDispatch();

  let flightTimes = [
    "1am - 3am",
    "3am - 5am",
    "5am - 7am",
    "7am - 9am",
    "9am - 11am",
    "11am - 1pm",
    "1pm - 3pm",
    "3pm - 5pm",
    "5pm - 7pm",
    "7pm - 9pm",
    "9pm - 11pm",
    "11pm - 1am",
  ];

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

  const valueFromPicker = (data) => {
    setFlightTime(data.valueText);
  };
  const datValueFromPicker = (data) => {
    setStartDate(data.valueText);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let row1 = ["8am - 10am","10am - 12pm","12pm - 2pm","2pm - 4pm"]
  let row2 = ["8am - 10am","10am - 12pm","12pm - 2pm","2pm - 4pm"]
  let row3 = ["8am - 10am","10am - 12pm","12pm - 2pm","2pm - 4pm"]

  let row4 = ["10am - 12pm","12pm - 2pm","2pm - 4pm"]
  let row5 = ["12pm - 2pm","2pm - 4pm"]
  let row6 = ["2pm - 4pm"]
  let row7 = ["6am - 8am","8am - 10am","10am - 12pm","12pm - 2pm"]
  let row8 = ["8am - 10am","10am - 12pm","12pm - 2pm","2pm - 4pm"]
  let row9 = ["8am - 10am","10am - 12pm","12pm - 2pm","2pm - 4pm"]
  let row10 = ["8am - 10am","10am - 12pm","12pm - 2pm","2pm - 4pm"]
  let row11 = ["8am - 10am","10am - 12pm","12pm - 2pm","2pm - 4pm"]
  let row12 = ["8am - 10am","10am - 12pm","12pm - 2pm","2pm - 4pm"]


  useEffect(() => {
    if (flightTime) {
      let splitedTimeHour = flightTime.split(":")[0];
      let splitedTimeMinutes = flightTime.split(":")[1];
      let splitedTimeZone = flightTime.split(" ")[1].toLowerCase();
      // let manipulatedFlightTime = `${splitedTimeHour}${splitedTimeZone}${" "} ${"-"}${" "}`
      if(splitedTimeHour % 2 == 1){
        let newXone ;
        if(splitedTimeHour == 10 || splitedTimeHour == 12){
          newXone = 'pm'
          let prevHour ;
          prevHour = parseInt(splitedTimeHour) - 1 ;
           let nextHour ;
          nextHour= parseInt(splitedTimeHour) + 1 ;
          console.log("🚀 ~ file: Suggestions.js ~ line 90 ~ useEffect ~ hour", prevHour + splitedTimeZone , '-' , nextHour + `${newXone}`)
          setFormatedTime(prevHour + splitedTimeZone + ' ' + '-' + ' ' + nextHour + newXone)
          return
        }
        if(splitedTimeHour == 1 && splitedTimeZone == 'pm'){
          newXone = 'pm'
          let prevHour ;
          prevHour = 12 ;
           let nextHour ;
          nextHour= parseInt(splitedTimeHour) + 1 ;
          console.log("🚀 ~ file: Suggestions.js ~ line 90 ~ useEffect ~ hour", prevHour + splitedTimeZone , '-' , nextHour + `${newXone}`)
          setFormatedTime(`${prevHour + splitedTimeZone + ' ' + '-' + ' ' + nextHour + newXone}`)
          return
        }
        if(splitedTimeHour == 1 && splitedTimeZone == 'am'){
          newXone = 'am'
          let prevHour ;
          prevHour = 12 ;
           let nextHour ;
          nextHour= parseInt(splitedTimeHour) + 1 ;
          console.log("🚀 ~ file: Suggestions.js ~ line 90 ~ useEffect ~ hour", prevHour + splitedTimeZone , '-' , nextHour + `${newXone}`)
          setFormatedTime(`${prevHour + splitedTimeZone + ' ' + '-' + ' ' + nextHour + newXone}`)
          return
        }
        if(splitedTimeHour == 11 && splitedTimeZone == 'pm'){
          newXone = 'am'
          let prevHour ;
          prevHour = 10 ;
           let nextHour ;
          nextHour= parseInt(splitedTimeHour) + 1 ;
          console.log("🚀 ~ file: Suggestions.js ~ line 99 ~ useEffect ~ hour", prevHour + splitedTimeZone , '-' , nextHour + `${newXone}`)
          setFormatedTime(`${prevHour + splitedTimeZone + ' ' + '-' + ' ' + nextHour + newXone}`)
          return
        }
        if(splitedTimeHour == 11 && splitedTimeZone == 'am'){
          newXone = 'pm'
          let prevHour ;
          prevHour = 10 ;
           let nextHour ;
          nextHour= parseInt(splitedTimeHour) + 1 ;
          console.log("🚀 ~ file: Suggestions.js ~ line 99 ~ useEffect ~ hour", prevHour + splitedTimeZone , '-' , nextHour + `${newXone}`)
          setFormatedTime(`${prevHour + splitedTimeZone + ' ' + '-' + ' ' + nextHour + newXone}`)
          return
        }
        let prevHour ;
       prevHour = parseInt(splitedTimeHour) - 1 ;
        let nextHour ;
       nextHour= parseInt(splitedTimeHour) + 1 ;
       console.log("🚀 ~ file: Suggestions.js ~ line 90 ~ useEffect ~ hour", prevHour + splitedTimeZone , '-' , nextHour + `${splitedTimeZone}`)
       setFormatedTime(`${prevHour + splitedTimeZone + ' ' + '-' + ' ' + nextHour + splitedTimeZone}`)
      //  console.log("🚀 ~ file: Suggestions.js ~ line 92 ~ useEffect ~ nextHour", nextHour + splitedTimeZone)
      }else{
        let newXone ;
        if(splitedTimeHour == 10 && splitedTimeZone == 'am'){
          newXone = 'pm'
           let nextHour ;
          nextHour= parseInt(splitedTimeHour) + 2 ;
          console.log("🚀 ~ file: Suggestions.js ~ line 90 ~ useEffect ~ hour", splitedTimeHour + splitedTimeZone , '-' , nextHour + `${newXone}`)
          setFormatedTime(`${splitedTimeHour + splitedTimeZone + ' ' + '-' + ' ' + nextHour + newXone}`)

          return
        }
        if(splitedTimeHour == 10 && splitedTimeZone == 'pm'){
          newXone = 'am'
           let nextHour ;
          nextHour= parseInt(splitedTimeHour) + 2 ;
          console.log("🚀 ~ file: Suggestions.js ~ line 90 ~ useEffect ~ hour", splitedTimeHour + splitedTimeZone , '-' , nextHour + `${newXone}`)
          setFormatedTime(`${splitedTimeHour + splitedTimeZone + ' ' + '-' + ' ' + nextHour + newXone}`)
          return
        }
        if(splitedTimeHour == 12){
           let nextHour ;
          nextHour= parseInt(splitedTimeHour)%12 + 2 ;
          console.log("🚀 ~ file: Suggestions.js ~ line 90 ~ useEffect ~ hour", splitedTimeHour + splitedTimeZone , '-' , nextHour + `${splitedTimeZone}`)
          setFormatedTime(`${splitedTimeHour + splitedTimeZone + ' ' + '-' + ' ' + nextHour + splitedTimeZone}`)
          return
        }
       
        let nextHour ;
       nextHour= parseInt(splitedTimeHour) + 2 ;
       console.log("🚀 ~ file: Suggestions.js ~ line 0 ~ useEffect ~ hour", splitedTimeHour + splitedTimeZone , '-' , nextHour + splitedTimeZone)
       setFormatedTime(`${splitedTimeHour + splitedTimeZone + ' ' + '-' + ' ' + nextHour + splitedTimeZone}`)

      //  console.log("🚀 ~ file: Suggestions.js ~ line 92 ~ useEffect ~ nextHour", )
      }
     
    }
  }, [flightTime]);


  useEffect(() => {

    if(formatedTime == '12am - 2am'){
      setBestMediumWrostTimeForUser(row1)
      setBestChoice("6am - 8am")
    }
    if(formatedTime == '2am - 4am'){
      setBestMediumWrostTimeForUser(row2)
      setBestChoice("6am - 8am")
    }
    if(formatedTime == '4am - 6am'){
      setBestMediumWrostTimeForUser(row3)
      setBestChoice("6am - 8am")
    }
    if(formatedTime == '6am - 8am'){
      setBestMediumWrostTimeForUser(row4)
      setBestChoice("8am - 10am")
    }
    if(formatedTime == '8am - 10am'){
      setBestMediumWrostTimeForUser(row5)
      setBestChoice("10am - 12pm")
    }
    if(formatedTime == '10am - 12pm'){
      setBestMediumWrostTimeForUser(row6)
      setBestChoice("12pm - 2pm")
    }
    if(formatedTime == '12pm - 2pm'){
      setBestMediumWrostTimeForUser(row7)
      setBestChoice("2pm - 4pm")
    }
    if(formatedTime == '2pm - 4pm'){
      setBestMediumWrostTimeForUser(row8)
      setBestChoice("6am - 8am")
    }
    if(formatedTime == '4pm - 6pm'){
      setBestMediumWrostTimeForUser(row9)
      setBestChoice("6am - 8am")
    }
    if(formatedTime == '6pm - 8pm'){
      setBestMediumWrostTimeForUser(row10)
      setBestChoice("6am - 8am")
    }
    if(formatedTime == '8pm - 10pm'){
      setBestMediumWrostTimeForUser(row11)
      setBestChoice("6am - 8am")
    }
    if(formatedTime == '10pm - 12am'){
      setBestMediumWrostTimeForUser(row12)
      setBestChoice("6am - 8am")
    }

     
  },[formatedTime])
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
              <p class="appointment-form-heading">
                What is your departure date?
              </p>
              <div class="suggestion-date-row">
                {/* <div class="form-group col-12 site-input">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    onFocus={() => console.log("ha")}
                  />
                </div> */}
                <Date datValueFromPicker={datValueFromPicker} />
              </div>
              {/* <div>
            <p class="appointment-form-heading appointment-date-div">
              What time if your flight?
            </p>
            <div class="selectdiv">
              <select
                onChange={(e) => oncFormCHangeHandler(e)}
                name="flightTime"
              >
                <option>---Please Select your flight time---</option>
                {flightTimes.map((fli) => {
                  return <option>{fli}</option>;
                })}
              </select>
            </div>
          </div> */}
              <div>
                <p class="appointment-form-heading appointment-date-div">
                  What time if your flight?
                </p>
                <div class="selectdiv">
                  <Time valueFromPicker={valueFromPicker} />
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
                    <button class="suggest-best-time-btn">
                      <span>{bestChoice}</span> {startDate.toString()}
                    </button>
                  </div>



                  <div class="user-choose">
                    <p class="user-choose-heading">You can also choose</p>
                    {bestMediumWrostTimeForUser?.map((time) => {
                      return(
                        <div class="user-choose-box">
                      <button class="user-choose-conent">
                        {time}
                      </button>
                    </div>
                      )
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
