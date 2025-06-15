import React, { createContext, useState, useEffect, useContext } from "react";
import { initializeDatabase } from "../data/sampleData"; // Correct path to the database file

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize the database with demo data on first load
    initializeDatabase();

    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Student login function
  const studentLogin = (admissionNumber, password) => {
    // Retrieve students from localStorage
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students.find(
      (s) => s.admissionNumber === admissionNumber && s.rollNumber === password
    );

    if (student) {
      const userData = {
        id: student.id,
        name: student.name,
        admissionNumber: student.admissionNumber,
        role: "student",
        year: student.year,
        branch: student.branch,
        section: student.section,
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));
      setCurrentUser(userData);
      return true;
    }
    return false;
  };

  // Admin login function
  const adminLogin = (username, password) => {
    // Retrieve admins from localStorage
    const admins = JSON.parse(localStorage.getItem("admins")) || [];
    const admin = admins.find(
      (a) => a.username === username && a.password === password
    );

    if (admin) {
      const userData = {
        id: admin.id,
        name: admin.name,
        role: "admin",
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));
      setCurrentUser(userData);
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    studentLogin,
    adminLogin,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
