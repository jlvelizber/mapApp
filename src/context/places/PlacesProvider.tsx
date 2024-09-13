import { useEffect, useReducer } from "react";
import { getUserLocation } from "../../helpers";
import { PlacesContext } from "./PlacesContext";
import { PlacesReducer } from "./PlacesReducer";
import { SearchApi } from "../../apis";
import { Feature, PlacesResponse } from "../../interfaces/places";

export interface PlacesStateInterface {
  isLoading: boolean;
  userLocation: [number, number];
  locations: Feature[];
  isLoadingPlaces: boolean
}

const INITIAL_STATE: PlacesStateInterface = {
  isLoading: true,
  userLocation: [0, 0],
  locations: [] as Feature[],
  isLoadingPlaces: false
};

interface props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: props): JSX.Element => {
  const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({ type: "setUserLocation", payload: lngLat })
    );
  }, []);

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: 'setPlaces', payload: [] })

      return [] //todo: LImpiar
    }
    if (!state.userLocation) throw new Error(`No hay ubicacion del usuario`)

    dispatch({ type: 'setLoadingPlaces', payload: true });

    const places = await SearchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(','),

      }
    })

    dispatch({ type: 'setPlaces', payload: places.data.features })


    return places.data.features

  }

  return (
    //@ts-ignore
    <PlacesContext.Provider value={{
      ...state,
      //methods
      searchPlacesByTerm,

    }}>
      {children}
    </PlacesContext.Provider>
  );
};
