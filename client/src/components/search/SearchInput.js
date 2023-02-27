import "./Search.css"


export const SearchInput = ({updateSearchState}) => {

    return (
        <>
            <h2>CreatorLink User Search</h2>

            <section>
                <form className="form--search" onSubmit={(event) => {event.preventDefault()}}>
                    <fieldset className="searchField">
                        <input onChange = {
                            (evt) => {
                                 const search = evt.target.value
                                 updateSearchState(search)
                            }
                        }
                            type="text"
                            className="search"
                            placeholder="Search here"
                            required autoFocus />
                    </fieldset>
                </form>
            </section>
        </>
    )
}