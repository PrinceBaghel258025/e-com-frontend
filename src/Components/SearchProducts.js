import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { URLSearchParamsInit } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const SearchProducts = () => {

    const location = useLocation()
    console.log(location)
    // const 


  return (
    <div>SearchProducts</div>
  )
}

export default SearchProducts