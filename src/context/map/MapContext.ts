import { Map } from "mapbox-gl";
import { createContext } from "react";

interface MapContextPropsInterface  {
    isMapReady : Boolean;
    map?: Map;
    setMap: (map: Map) => void;
    getRouteBetweenPoints : (start: [number, number], end: [number, number]) => void
}
export const MapContext = createContext({ } as MapContextPropsInterface)