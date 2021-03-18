import axios from "axios";

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



export const postAllFormsData = (data , history) => async (dispatch) => {
    
  try {
    const res =  await axios.post('https://flightackened.herokuapp.com/flight/api/v1/form' , data)
    dispatch({ type: "POST_FORM_DATA_SUCCESS", payload: res.data });
    localStorage.setItem('postedData' , JSON.stringify(res.data))
    history.push("/bookingcomplete");
    localStorage.removeItem("limit")
    localStorage.removeItem("peoples")
    localStorage.removeItem("numberOfUsers")
    localStorage.removeItem("form")
  } catch (error) {}
};
