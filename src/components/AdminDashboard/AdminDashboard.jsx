import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import Header from "../Header/Header";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { teachers, getFilteredFeedbacks, getTeacherById } = useData();

  const [year, setYear] = useState("1");
  const [branch, setBranch] = useState("CSE");
  const [section, setSection] = useState("A");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});

  useEffect(() => {
    // Reset selected teacher when filters change
    setSelectedTeacher(null);

    // Get feedbacks based on filters
    const filteredFeedbacks = getFilteredFeedbacks(year, branch, section);
    setFeedbacks(filteredFeedbacks);

    // Calculate average ratings for each teacher
    const teacherIds = [...new Set(filteredFeedbacks.map((f) => f.teacherId))];
    const avgRatings = {};

    teacherIds.forEach((teacherId) => {
      const teacherFeedbacks = filteredFeedbacks.filter(
        (f) => f.teacherId === teacherId
      );
      const totalFeedbacks = teacherFeedbacks.length;

      if (totalFeedbacks > 0) {
        const sumRatings = {
          teachingQuality: 0,
          contentClarity: 0,
          responsiveness: 0,
          preparedness: 0,
          overallExperience: 0,
        };

        teacherFeedbacks.forEach((feedback) => {
          Object.keys(sumRatings).forEach((key) => {
            sumRatings[key] += feedback.ratings[key];
          });
        });

        const avgTeacherRatings = {};
        Object.keys(sumRatings).forEach((key) => {
          avgTeacherRatings[key] = (sumRatings[key] / totalFeedbacks).toFixed(
            1
          );
        });

        avgRatings[teacherId] = {
          ...avgTeacherRatings,
          totalFeedbacks,
        };
      }
    });

    setAverageRatings(avgRatings);
  }, [year, branch, section, getFilteredFeedbacks]);

  const handleTeacherSelect = (teacherId) => {
    setSelectedTeacher(teacherId);
  };

  const getTeacherFeedbacks = (teacherId) => {
    return feedbacks.filter((feedback) => feedback.teacherId === teacherId);
  };

  return (
    <div className="admin-dashboard-container">
      <Header
        title="Admin Dashboard"
        userName={currentUser.name}
        onLogout={logout}
      />

      <div className="admin-dashboard-content">
        <div className="filters-section">
          <h2>Feedback Filters</h2>
          <div className="filters">
            <div className="filter-group">
              <label>Year</label>
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Branch</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Section</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>
        </div>

        <div className="feedback-report">
          {Object.keys(averageRatings).length === 0 ? (
            <div className="no-feedback">
              <h2>No feedback available for the selected filters.</h2>
            </div>
          ) : (
            <div className="report-layout">
              <div className="teachers-summary">
                <h2>Teacher Summary</h2>
                <div className="teacher-list">
                  {Object.keys(averageRatings).map((teacherId) => {
                    const teacher = getTeacherById(parseInt(teacherId));
                    const avgRating = averageRatings[teacherId];

                    if (!teacher) return null;

                    return (
                      <div
                        key={teacherId}
                        className={`teacher-summary-card ${
                          selectedTeacher === parseInt(teacherId)
                            ? "selected"
                            : ""
                        }`}
                        onClick={() => handleTeacherSelect(parseInt(teacherId))}
                      >
                        <div className="teacher-summary-image">
                          <img src={teacher.image} alt={teacher.name} />
                        </div>
                        <div className="teacher-summary-details">
                          <h3>{teacher.name}</h3>
                          <p>Subject: {teacher.subjects[0].name}</p>
                          <p className="rating-highlight">
                            Overall Rating: {avgRating.overallExperience} / 5
                          </p>
                          <p>Feedbacks: {avgRating.totalFeedbacks}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="teacher-detail">
                {selectedTeacher ? (
                  <>
                    <div className="teacher-rating-details">
                      <h2>Rating Details</h2>
                      {(() => {
                        const teacher = getTeacherById(selectedTeacher);
                        const avgRating = averageRatings[selectedTeacher];

                        if (!teacher || !avgRating) return null;

                        return (
                          <div className="rating-card">
                            <div className="teacher-header">
                              <div className="teacher-image">
                                <img src={teacher.image} alt={teacher.name} />
                              </div>
                              <div className="teacher-info">
                                <h3>{teacher.name}</h3>
                                <p>Subject: {teacher.subjects[0].name}</p>
                                <p>Code: {teacher.subjects[0].code}</p>
                              </div>
                            </div>

                            <div className="ratings-summary">
                              <div className="rating-bar">
                                <span>Teaching Quality</span>
                                <div className="bar-container">
                                  <div
                                    className="bar"
                                    style={{
                                      width: `${
                                        (avgRating.teachingQuality / 5) * 100
                                      }%`,
                                    }}
                                  >
                                    {avgRating.teachingQuality}
                                  </div>
                                </div>
                              </div>

                              <div className="rating-bar">
                                <span>Content Clarity</span>
                                <div className="bar-container">
                                  <div
                                    className="bar"
                                    style={{
                                      width: `${
                                        (avgRating.contentClarity / 5) * 100
                                      }%`,
                                    }}
                                  >
                                    {avgRating.contentClarity}
                                  </div>
                                </div>
                              </div>

                              <div className="rating-bar">
                                <span>Responsiveness</span>
                                <div className="bar-container">
                                  <div
                                    className="bar"
                                    style={{
                                      width: `${
                                        (avgRating.responsiveness / 5) * 100
                                      }%`,
                                    }}
                                  >
                                    {avgRating.responsiveness}
                                  </div>
                                </div>
                              </div>

                              <div className="rating-bar">
                                <span>Preparedness</span>
                                <div className="bar-container">
                                  <div
                                    className="bar"
                                    style={{
                                      width: `${
                                        (avgRating.preparedness / 5) * 100
                                      }%`,
                                    }}
                                  >
                                    {avgRating.preparedness}
                                  </div>
                                </div>
                              </div>

                              <div className="rating-bar">
                                <span>Overall Experience</span>
                                <div className="bar-container">
                                  <div
                                    className="bar highlight"
                                    style={{
                                      width: `${
                                        (avgRating.overallExperience / 5) * 100
                                      }%`,
                                    }}
                                  >
                                    {avgRating.overallExperience}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    <div className="feedback-comments">
                      <h2>Student Comments</h2>
                      <div className="comments-list">
                        {getTeacherFeedbacks(selectedTeacher).map(
                          (feedback) => (
                            <div key={feedback.id} className="comment-card">
                              <div className="comment-date">
                                {new Date(feedback.date).toLocaleDateString()}
                              </div>
                              <div className="comment-text">
                                "{feedback.comments}"
                              </div>
                              <div className="comment-rating">
                                Overall Rating:{" "}
                                {feedback.ratings.overallExperience}/5
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="no-teacher-selected">
                    <h2>Select a teacher to view detailed feedback</h2>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
