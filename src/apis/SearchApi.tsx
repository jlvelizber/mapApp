import axios from "axios";

const SearchApi = axios.create({
    baseURL:'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
       limit: 5.,
       languae: 'es',
       access_token: 'pk.eyJ1Ijoiamx2ZWxpeiIsImEiOiJjbHhhOW0zeWkxYzBmMmtweGZ1aW50cmk3In0.AbJlW8LsZ4HQ4LBwO26TvQ' 
    }
})

export default SearchApi