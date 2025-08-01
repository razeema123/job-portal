// RecruiterProfile.jsx
import React, { useState } from "react";
import Sidebar from "../components/recruiter/Sidebar";
import Navbar from "../components/recruiter/Navbar";
import { FaEnvelope, FaPhone, FaBuilding, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./RecruiterProfile.css";

export default function RecruiterProfile({ showNavbar = true, showSidebar = true }) {
  const navigate = useNavigate();

  const [recruiter, setRecruiter] = useState({
    name: "Aiswarya Lakshmi",
    email: "aiswarya@example.com",
    phone: "+91 7909171194",
    company: "TechRecruit Solutions",
    position: "Senior Talent Acquisition",
    bio: "Experienced recruiter passionate about connecting talent with opportunity. Specializing in tech and product roles.",
    image: "https://i.pravatar.cc/150?img=32",
  });

  const [formData, setFormData] = useState({ ...recruiter });
  const [viewMode, setViewMode] = useState(true);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setRecruiter(formData);
    setViewMode(true);
  };

  const handleView = () => {
    setViewMode(true);
  };

  const handleEditClick = () => {
    setViewMode(false);
    document.getElementById("editTrigger")?.click();
  };

  return (
    <div className="recruiter-profile-page">
      {showNavbar && <Navbar />}

      <div className="profile-layout">
        {showSidebar && <Sidebar />}

        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-actions">
              <div className="dropdown">
                <button className="menu-btn"><FaEllipsisV /></button>
                <div className="dropdown-content">
                  <button onClick={handleView}>View</button>
                  <button onClick={handleEditClick}>Edit</button>
                </div>
              </div>
            </div>

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

            {!viewMode && (
              <Select>
                <SelectTrigger asChild>
                  <Button className="edit-btn" id="editTrigger">Edit Profile</Button>
                </SelectTrigger>

                <SelectContent side="right" className="edit-profile-sheet">
                  <div className="edit-profile-form">
                    <div className="form-group">
                      <Label>Name</Label>
                      <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
                    </div>

                    <div className="form-group">
                      <Label>Email</Label>
                      <Input value={formData.email} onChange={(e) => handleChange("email", e.target.value)} />
                    </div>

                    <div className="form-group">
                      <Label>Phone</Label>
                      <Input value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                    </div>

                    <div className="form-group">
                      <Label>Company</Label>
                      <Input value={formData.company} onChange={(e) => handleChange("company", e.target.value)} />
                    </div>

                    <div className="form-group">
                      <Label>Position</Label>
                      <Input value={formData.position} onChange={(e) => handleChange("position", e.target.value)} />
                    </div>

                    <div className="form-group">
                      <Label>Bio</Label>
                      <Input value={formData.bio} onChange={(e) => handleChange("bio", e.target.value)} />
                    </div>
                  </div>

                  <div className="edit-footer">
                    <button className="save-btn" onClick={handleSave}>Save</button>
                    <button className="cancel-btn" onClick={() => setViewMode(true)}>Cancel</button>
                  </div>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}