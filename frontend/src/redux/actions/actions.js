export const createAction = (type, payload) => ({ type, payload });

export const getCurrentUser = (user) => createAction("GET_CURRENT_USER", user);
export const getLocations = (locations) =>
  createAction("GET_LOCATIONS", locations);
export const getTrips = (trips) => createAction("GET_TRIPS", trips);
export const tripToBook = (booking) => createAction("TRIP_TO_BOOK", booking);
