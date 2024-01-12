import React from "react";
import SeatLayout from "../SeatLayout";
import Button from "./Button";

const Card2 = (props) => {
  const {
    busName,
    fare,
    amenities,
    origin,
    destination,
    categories,
    departureDate,
    arrivalDate,
    departureTime,
    arrivalTime,
    id,
    isBtnShow = true,
  } = props;

  const [isSeatVisible, SetIsSeatVisible] = React.useState(false);

  const departureT = new Date(departureTime).toLocaleTimeString("en-US", {
    timeStyle: "short",
  });
  const arrivalT = new Date(arrivalTime).toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  const tripDetails = React.useMemo(
    () => ({
      departureDate,
      departureTime,
      arrivalDate,
      arrivalTime,
    }),
    [departureDate, departureTime, arrivalDate, arrivalTime]
  );

  const departureDateTime = new Date(tripDetails.departureDate).getTime();
  const arrivalDateTime = new Date(tripDetails.arrivalDate).getTime();

  const timeDifferenceInMillis = arrivalDateTime - departureDateTime;

  // Convert milliseconds to days
  const days = Math.floor(timeDifferenceInMillis / (1000 * 60 * 60 * 24));

  // Extract hours and minutes from departure and arrival times
  const timeDeparture = new Date(tripDetails.departureTime);
  const timeArrival = new Date(tripDetails.arrivalTime);

  // Calculate time difference in milliseconds
  const timeDifferenceInMs = timeArrival - timeDeparture;

  // Convert milliseconds to hours and minutes
  const hours = Math.abs(Math.floor(timeDifferenceInMs / (1000 * 60 * 60)));
  const minutes = Math.abs(
    Math.floor((timeDifferenceInMs % (1000 * 60 * 60)) / (1000 * 60))
  );

  const handleViewSeats = (tripId) => {
    if (tripId === id) SetIsSeatVisible((prev) => !prev);
  };

  return (
    <div>
      <section
        className={`grid h-full ${
          isBtnShow ? "grid-cols-1 sm:grid-cols-4" : "grid-cols-1"
        } border p-4 rounded-md shadow-sm bg-white relative`}
      >
        <section className="col-span-3 space-y-4">
          <h2 className="text-xl font-semibold capitalize">{busName}</h2>
          {categories && (
            <div>
              <ul className="flex items-center flex-wrap gap-2">
                {categories?.map((category, i) => (
                  <li
                    key={i}
                    className="uppercase bg-gray-200 py-1 px-2 text-xs rounded border border-gray-300"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-4">
            <section className="text-gray-600">
              <h3>Departure</h3>
              <time dateTime={departureDate.split("T")[0]}>
                <p>{departureDate.split("T")[0]}</p>
                <p className="text-xs">
                  <em className="capitalize">{origin}</em> {departureT}
                </p>
              </time>
            </section>

            <section className="text-gray-600 flex items-centers gap-2">
              <i>&#9473;&#9473;&#9473;&#9473;</i>
              <p>
                {days} days {hours} hrs {minutes} mins
              </p>
              <i>&#9473;&#9473;&#9473;&#9473;</i>
            </section>

            <section className="text-gray-600">
              <h3>Arrival</h3>
              <time dateTime={arrivalDate.split("T")[0]}>
                <p>{arrivalDate.split("T")[0]}</p>
                <p className="text-xs">
                  <em className="capitalize">{destination}</em> {arrivalT}
                </p>
              </time>
            </section>
          </div>

          {amenities && (
            <div>
              <ul className="flex items-center flex-wrap gap-2">
                {amenities?.map((amenity, i) => (
                  <li
                    key={i}
                    className="uppercase bg-blue-200 border border-blue-300 py-1 px-2 text-xs rounded"
                  >
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
        {isBtnShow && (
          <aside className="sm:border-l col-span-1 p-4 flex flex-col items-center justify-center">
            <h6 className="text-gray-600">Trip Cost</h6>
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
              &#8377;{fare}
            </h2>
            <Button text="View Seat" onClick={() => handleViewSeats(id)} />
            <p className="text-xs mt-1 text-blue-500">all taxes included*</p>
          </aside>
        )}
      </section>
      {isSeatVisible && <SeatLayout {...props} />}
    </div>
  );
};

export default Card2;
