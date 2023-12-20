import React from "react";
import Button from "./Button";

const Card2 = (props) => {
  const {
    busName,
    fare,
    amenities,
    categories,
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

  const tripDetails = {
    departureDate: "2023-12-20T00:00:00.000Z",
    departureTime: "2023-12-20T15:13:57.749Z",
    arrivalDate: "2023-12-24T00:00:00.000Z",
    arrivalTime: "2023-12-20T07:17:57.749Z",
  };

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

  return (
    <article className="grid grid-cols-4 border p-4 rounded-md shadow-sm bg-white">
      <section className="col-span-3 space-y-4">
        <h2 className="text-xl font-semibold capitalize">{busName}</h2>
        <div>
          <ul className="flex items-center gap-2">
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

        <div className="flex items-center gap-4">
          <section className="text-gray-600">
            <h3>Departure</h3>
            <time dateTime="2023-01-10">
              <p>{departureDate.split("T")[0]}</p>
              <p className="text-xs">{departureT}</p>
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
            <time dateTime="2023-01-10">
              <p>{arrivalDate.split("T")[0]}</p>
              <p className="text-xs">{arrivalT}</p>
            </time>
          </section>
        </div>

        <div>
          <ul className="flex items-center gap-2">
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
      </section>

      <aside className="border-l col-span-1 p-4 flex flex-col items-center justify-center">
        <h6 className="text-gray-600">Trip Cost</h6>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          &#8377;{fare}
        </h2>
        <Button text="View Seat" />
      </aside>
    </article>
  );
};

export default Card2;
