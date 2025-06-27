import React, { useState, useEffect } from "react";
import axios from "axios";
import "./editProfile.css";
axios.defaults.withCredentials = true;

const EditProfile = ({ userId }) => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/me")
      .then((r) =>
        setUser({ username: r.data.response.username, email: r.data.response.email })
      )
      .catch((err) => setError("Failed to load user info"));
  }, []);

  const handleUserChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    axios
      .patch(
        "http://localhost:8080/api/user/profile/edit",
        user,
        { withCredentials: true }
      )
      .then((res) => setMessage(res.data.message || "Profile updated!"))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to update profile.")
      );
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const payload = {
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
    };

    axios
      .patch(
        "http://localhost:8080/api/user/profile/edit",
        payload,
        { withCredentials: true }
      )
      .then((res) => setMessage(res.data.message || "Password updated!"))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to update password.")
      );
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete("http://localhost:8080/api/user/delete")
        .then(() => {
          alert("Account deleted.");
          window.location.href = "/login";
        })
        .catch(() => alert("Failed to delete account."));
    }
  };

  const handleLogout = () => {
    axios.post("http://localhost:8080/perform_logout", {}, { withCredentials: true })
      .finally(() => {
        localStorage.clear();
        window.location.href = "/login";
      });
  };

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <div className="edit-profile-header">Edit Profile</div>

        {message && <div className="success-msg">{message}</div>}
        {error && <div className="error-msg">{error}</div>}

        {/* Profile Info */}
        <section className="profile-section">
          <h3>Profile Information</h3>
          <p>Update your account's profile information and email address.</p>
          <form onSubmit={handleProfileUpdate}>
            <div className="profile-inputbox">
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleUserChange}
                placeholder="Username"
              />
            </div>
            <div className="profile-inputbox">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleUserChange}
                placeholder="Email"
              />
            </div>
            <button className="profile-action-button" type="submit">
              Save
            </button>
          </form>
        </section>

        {/* Password */}
        <section className="profile-section">
          <h3>Update Password</h3>
          <p>Use a strong password to keep your account secure.</p>
          <form onSubmit={handlePasswordUpdate}>
            <div className="profile-inputbox">
              <input
                type="password"
                name="oldPassword"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
                placeholder="Current Password"
              />
            </div>
            <div className="profile-inputbox">
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
              />
            </div>
            <div className="profile-inputbox">
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm New Password"
              />
            </div>
            <button className="profile-action-button" type="submit">
              Save
            </button>
          </form>
        </section>

        {/* Danger Zone */}
        <section className="profile-section danger-zone">
          <h3>Account Actions</h3>
          <p>Logout or delete your account permanently.</p>
          <div className="profile-buttons">
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
            <button className="delete" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditProfile;
