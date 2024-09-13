import axios from "axios";

const DirectionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        language: 'es',
        access_token: 'pk.eyJ1Ijoiamx2ZWxpeiIsImEiOiJjbHhhOW0zeWkxYzBmMmtweGZ1aW50cmk3In0.AbJlW8LsZ4HQ4LBwO26TvQ'
    }
})

export default DirectionsApi