import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext, PlacesContextPropsInterface } from "../context/places/PlacesContext"
import { SearchResult } from "./SearchResult";

export const SearchBar = () => {

    const debouceRef = useRef<NodeJS.Timeout>()
    const { searchPlacesByTerm } = useContext<PlacesContextPropsInterface>(PlacesContext);

    const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {

        if (debouceRef.current)
            clearTimeout(debouceRef.current)

        debouceRef.current = setTimeout(() => {
            // todo: buscar
            const query = event.target.value
            searchPlacesByTerm(query);


        }, 350)

    }

    return (
        <div className='search-container'>
            <input type="text"
                className='form-control'
                placeholder='Buscar lugar'
                onChange={onQueryChange}
            />
            <SearchResult/>
        </div>
    )
}
