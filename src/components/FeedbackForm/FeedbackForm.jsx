import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import Header from "../Header/Header";
import "./FeedbackForm.css";

const FeedbackForm = () => {
  const { teacherId } = useParams();
  const { currentUser, logout } = useAuth();
  const { getTeacherById, saveFeedback, getFilteredTeachers } = useData();
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [ratings, setRatings] = useState({
    teachingQuality: 0,
    contentClarity: 0,
    responsiveness: 0,
    preparedness: 0,
    overallExperience: 0,
  });
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchedTeacher = getTeacherById(parseInt(teacherId));

    if (fetchedTeacher) {
      // Check if this teacher is assigned to the student's class
      const studentTeachers = getFilteredTeachers(
        currentUser.year,
        currentUser.branch,
        currentUser.section
      );

      const isAuthorized = studentTeachers.some(
        (teacher) => teacher.id === parseInt(teacherId)
      );

      if (!isAuthorized) {
        setUnauthorized(true);
        setError("You are not authorized to submit feedback for this teacher");
        return;
      }

      setTeacher(fetchedTeacher);
    } else {
      setError("Teacher not found");
    }
  }, [teacherId, getTeacherById, currentUser, getFilteredTeachers]);

  const handleRatingChange = (category, value) => {
    setRatings({
      ...ratings,
      [category]: value,
    });
  };

  const validateForm = () => {
    // Check if all ratings are provided
    const hasAllRatings = Object.values(ratings).every((rating) => rating > 0);
    if (!hasAllRatings) {
      setError("Please provide ratings for all categories");
      return false;
    }

    // Check if comments are provided
    if (!comments.trim()) {
      setError("Please provide some comments");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (validateForm()) {
      // Create feedback object
      const feedback = {
        studentId: currentUser.id,
        teacherId: parseInt(teacherId),
        year: currentUser.year,
        branch: currentUser.branch,
        section: currentUser.section,
        subjectCode: teacher.subjects[0].code,
        ratings,
        comments,
      };

      // Save feedback
      saveFeedback(feedback);
      setSuccess(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/student/dashboard");
      }, 2000);
    }
  };

  if (unauthorized) {
    return (
      <div className="feedback-container">
        <Header
          title="Unauthorized Access"
          userName={currentUser.name}
          onLogout={logout}
          onBack={() => navigate("/student/dashboard")}
        />
        <div className="error-message">
          <h2>Unauthorized Access</h2>
          <p>{error}</p>
          <button
            className="back-to-dashboard"
            onClick={() => navigate("/student/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (error && !teacher) {
    return (
      <div className="feedback-container">
        <Header
          title="Feedback Form"
          userName={currentUser.name}
          onLogout={logout}
          onBack={() => navigate("/student/dashboard")}
        />
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="feedback-container">
        <Header
          title="Feedback Form"
          userName={currentUser.name}
          onLogout={logout}
          onBack={() => navigate("/student/dashboard")}
        />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <Header
        title="Feedback Form"
        userName={currentUser.name}
        onLogout={logout}
        onBack={() => navigate("/student/dashboard")}
      />

      <div className="feedback-content">
        {success ? (
          <div className="success-message">
            <h2>Thank you for your feedback!</h2>
            <p>Your response has been recorded successfully.</p>
            <p>Redirecting to dashboard...</p>
          </div>
        ) : (
          <>
            <div className="teacher-header">
              <div className="teacher-image">
                <img src={teacher.image} alt={teacher.name} />
              </div>
              <div className="teacher-details">
                <h2>{teacher.name}</h2>
                <p>Subject: {teacher.subjects[0].name}</p>
                <p>Code: {teacher.subjects[0].code}</p>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="rating-sections">
                <div className="rating-section">
                  <h3>Teaching Quality</h3>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star ${
                          ratings.teachingQuality >= star ? "active" : ""
                        }`}
                        onClick={() =>
                          handleRatingChange("teachingQuality", star)
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rating-section">
                  <h3>Content Clarity</h3>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star ${
                          ratings.contentClarity >= star ? "active" : ""
                        }`}
                        onClick={() =>
                          handleRatingChange("contentClarity", star)
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rating-section">
                  <h3>Responsiveness to Questions</h3>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star ${
                          ratings.responsiveness >= star ? "active" : ""
                        }`}
                        onClick={() =>
                          handleRatingChange("responsiveness", star)
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rating-section">
                  <h3>Preparedness for Class</h3>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star ${
                          ratings.preparedness >= star ? "active" : ""
                        }`}
                        onClick={() => handleRatingChange("preparedness", star)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rating-section">
                  <h3>Overall Experience</h3>
                  <div className="rating-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star ${
                          ratings.overallExperience >= star ? "active" : ""
                        }`}
                        onClick={() =>
                          handleRatingChange("overallExperience", star)
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="comments-section">
                <h3>Additional Comments</h3>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Please share your thoughts about the teacher..."
                  rows={5}
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => navigate("/student/dashboard")}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Submit Feedback
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;
