const initialState = {
  user: {},
  locations: [],
  trips: [],
  booking: {},
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_CURRENT_USER":
      return { ...state, user: payload };

    case "GET_LOCATIONS":
      return { ...state, locations: payload };

    case "GET_TRIPS":
      return { ...state, trips: payload };

    case "TRIP_TO_BOOK":
      return { ...state, booking: payload };

    default:
      return state;
  }
};

export default reducer;
