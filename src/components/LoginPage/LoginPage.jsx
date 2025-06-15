import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("student");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const { studentLogin, adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleStudentLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!admissionNumber || !studentPassword) {
      setError("Please enter both admission number and password");
      return;
    }

    const success = studentLogin(admissionNumber, studentPassword);
    if (success) {
      navigate("/student/dashboard");
    } else {
      setError("Invalid admission number or password");
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!adminUsername || !adminPassword) {
      setError("Please enter both username and password");
      return;
    }

    const success = adminLogin(adminUsername, adminPassword);
    if (success) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-section">
          <h1>Faculty Feedback System</h1>
          <p>Login to access your dashboard</p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === "student" ? "active" : ""}`}
            onClick={() => setActiveTab("student")}
          >
            Student Login
          </button>
          <button
            className={`tab ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => setActiveTab("admin")}
          >
            Admin Login
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {activeTab === "student" ? (
          <form onSubmit={handleStudentLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="admissionNumber">Admission Number</label>
              <input
                type="text"
                id="admissionNumber"
                value={admissionNumber}
                onChange={(e) => setAdmissionNumber(e.target.value)}
                placeholder="Enter your admission number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="studentPassword">Password (Roll Number)</label>
              <input
                type="password"
                id="studentPassword"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
                placeholder="Enter your roll number"
              />
            </div>
            <button type="submit" className="login-button">
              Login as Student
            </button>
          </form>
        ) : (
          <form onSubmit={handleAdminLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="adminUsername">Username</label>
              <input
                type="text"
                id="adminUsername"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                placeholder="Enter admin username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="adminPassword">Password</label>
              <input
                type="password"
                id="adminPassword"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
              />
            </div>
            <button type="submit" className="login-button">
              Login as Admin
            </button>
          </form>
        )}

        {/* <div className="login-footer">
          <p>For demo purposes:</p>
          <p>Student: S001/R001, S002/R002, S003/R003, S004/R004</p>
          <p>Admin: admin/admin123</p>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
