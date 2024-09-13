import { Feature } from "../../interfaces/places";
import { PlacesStateInterface } from "./PlacesProvider";

type PlacesAction = | {
    type: 'setUserLocation',
    payload: [number, number],
} | { type: 'setPlaces', payload: Feature[] }
| { type: 'setLoadingPlaces', payload: boolean }

export const PlacesReducer = (state: PlacesStateInterface, action: PlacesAction): PlacesStateInterface => {
    switch (action.type) {
        case 'setUserLocation':
            return {
                ...state,
                isLoading: false,
                userLocation: action.payload
            }
        case 'setPlaces':
            return {
                ...state,
                isLoading: false,
                locations: action.payload
            }
        case 'setLoadingPlaces':
            return {
                ...state,
                isLoadingPlaces: false,
                locations: []
            }
        default:
            return state;
    }
}