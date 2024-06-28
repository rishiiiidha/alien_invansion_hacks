import React, { useState, useRef } from "react";
import useSwr from "swr";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import useSupercluster from "use-supercluster";
const App = () => {
  const [viewport, setViewport] = useState({
    latitude: 51.496105,
    longitude: -0.242921,
    width: "100vw",
    height: "100vh",
    zoom: 12,
  });

  const mapRef = useRef();

  return (
    <ReactMapGL {...viewport} maxZoom={20} mapboxAccessToken="">

    </ReactMapGL>
  
  )
};

export default App;
