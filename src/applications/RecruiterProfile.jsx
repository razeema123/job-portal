import React from "react";
import "./RecruiterProfile.css";
import Sidebar from "../components/recruiter/SideBar";
import { FaEnvelope, FaPhone, FaBuilding, FaEdit } from "react-icons/fa";

export default function RecruiterProfile() {
  const recruiter = {
    name: "Aiswarya Lakshmi",
    email: "aiswarya@example.com",
    phone: "+91 7909171194",
    company: "TechRecruit Solutions",
    position: "Senior Talent Acquisition",
    bio: "Experienced recruiter passionate about connecting talent with opportunity. Specializing in tech and product roles.",
    image: "https://i.pravatar.cc/150?img=32", 
  };

  return (
    <div className="recruiter-profile-page">
      <nav className="top-nav">
        <div className="logo">JobPortal</div>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/find-jobs">Find Jobs</a></li>
          <li><a className="active" href="/recruiter-profile">Profile</a></li>
        </ul>
      </nav>

      <div className="profile-layout">
        <Sidebar />
        <div className="profile-container">
          <div className="profile-card">
            <img src={recruiter.image} alt="Recruiter" className="profile-img" />
            <h2>{recruiter.name}</h2>
            <p className="position">{recruiter.position}</p>

            <div className="info">
              <p><FaEnvelope /> {recruiter.email}</p>
              <p><FaPhone /> {recruiter.phone}</p>
              <p><FaBuilding /> {recruiter.company}</p>
            </div>

            <div className="bio">
              <h4>About</h4>
              <p>{recruiter.bio}</p>
            </div>

            <button className="edit-btn"><FaEdit /> Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}
