import { Map, Marker } from "mapbox-gl"
import { MapState } from "./MapProvider"

type MapAction = {
    type: 'setMap',
    payload: Map
}|{
    type: 'setMarkers',
    payload: Marker[]
} 
export const MapReducer = (state: MapState, action: MapAction): MapState => {

    switch (action.type) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            };
        // break;
        case 'setMarkers':
            return {
                ...state,
                markers: action.payload
            };
        // break;
        default:
            return state;
    }

}