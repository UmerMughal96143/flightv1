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
};

export const Form = (state = iniitialState, action) => {
  switch (action.type) {
    case "BOOK_COVID_TEST":
      let obj = {
        title: action.payload,
      };
      let arr = [];
      arr.push(obj);
      localStorage.setItem("form", JSON.stringify(arr));
      return {
        ...state,
        data: [...arr],
      };

    case "TEST_LOCATION":

      let tesLocation = {
        testLocation: action.payload,
      };
      state.data[1] = tesLocation
      localStorage.setItem('form' , JSON.stringify(state.data))
      return {
        ...state,
      };

    case "ADDRESS_APPOINMENT":
      // let addressAppointment = {
      //   testLocation: action.payload,
      // };
      state.data[2] = action.payload
      localStorage.setItem('form' , JSON.stringify(state.data))
      return {
        ...state,
      };

    case "SUGGESTIONS":
      state.data[3] = action.payload
      localStorage.setItem('form' , JSON.stringify(state.data))
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
          ...state.peoplesData.filter((fil) => fil.Person !== action.payload),
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

    case "POST_FORM_DATA_SUCCESS":
      return {
        ...state,
        postedData: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
