import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ correct import for v4
import "./Notifications.css"; // optional if you have styles

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ use jwtDecode
        console.log("Decoded Token:", decoded);
        setUserId(decoded.id); // make sure backend sets "id" in token
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5002/api/notifications/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 🔑 send token
            },
          }
        );
        console.log("Fetched Notifications:", res.data);
        setNotifications(res.data);
      } catch (err) {
        console.error("❌ Error fetching notifications:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };
    

    fetchNotifications();
  }, [userId]);

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5002/api/notifications/${notificationId}/mark-read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🔑 send token
          },
        }
      );
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      console.error("❌ Failed to mark notification as read:", err.response?.data || err);
    }
  };
  

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="notifications-page">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((n) => (
            <li
              key={n._id}
              className={`notification-item ${n.read ? "read" : "unread"}`}
              onClick={() => !n.read && markAsRead(n._id)}
            >
              {n.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
