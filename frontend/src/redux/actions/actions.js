export const getCurrentUser = (user) => {
  return {
    type: "GET_CURRENT_USER",
    payload: user,
  };
};

export const getLocations = (locations) => {
  return {
    type: "GET_LOCATIONS",
    payload: locations,
  };
};

export const getTrips = (trips) => {
  return {
    type: "GET_TRIPS",
    payload: trips,
  };
};

export const tripToBook = (booking) => {
  return {
    type: "TRIP_TO_BOOK",
    payload: booking,
  };
};
