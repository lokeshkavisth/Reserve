import React from "react";
import { seats } from "../data/data.json";
import Button from "./ui/Button";
import Checkbox from "./ui/Checkbox";
import { useNavigate } from "react-router-dom";

const SeatLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const selectSeats = (e) => {
    setLoading((prev) => !prev);
    e.preventDefault();

    const formValues = {};
    const formData = new FormData(e.target);

    formData.forEach((value, key) => {
      if (value !== "") {
        formValues[key] = value;
      }
    });

    console.log("formvalues", formValues);
    navigate("/payment");
    setLoading((prev) => !prev);
  };

  const resetSeatSelection = () => {
    const form = document.getElementById("selectSeats");
    form.reset();
  };

  return (
    <section className="border p-4 rounded-md space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h2 className="w-full">Select seats</h2>
        <Button
          text="Clear Selection"
          onClick={resetSeatSelection}
          className="max-w-max text-xs bg-red-500"
        />
      </div>
      <hr />

      <form id="selectSeats" onSubmit={selectSeats} className="space-y-4">
        <ul className="flex items-center justify-between flex-wrap gap-4">
          {seats.map(({ value }) => (
            <li key={value}>
              <Checkbox
                id={value}
                value={value}
                htmlFor={value}
                label={value}
                name={value}
              />
            </li>
          ))}
        </ul>

        <Button text="Proceed To Book" type="submit" />
      </form>
    </section>
  );
};

export default SeatLayout;
