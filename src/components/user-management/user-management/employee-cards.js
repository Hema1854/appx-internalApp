import React from "react";
import "./employee-cards.css"; // Custom CSS for styling
// import prabhas from "../images/prabhas.jpg"; // Default image
import prabhas from '../../images/prabhas.jpg';

const employees = [
  {
    id: "EMP01",
    name: "Sai Sujeeth",
    role: "CEO",
    type: "Managerial",
    status: "Active",
    employment: "Fulltime",
    email: "bagusfikri@gmail.com",
    phone: "+62 123 123 123",
    joinedDate: "29 Oct, 2020",
    image: "sujith.jpeg",
  },
  {
    id: "EMP02",
    name: "Sree Teja",
    role: "Illustrator",
    type: "Managerial",
    status: "Active",
    employment: "Fulltime",
    email: "ihdizein@gmail.com",
    phone: "(40) 768 082 716",
    joinedDate: "1 Feb, 2019",
    image: "teja.JPG",
  },
  {
    id: "EMP03",
    name: "Suneetha Munagala",
    role: "Project Manager",
    type: "Managerial",
    status: "Active",
    employment: "Fulltime",
    email: "mufti@gmail.com",
    phone: "(63) 130 689 256",
    joinedDate: "1 Feb, 2021",
    image: "suneetha.jpeg",
  },
  {
    id: "EMP04",
    name: "Munisa Jnr",
    role: "UI Designer",
    type: "Managerial",
    status: "Active",
    employment: "Fulltime",
    email: "helloazen@gmail.com",
    phone: "(64) 630 413 343",
    joinedDate: "21 Sep, 2018",
    image: "munisa.jpeg", 
  },
  {
    id: "EMP03",
    name: "Hitler",
    role: "Project Manager",
    type: "Managerial",
    status: "Active",
    employment: "Fulltime",
    email: "mufti@gmail.com",
    phone: "(63) 130 689 256",
    joinedDate: "1 Feb, 2021",
    image: "",
  },
];

const EmployeeCard = ({ employee }) => {
  let imagePath;

  try {
    // Dynamically require the employee's image if it exists
    imagePath = require(`../../images/${employee.image}`);
  } catch (error) {
    // Fall back to the default image
    imagePath = prabhas;
    
  }

  return (
    <div className="main-card">
      <div className="profile-photo">
        <img
          src={imagePath} // Use either the employee's image or the default image
          alt={employee.name}
          className="profile-image"
        />
      </div>
      <div className="inner-card">
        <h3>{employee.name}</h3>
        <p className="employee-id">#{employee.id}</p>
        <p className="employee-detail">
          <strong>Role:</strong> {employee.role}
        </p>
        <p className="employee-detail">
          <strong>Email:</strong> {employee.email}
        </p>
        <p className="employee-detail">
          <strong>Phone:</strong> {employee.phone}
        </p>
        <p className="joined-details">
          <strong>Joined at:</strong> {employee.joinedDate}
        </p>
        <button className="view-details-btn">View details</button>
      </div>
    </div>
  );
};

const EmployeeCards = () => (
  <div className="employee-cards-container">
    {employees.map((employee) => (
      <EmployeeCard key={employee.id} employee={employee} />
    ))}
  </div>
);

export default EmployeeCards;
