import React from "react";
import "./Header.css";

const Header = ({ title, userName, onLogout, onBack }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        {onBack && (
          <button className="back-button" onClick={onBack}>
            &larr; Back
          </button>
        )}
        <h1 className="header-title">{title}</h1>
      </div>

      <div className="header-right">
        <div className="user-info">
          <span>Welcome, {userName}</span>
        </div>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
