import React from 'react'

export default function ServerMessage(props) {
  return (
   <div className="mb-3 text-end" >
              <div className="d-block bg-primary text-start text-white border rounded p-2 d-inline-block" style={{float:"right",maxWidth:"75%"}}>
             {  props.message}
              </div>
            </div>
  )
}
