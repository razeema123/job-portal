// src/api/jobs.js
import API from './axios';

// Create Job
export const createJob = (jobData) => API.post('/jobs', jobData);

// Get Jobs
export const getJobs = () => API.get('/jobs');

// Get Job by ID
export const getJob = (id) => API.get(`/jobs/${id}`);

// Update Job
export const updateJob = (id, jobData) => API.put(`/jobs/${id}`, jobData);

// Delete Job
export const deleteJob = (id) => API.delete(`/jobs/${id}`);
