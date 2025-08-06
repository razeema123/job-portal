import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import '../EditJob.css'; // Assuming you have a CSS file for styling



export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-Time",
    salary: "",
    description: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:5002/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch(() => toast.error("Failed to load job data"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5002/api/jobs/update/${id}`, job);
      toast.success("Job updated!");
      navigate("/postjob"); // back to recruiter job list
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="edit-job-form">
      <ToastContainer />
      <h2>Edit Job</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" name="title" value={job.title} onChange={handleChange} placeholder="Job Title" required />
        <input type="text" name="company" value={job.company} onChange={handleChange} placeholder="Company" required />
        <input type="text" name="location" value={job.location} onChange={handleChange} placeholder="Location" required />
        <select name="jobType" value={job.jobType} onChange={handleChange}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>
        <input type="number" name="salary" value={job.salary} onChange={handleChange} placeholder="Salary" required />
        <textarea name="description" value={job.description} onChange={handleChange} placeholder="Job Description" required />
        <button type="submit">Update Job</button>
      </form>
    </div>
  );
}
