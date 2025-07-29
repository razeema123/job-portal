import { useNavigate } from "react-router-dom";
import "./UserApplications.css";

export default function UserApplications() {
  const navigate = useNavigate();

  const applications = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      resume: "alice_resume.pdf",
      phone: "9876543210",
    //   address: "123 Main Street, Delhi",
      jobTitle: "Frontend Developer",
      company: "TechCorp",
      location: "Delhi",
      status: "Pending",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      resume: "bob_resume.pdf",
      phone: "7890123456",
    //   address: "45 North Avenue, Mumbai",
      jobTitle: "Backend Developer",
      company: "CodeBase",
      location: "Mumbai",
      status: "Reviewed",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      resume: "charlie_resume.pdf",
      phone: "9988776655",
    //   address: "89 West Lane, Bangalore",
      jobTitle: "UI/UX Designer",
      company: "DesignHub",
      location: "Bangalore",
      status: "Shortlisted",
    },
  ];

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Job Portal</h2>
        <ul className="sidebar-menu">
          <li onClick={() => navigate("/postjob")}>Jobs</li>
          {/* <li onClick={() => navigate("/viewapplications")}>View Applications</li> */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <header className="header">
          <h4 id="user-applications">User Applications</h4>
          <button className="back-btn" onClick={() => navigate(-1)}>← Back to Jobs</button>
        </header>

        <div className="applications-table-container">
          {applications.length === 0 ? (
            <p>No applications submitted yet.</p>
          ) : (
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  {/* <th>Address</th> */}
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Resume</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr key={app.id}>
                    <td>{app.name}</td>
                    <td>{app.email}</td>
                    <td>{app.phone}</td>
                    {/* <td>{app.address}</td>               */}
                    <td>{app.jobTitle}</td>
                    <td>{app.company}</td>
                    <td>{app.location}</td>
                    <td>
                      <a href="#!" className="resume-link">{app.resume}</a>
                    </td>
                    <td>{app.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <footer className="footer">
          <p>&copy; 2025 Job Portal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
