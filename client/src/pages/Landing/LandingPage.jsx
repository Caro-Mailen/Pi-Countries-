import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="modal">
        <h1>Where do you want to go?</h1>

        <button className="button__landing">
          <Link to="/countries">Home</Link>
        </button>
      </div>
    </div>
  );
}
