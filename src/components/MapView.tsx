import mapboxgl from "mapbox-gl";
import { useContext, useLayoutEffect, useRef } from "react";
import { MapContext, PlacesContext } from "../context";
import { Loading } from "./Loading";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new mapboxgl.Map({
        container: mapDiv.current!, // container ID

        style: "mapbox://styles/mapbox/light-v10", // style URL

        center: userLocation, // starting position [lng, lat]

        zoom: 14, // starting zoom
      });

      setMap(map);
    }
  }, [isLoading]);

  if (isLoading) return <Loading />;

  return (
    <div
      ref={mapDiv}
      style={{
        backgroundColor: "red",
        height: "100vh",
        position: "fixed",
        width: "100%",
      }}
    >
      {userLocation?.join(",")}
    </div>
  );
};
