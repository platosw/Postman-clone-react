import React from "react";
import "./App.css";
import Urldata from "./components/Urldata";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuttleSpace } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  return (
    <>
      <div className="logo-container">
        <FontAwesomeIcon icon={faShuttleSpace} className="logo" />
      </div>
      <h1 className="title-container">POSTSHUTTLE</h1>
      <Urldata />
    </>
  );
}
