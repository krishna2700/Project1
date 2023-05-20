import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TableComponent from "./TableComponent";
import "./App.css";
import SideNavigation from "./Sidenavigation";

const App = () => {
  return (
    <Router>
      <div className="app">
        <SideNavigation />
        <div className="content">
          <Routes>
            <Route path="/file-manager" element={<TableComponent />} />
            {/* Add more routes for other tabs */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
