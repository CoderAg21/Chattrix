import React from 'react'
import { useDispatch } from 'react-redux';
import { changeRoom } from '../Store/room/roomSlice';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { io } from 'socket.io-client';
import socket from './Socket';
import { checkOnline } from '../Store/checkIfOnline/checkIfOnlineSlice';
export default function Contact(props) {
  const currentRoom = useSelector((state) => state.room.value);
  const {name,roomID,idx,setCurrentUser} = props
  // const [id,setId] = useState(idx)
    const dispatch = useDispatch();
    const handleClick = () =>{
      // document.getElementById(id).style.background = 'white'
      dispatch(changeRoom(roomID));
      // document.getElementById(idx).style.background = 'red'
      // setId(idx)
      setCurrentUser(name)
      socket.emit("checkOnline",name, (isOnline) => {
      // console.log(name)
      if  (isOnline) dispatch(checkOnline('online'))
      else dispatch(checkOnline('offline'))
      console.log(`${name} is ${isOnline ? "Online" : "Offline"}`);
    })
    }
  return (
     <li className="list-group-item d-flex align-items-center oik btn btn-outline-warning" id={idx} onClick={handleClick}>
                <div
                  className="me-3 rounded-circle bg-secondary"
                  style={{ width: 40, height: 40 }}
                ></div>
                <div>
                  <strong>{name}</strong>
                  <div className="text-muted small">Last message...</div>
                </div>
              </li>
  )
}
