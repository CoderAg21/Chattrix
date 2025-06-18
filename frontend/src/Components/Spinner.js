import React from 'react'
import { useSelector } from 'react-redux'
export default function Spinner(props) {
    const showSpinner = useSelector(state=>state.spinner.value)
    const {position,top,right,margin} = props
  return (
<div className="justify-content-center mt-1" style={{display:showSpinner,position,top,right,margin}}>
  <div className="spinner-border" role="status">
    <span className="visually-hidden mt-1">Loading...</span>
  </div>
</div>
  )
}
