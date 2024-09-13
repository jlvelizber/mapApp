import React, { useContext, useState } from 'react'
import { PlacesContext, PlacesContextPropsInterface } from '../context/places/PlacesContext'
import { Feature } from '../interfaces/places';
import { IsLoadingPlaces } from './IsLoadingPlaces';
import { MapContext } from '../context';

export const SearchResult = () => {

    const { isLoadingPlaces, locations, userLocation } = useContext<PlacesContextPropsInterface>(PlacesContext);
    const { map, getRouteBetweenPoints } = useContext(MapContext);
    const [activePlaceId, setActivePlaceId] = useState<string>("")


    const onPlaceClicked = (place: Feature) => {

        const [lng, lat] = place.center
        setActivePlaceId(place.id)

        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        })

    }

    const getRoute = (place: Feature) => {
        if(!userLocation) return false;

        const [lng, lat] = place.center;
        
        getRouteBetweenPoints(userLocation, [lng, lat])
    }

    if (isLoadingPlaces) return (<IsLoadingPlaces />)

    if (locations.length === 0) return <></>
    return (
        <ul className="light-group mt-3">

            {
                locations.map((location: Feature) => (
                    <li key={location.id}
                        className={`${activePlaceId === location.id && 'active'} list-group-item list-group-item-action pointer`}
                        onClick={() => onPlaceClicked(location)}>
                        <h6>{location.text}</h6>
                        <p style={{
                            fontSize: '12px'
                        }}>
                            {location.place_name}
                        </p>
                        <button 
                        className={`btn  ${activePlaceId === location.id ? 'btn-outline-light' : 'btn-outline-primary'}`}
                        onClick={() => getRoute(location)}>Direcciones</button>
                    </li>
                ))
            }


        </ul>
    )
}
