import React, { createContext, useState, useEffect, useContext } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load teachers and feedbacks from localStorage
    const storedTeachers = JSON.parse(localStorage.getItem("teachers")) || [];
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    setTeachers(storedTeachers);
    setFeedbacks(storedFeedbacks);
    setLoading(false);
  }, []);

  // Function to filter teachers based on year, branch, and section
  const getFilteredTeachers = (year, branch, section) => {
    return teachers.filter((teacher) =>
      teacher.assignedClasses.some(
        (cls) =>
          cls.year === year && cls.branch === branch && cls.section === section
      )
    );
  };

  // Function to save new feedback
  const saveFeedback = (feedback) => {
    const updatedFeedbacks = [
      ...feedbacks,
      { ...feedback, id: Date.now(), date: new Date().toISOString() },
    ];
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
    setFeedbacks(updatedFeedbacks);
  };

  // Function to get feedbacks for a specific teacher
  const getTeacherFeedbacks = (teacherId) => {
    return feedbacks.filter((feedback) => feedback.teacherId === teacherId);
  };

  // Function to get feedbacks based on filters
  const getFilteredFeedbacks = (year, branch, section) => {
    return feedbacks.filter(
      (feedback) =>
        feedback.year === year &&
        feedback.branch === branch &&
        feedback.section === section
    );
  };

  // Function to get a teacher by ID
  const getTeacherById = (teacherId) => {
    return teachers.find((teacher) => teacher.id === teacherId);
  };

  const value = {
    teachers,
    feedbacks,
    getFilteredTeachers,
    saveFeedback,
    getTeacherFeedbacks,
    getFilteredFeedbacks,
    getTeacherById,
    loading,
  };

  return (
    <DataContext.Provider value={value}>
      {!loading && children}
    </DataContext.Provider>
  );
};
