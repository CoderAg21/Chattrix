import React from 'react'

export default function ServerMessage(props) {
  return (
   <div className="mb-3 text-end">
              <div className="bg-primary text-white border rounded p-2 d-inline-block">
             {  props.message}
              </div>
            </div>
  )
}
