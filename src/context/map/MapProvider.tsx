import { LngLatBounds, Map, Marker, Popup, SourceSpecification } from "mapbox-gl";
import { useContext, useEffect, useReducer } from "react";
import { MapContext } from "./MapContext";
import { MapReducer } from "./MapReducer";
import { PlacesContext, PlacesContextPropsInterface } from "../places/PlacesContext";
import { DirectionsApi } from "../../apis";
import { Directions } from "../../interfaces/directions";



export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[]
}

const INITIA_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: []
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(MapReducer, INITIA_STATE);
  const { locations } = useContext<PlacesContextPropsInterface>(PlacesContext);

  /**
   * 
   */
  useEffect(() => {

    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const location of locations) {
      const [lng, lat] = location.center

      const popup = new Popup().setHTML(`<h6>${location.text}</h6><p>${location.place_name}</p>`)

      const newMarker = new Marker().setPopup(popup).setLngLat([lng, lat]).addTo(state.map!)

      newMarkers.push(newMarker);

    }

    // todo: limpiar polilines
    dispatch({ type: 'setMarkers', payload: newMarkers })

  }, [locations])

  /**
   * 
   * @param map 
   */
  const setMap = (map: Map) => {

    const myLocationPopup = new Popup().setHTML(`<h4>Aquí estoy</h4>`)

    new Marker({
      color: '#61dafb'
    })
      .setLngLat(map.getCenter())
      .addTo(map)
      .setPopup(myLocationPopup)

    dispatch({
      type: "setMap",
      payload: map,
    });
  };

  /**
   * 
   * @param start 
   * @param end 
   */
  const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {
    const resp = await DirectionsApi.get<Directions>(`/${start.join(',')};${end.join(',')}`)
    const { distance, duration, geometry } = resp.data.routes[0]
    const { coordinates: coords } = geometry


    let kms = distance / 1000;
    kms = Math.round(kms * 100);
    kms /= 100;

    Math.floor(duration / 60)


    const bounds = new LngLatBounds(
      start,
      start
    )

    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];

      bounds.extend(newCoord)
    }

    state.map?.fitBounds(bounds, {
      padding: 200
    });

    // Polyline
    const sourceData: SourceSpecification = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    // todo: remover polyline si existe
    if(state.map?.getLayer('RouteString'))
    {
      state.map?.removeLayer('RouteString')
      state.map?.removeSource('RouteString')
    }



    state.map?.addSource('RouteString', sourceData);
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      }
    })
  }


  return (
    <MapContext.Provider value={{ ...state, setMap, getRouteBetweenPoints }}>
      {children}
    </MapContext.Provider>
  );
};
