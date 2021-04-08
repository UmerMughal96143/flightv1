import axios from "axios";

export const resetState = () => async (dispatch) => {
  try {
    dispatch({ type: "RESET_STATE" });
  } catch (error) {}
};

export const bookCovidTest = (data) => async (dispatch) => {
  try {
    dispatch({ type: "BOOK_COVID_TEST", payload: data });
  } catch (error) {}
};

export const testlocation = (data) => async (dispatch) => {
  try {
    dispatch({ type: "TEST_LOCATION", payload: data });
  } catch (error) {}
};

export const addressesAppointment = (data) => async (dispatch) => {
  try {
    dispatch({ type: "ADDRESS_APPOINMENT", payload: data });
  } catch (error) {}
};

export const suggestions = (data) => async (dispatch) => {
  try {
    dispatch({ type: "SUGGESTIONS", payload: data });
  } catch (error) {}
};

export const peopleBookingAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: "PEOPLE_BOOKING", payload: data });
  } catch (error) {}
};

export const removePersons = (data) => async (dispatch) => {
  try {
    dispatch({ type: "REMOVE_PERSON", payload: data });
  } catch (error) {}
};

export const searchPersonForEdit = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCH_PERSON_FOR_EDIT", payload: id });
  } catch (error) {}
};

export const searchPersonForRemove = (id) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCHE_PERSON_FOR_REMOVING", payload: id });
  } catch (error) {}
};

export const updatePersonAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PERSON", payload: id });
  } catch (error) {}
};

export const paymentDetails = (data) => async (dispatch) => {
  try {
    dispatch({ type: "PAYMENT_DETAILS", payload: data });
  } catch (error) {}
};

export const setPrice = (data) => async (dispatch) => {
  try {
    dispatch({ type: "TOTAL_PRICE", payload: data });
  } catch (error) {}
};

export const setAppointmentDate = (data) => async (dispatch) => {
  try {
    dispatch({ type: "APPOINTMENT_DATE", payload: data });
  } catch (error) {}
};

export const postAllFormsData = (data, history) => async (dispatch) => {
  try {
    dispatch({ type: "SET_LOADING" });

    // const res = await axios.post(
    //   "http://localhost:3008/flight/api/v1/form",
    //   data
    // );
    const res = await axios.post(
      "https://flightackened.herokuapp.com/flight/api/v1/form",
      data
    );
    dispatch({ type: "POST_FORM_DATA_SUCCESS", payload: res.data });
    localStorage.setItem("postedData", JSON.stringify(res.data));
    history.push("/bookingcomplete");
    localStorage.removeItem("limit");
    localStorage.removeItem("peoples");
    localStorage.removeItem("numberOfUsers");
    localStorage.removeItem("form");
  } catch (error) {}
};

export const setStatusOfApplication = (number) => async (dispatch) => {
  try {
    dispatch({ type: "SET_LOADING" });

    const res = await axios.post(
      `https://flightackened.herokuapp.com/flight/api/v1/form/status?id=${number}`
    );
  } catch (error) {}
};

export const emerchantPay = (data) => async (dispatch,getState) => {
console.log("🚀 ~ file: form.js ~ line 114 ~ emerchantPay ~ data", data)
  try {
    const config = {
      headers: { "Content-Type": "text/xml" },
    };
    let xmlData = `<wpf_payment>
    <transaction_id>a13123231</transaction_id>
    <usage>usage</usage>
    <description>description</description>
    <notification_url>http://example.com/genesis.php</notification_url>
    <return_success_url>http://localhost:3000/paymentdetails</return_success_url>
    <return_failure_url>http://localhost:3000/paymentdetails</return_failure_url>
    <return_cancel_url>http://localhost:3000/paymentdetails</return_cancel_url>
    <amount>1000000</amount>
    <currency>GBP</currency>
    <customer_email>new_email@example.com</customer_email>
    <customer_phone>1234567890</customer_phone>
    <billing_address>
    <first_name>FirstName</first_name>
    <last_name>LastName</last_name>
    <address1>14 HIGH ROAD</address1>
    <zip_code>RM6 6PR</zip_code>
    <city>LONDON</city>
    <state/>
    <country>GB</country>
    </billing_address>
    <transaction_types>
    <transaction_type name="authorize3d"/>
    </transaction_types>
   </wpf_payment>`;


    axios.post("/en/wpf",xmlData,{
      headers : {
        'Content-Type': 'text/xml',
        'Access-Control-Allow-Origin' : '*',
      },
      auth: {
        username: 'afec0aff1e20c8950568e32771412e9757640721',
        password: 'c23d19d0180b179d2d6d6509d1e8c0c03778902d'
      }
    });

    var state = getState()
    console.log("🚀 ~ file: form.js ~ line 146 ~ emerchantPay ~ state", state)
  } catch (error) {}
};
