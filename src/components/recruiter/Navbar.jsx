import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"; 
import RecruiterProfile from "../../applications/RecruiterProfile";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="navbar">
        <div className="navbar-left">
          <span className="logo">Recruiter Portal</span>
        </div>

        <div className="navbar-right">
          <a href="/home" className="nav-link">Home</a>
          <a href="/find-jobs" className="nav-link">Find Jobs</a>
          <a href="/postjob" className="nav-link">Post Jobs</a>

          {/* Trigger Side Sheet */}
          <SheetTrigger>
            <button className="nav-link" onClick={() => setOpen(true)}>
              Profile
            </button>
          </SheetTrigger>

          <button className="nav-link" onClick={() => navigate("/login")}>
            Logout
          </button>
        </div>
      </div>

      {open && (
        <SheetContent side="right" className="sheet-content" setOpen={setOpen}>
          <RecruiterProfile setOpen={setOpen} />
        </SheetContent>
      )}
    </Sheet>
  );
}
