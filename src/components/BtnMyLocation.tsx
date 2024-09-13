import { useContext } from "react"
import { MapContext, PlacesContext } from "../context"

export const BtnMyLocation = () => {

    const { isMapReady, map } = useContext(MapContext);
    const { userLocation } = useContext(PlacesContext)

    const setLocation = () => {
        if (!isMapReady) throw new Error(`Mapa no esta listo`);
        if (!userLocation) throw new Error(`No existe la localizacion del cliente`)
        map?.flyTo({
            zoom: 14, 
            center: userLocation
        })
    }

    return (
        <button className='btn btn-primary'
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999
            }}
            onClick={setLocation}>
            Mi ubicación
        </button>
    )
}
