const iniitialState = {
  data: localStorage.getItem("form")
    ? JSON.parse(localStorage.getItem("form"))
    : [],
  loading: false,
  peoplesData: localStorage.getItem("peoples")
    ? JSON.parse(localStorage.getItem("peoples"))
    : [],
  editMan: null,
  postedData: localStorage.getItem("postedData")
    ? JSON.parse(localStorage.getItem("postedData"))
    : null,
  personForRemove: null,
  totalPrice: localStorage.getItem("price")
    ? localStorage.getItem("price")
    : null,
  appointmentDate: localStorage.getItem("appointmentDate")
    ? localStorage.getItem("appointmentDate")
    : null,
};

export const Form = (state = iniitialState, action) => {
  switch (action.type) {
    case "BOOK_COVID_TEST":
      console.log(action.payload);
      let arr = [];
      arr.push(action.payload);
      localStorage.setItem("form", JSON.stringify(arr));
      return {
        ...state,
        data: [...arr],
      };

    case "TEST_LOCATION":
      let tesLocation = {
        testLocation: action.payload,
      };
      state.data[1] = tesLocation;
      localStorage.setItem("form", JSON.stringify(state.data));
      return {
        ...state,
      };

    case "ADDRESS_APPOINMENT":
      // let addressAppointment = {
      //   testLocation: action.payload,
      // };
      state.data[2] = action.payload;
      localStorage.setItem("form", JSON.stringify(state.data));
      return {
        ...state,
      };

    case "SUGGESTIONS":
      state.data[3] = action.payload;
      localStorage.setItem("form", JSON.stringify(state.data));
      return {
        ...state,
      };
    case "PEOPLE_BOOKING":
      localStorage.setItem(
        "peoples",
        JSON.stringify([...state.peoplesData, action.payload])
      );
      return {
        ...state,
        peoplesData: [...state.peoplesData, action.payload],
      };
    case "REMOVE_PERSON":
      return {
        ...state,
        peoplesData: [
          ...state.peoplesData.filter((fil) => fil.id !== action.payload),
        ],
      };
    case "SEARCH_PERSON_FOR_EDIT":
      let editPersonFounded = state.peoplesData.find(
        (f) => f.id == action.payload
      );
      return {
        ...state,
        editMan: editPersonFounded,
      };

    case "UPDATE_PERSON":
      var foundIndex = state.peoplesData.findIndex(
        (x) => x.id == action.payload.id
      );
      state.peoplesData[foundIndex] = action.payload;
      return {
        ...state,
        editMan: null,
      };

    case "PAYMENT_DETAILS":
      localStorage.setItem(
        "form",
        JSON.stringify([...state.data, action.payload])
      );
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case "SEARCHE_PERSON_FOR_REMOVING":
      let searchedPerson = state.peoplesData.find(
        (f) => f.id == action.payload
      );
      return {
        ...state,
        personForRemove: searchedPerson,
      };
    case "POST_FORM_DATA_SUCCESS":
      return {
        ...state,
        postedData: action.payload
      };
    case "TOTAL_PRICE":
      localStorage.setItem("price", action.payload);
      return {
        ...state,
        totalPrice: action.payload,
      };
    case "APPOINTMENT_DATE":
      localStorage.setItem("appointmentDate", action.payload);
      return {
        ...state,
        appointmentDate: action.payload,
      };

      case "RESET_STATE" : 
      return{
        data: [],
      loading: false,
      peoplesData:  [],
      editMan: null,
      postedData: null,
      personForRemove: null,
      totalPrice:  null,
      appointmentDate: null,
      
      }
    default:
      return {
        ...state,
      };
  }
};
