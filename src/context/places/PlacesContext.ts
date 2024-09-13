import { createContext } from "react";
import { Feature } from "../../interfaces/places";

export interface PlacesContextPropsInterface {
    isLoading: boolean;
    userLocation?: [number, number];
    locations: Feature [],
    isLoadingPlaces: false
    //methods
    searchPlacesByTerm: (query: string) => Promise<any>
}

export const PlacesContext = createContext<PlacesContextPropsInterface>({} as PlacesContextPropsInterface);