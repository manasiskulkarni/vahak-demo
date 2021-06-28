import * as actionTypes from "./action";

const initialState = {
  source: "",
  destination: "",
  vehicle: "",
  number: "",
  cost: "",
  phone: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SOURCE: {
      return {
        ...state,
        source: action.payload,
      };
    }
    case actionTypes.DESTINATION: {
      return {
        ...state,
        destination: action.payload,
      };
    }
    case actionTypes.VEHICLE: {
      return {
        ...state,
        vehicle: action.payload,
      };
    }
    case actionTypes.NUMBER: {
      return {
        ...state,
        number: action.payload,
      };
    }
    case actionTypes.COST: {
      return {
        ...state,
        cost: action.payload,
      };
    }
    case actionTypes.PHONE: {
      return {
        ...state,
        phone: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
