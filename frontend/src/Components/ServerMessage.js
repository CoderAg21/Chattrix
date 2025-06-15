import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {creatMsg} from '../Store/Messages/messageSlice'

export default function ClientMessage(props) {
  // const msg = useSelector((state) => state.message.value)
  return (
     <div className="mb-3">
              <div className="fw-semibold"></div>
              <div className="bg-white border rounded p-2 shadow-sm d-inline-block">
                {props.message}
              </div>
              </div>
  )
}
