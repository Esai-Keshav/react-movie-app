import React from 'react'

const Search = ({ search, setSearch }) => {


    return (
        <div className='search'>
            <div>
                <img src="/search.svg" alt="serach-icon" />
                <input type="text"
                    placeholder='Serach for Movies'
                    value={search}
                    onChange={(event) => { setSearch(event.target.value) }} />
            </div>
        </div>
    )
}

export default Search