const initialState = {
  user: {},
  locations: [],
  trips: [],
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

    default:
      return state;
  }
};

export default reducer;
