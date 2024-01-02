import React from "react";

const Card3 = (props) => {
  const {
    busNumber,
    seats,
    origin,
    destination,
    departureDate,
    arrivalDate,
    departureTime,
    arrivalTime,
  } = props;

  const departureT = new Date(departureTime).toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  const arrivalT = new Date(arrivalTime).toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  return (
    <div className="bg-white p-4 rounded-md border space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <h2 className="uppercase">{busNumber}</h2>

        <div className="flex items-center gap-2 capitalize">
          <h3>Capacity:</h3>
          <h3>{seats < 10 ? `0${seats}` : seats}</h3>
        </div>
        <div className="flex items-center gap-2 capitalize">
          <h3>Origin:</h3>
          <p>{origin}</p>
        </div>
        <div className="flex items-center gap-2 capitalize">
          <h3>Destination:</h3>
          <p>{destination}</p>
        </div>
        <div className="flex items-center gap-2 capitalize">
          <h3>Departure Time:</h3>
          <p>{departureT}</p>
        </div>
        <div className="flex items-center gap-2 capitalize">
          <h3>Arrival Time:</h3>
          <p>{arrivalT}</p>
        </div>
        <div className="flex items-center gap-2 capitalize">
          <h3>Departure Date:</h3>
          <p>{departureDate.split("T")[0]}</p>
        </div>
        <div className="flex items-center gap-2 capitalize">
          <h3>Arrival Date:</h3>
          <p>{arrivalDate.split("T")[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default Card3;
