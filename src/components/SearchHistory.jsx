import React from 'react'

const SearchHistory = ({ newSearch }) => {
    // console.log(newSearch)
    let searchArr = sessionStorage.getItem('searchHistory')
    if (newSearch !== undefined){    
        // console.log(existing)
        let existing = sessionStorage.getItem('searchHistory')
        existing = existing ? existing.split(',') : [];
        if(existing.includes(newSearch)){
            //pass
        } else {
            existing.push(newSearch)
            sessionStorage.setItem('searchHistory', existing.toString())
        }
    }

    searchArr = searchArr ? searchArr.split(',') : []
    return(
        <>
            {/* {console.log(Object.values(searchArr).length, searchArr)} */}
            {searchArr && searchArr.length > 0 
                ? searchArr.map(each => <p>{each}</p>)
                : console.log('oof')}
            {/* {searchArr.map(each => <p>{each}</p>)} */}
        </>
    )
}

export default SearchHistory