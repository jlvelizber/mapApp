import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import React from "react";
import ReactDOM from "react-dom/client";
import { MapsApp } from "./MapsApp";
import "./styles.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiamx2ZWxpeiIsImEiOiJjbHhhOW0zeWkxYzBmMmtweGZ1aW50cmk3In0.AbJlW8LsZ4HQ4LBwO26TvQ";



if (!navigator.geolocation) {
  alert("Su navegador no soporta de geolocation");
  throw new Error('Su navegador no soporta de geolocation')
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
