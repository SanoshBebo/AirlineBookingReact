import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const GetPassengerInfo = ({ userDetails }) => {
  const [passengers, setPassengers] = useState([
    {
      Name: "",
      Age: 0,
      Gender: "",
    },
  ]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [name]: value };
    setPassengers(updatedPassengers);
  };

  const handleAddPassenger = () => {
    if (passengers.length < 10) {
      setPassengers([...passengers, { Name: "", Age: 0, Gender: "" }]);
    } else {
      toast.error("Maximum passengers limit reached (10).");
    }
  };

  const handleRemovePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  const handleConfirmPassengers = () => {
    let invalidDetailsFlag = false; // Initialize the flag here
  
    passengers.forEach((passenger) => {
      if (passenger.Name.length <= 2 ||
          (passenger.Gender !== "Male" && passenger.Gender !== "Female") ||
          passenger.Age >= 110 || passenger.Age <= 0) {
        invalidDetailsFlag = true; // Set flag to true if any invalid details found
      }
    });
  
    if (invalidDetailsFlag) {
      toast.error("Invalid Details. Enter all the required fields");
    } else {
      userDetails(passengers); // Only send details if no invalid details found
    }
  };
  
  const renderPassengerInputs = () => {
    return passengers.map((passenger, index) => (
      <div key={index} className="my-4 p-4 border rounded shadow-lg bg-white">
        <h3 className="text-lg font-semibold mb-4">Passenger {index + 1}</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            name="Name"
            value={passenger.Name}
            onChange={(e) => handleInputChange(index, e)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            placeholder="Age"
            name="Age"
            value={passenger.Age}
            onChange={(e) => handleInputChange(index, e)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <select
            name="Gender"
            value={passenger.Gender}
            onChange={(e) => handleInputChange(index, e)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button
          onClick={() => handleRemovePassenger(index)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
        >
          Remove
        </button>
      </div>
    ));
  };

  return (
    <div className="p-4 bg-[#FCF6F5]">
      <h2 className="text-2xl font-bold mb-4">Enter Passenger Information</h2>
      {renderPassengerInputs()}
      <button
        onClick={handleAddPassenger}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mr-2"
      >
        Add New Passenger
      </button>
      <button
        onClick={() => handleConfirmPassengers()}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
      >
        Confirm Passengers
      </button>
      <ToastContainer />
    </div>
  );
};

export default GetPassengerInfo;
