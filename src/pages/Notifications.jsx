import React, { useEffect, useState } from "react";
import axios from "axios";
import "./notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    console.log("📌 DEBUG — Loaded token from localStorage:", token);
    console.log("📌 DEBUG — Loaded userId from localStorage:", userId);

    if (!userId || !token) {
      console.warn("⚠️ No token or userId found, cannot fetch notifications");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    const url = `http://localhost:5002/api/notifications/${userId}`;
    console.log("📌 DEBUG — Fetching notifications from:", url);

    axios
      .get(url, { headers })
      .then((res) => {
        console.log("✅ DEBUG — Notifications API response:", res.data);
        setNotifications(res.data);
      })
      .catch((err) => {
        console.error(
          "❌ DEBUG — Failed to fetch notifications:",
          err.response?.data || err.message
        );
      });

    axios
      .put(`http://localhost:5002/api/notifications/${userId}/mark-read`, {}, { headers })
      .then(() => console.log("✅ DEBUG — Marked notifications as read"))
      .catch((err) => {
        console.error(
          "❌ DEBUG — Failed to mark notifications as read:",
          err.response?.data || err.message
        );
      });
  }, [userId, token]);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul>
          {notifications.map((n, idx) => (
            <li key={idx}>
              {n.message}
              <small> — {new Date(n.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
