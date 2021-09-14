import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getProfiles } from "../../ApiManager"


export const SearchOutput = ({searchState}) => {
    const [searchResults, updateSearchResults] = useState([])
    const [profiles, updateProfiles] = useState([])

    useEffect(
        () => {
            getProfiles()
                .then((data) => {updateProfiles(data)})
        },[]
    )

    useEffect(
        () => {
            if (searchState !== "") {
                const foundProfiles = profiles.filter(profile => profile.user?.name.toLowerCase().startsWith(searchState.toLowerCase()))
                if (foundProfiles !== undefined) {
                    updateSearchResults(foundProfiles)
                } 
            } else {
                updateSearchResults({})
            }
        },
        [searchState]
    )

    return (
        <>
            <h2>Search Results:</h2>
            { 
                searchResults.length > 0 ?
                    searchResults.map(result => {
                        return <Link className="search__link" to={`/profile/${result.id}`}><h3>{result?.user.name}</h3></Link>
                        
                    })
                    : ""
            }
        </>
    )
}