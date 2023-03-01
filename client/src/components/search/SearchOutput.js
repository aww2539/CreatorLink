import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getProfiles } from "../../utils/apiManager"
import Analytics from "../profiles/analytics/Analytics"


export const SearchOutput = ({searchState}) => {
    const [searchResults, updateSearchResults] = useState([])
    const [profiles, setProfiles] = useState([])

    const getAndSetProfiles = () => {
        getProfiles().then(setProfiles)
    }

    useEffect( () => { 
        getAndSetProfiles() 
    },[] 
    )

    useEffect(() => {
        console.log(searchState)
        if (searchState !== "") {
            const foundProfiles = profiles.filter(profile => profile.user?.username.toLowerCase().startsWith(searchState.toLowerCase()))
            console.log(foundProfiles)
            if (foundProfiles !== undefined) {
                updateSearchResults(foundProfiles)
            } 
        } else {
            updateSearchResults({})
        }
    }, [searchState])

    return (
        <>
            <h2>Search Results:</h2>
            { 
                searchResults.length > 0 ?
                    searchResults.map(result => {
                        return <Link className="search__link" to={`/profile/${result.id}`} onClick={() => {
                                Analytics.addProfileClick(result.id, result.clicks)}}>
                                    <h3>{result?.user.username}</h3>
                                </Link>
                        
                    })
                    : ""
            }
        </>
    )
}