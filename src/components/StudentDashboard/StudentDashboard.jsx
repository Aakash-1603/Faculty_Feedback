import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import Header from "../Header/Header";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { getFilteredTeachers, feedbacks } = useData();
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);

  // Use the student's class information from their profile
  const year = currentUser.year;
  const branch = currentUser.branch;
  const section = currentUser.section;

  useEffect(() => {
    // Get teachers only for the student's year, branch, and section
    const filteredTeachers = getFilteredTeachers(year, branch, section);
    setTeachers(filteredTeachers);
  }, [year, branch, section, getFilteredTeachers]);

  const handleGiveFeedback = (teacherId) => {
    navigate(`/student/feedback/${teacherId}`);
  };

  // Check if feedback already given for a teacher
  const hasFeedback = (teacherId) => {
    return feedbacks.some(
      (feedback) =>
        feedback.teacherId === teacherId &&
        feedback.studentId === currentUser.id &&
        feedback.year === year &&
        feedback.branch === branch &&
        feedback.section === section
    );
  };

  return (
    <div className="dashboard-container">
      <Header
        title="Student Dashboard"
        userName={currentUser.name}
        onLogout={logout}
      />

      <div className="dashboard-content">
        <div className="student-info-section">
          <h2>Your Class Information</h2>
          <div className="student-info">
            <p>
              <strong>Year:</strong>{" "}
              {year === "1"
                ? "1st"
                : year === "2"
                ? "2nd"
                : year === "3"
                ? "3rd"
                : "4th"}{" "}
              Year
            </p>
            <p>
              <strong>Branch:</strong> {branch}
            </p>
            <p>
              <strong>Section:</strong> {section}
            </p>
          </div>
        </div>

        <div className="teachers-list">
          <h2>Your Teachers</h2>
          {teachers.length === 0 ? (
            <p className="no-teachers">No teachers assigned to your class.</p>
          ) : (
            <div className="teachers-grid">
              {teachers.map((teacher) => (
                <div key={teacher.id} className="teacher-card">
                  <div className="teacher-image">
                    <img src={teacher.image} alt={teacher.name} />
                  </div>
                  <div className="teacher-info">
                    <h3>{teacher.name}</h3>
                    <p>Subject: {teacher.subjects[0].name}</p>
                    <p>Code: {teacher.subjects[0].code}</p>

                    {hasFeedback(teacher.id) ? (
                      <button className="feedback-button disabled" disabled>
                        Feedback Submitted
                      </button>
                    ) : (
                      <button
                        className="feedback-button"
                        onClick={() => handleGiveFeedback(teacher.id)}
                      >
                        Give Feedback
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
