import React from 'react'
import { useDispatch } from 'react-redux';
import { changeRoom } from '../Store/room/roomSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import socket from './Socket';
import { checkOnline } from '../Store/checkIfOnline/checkIfOnlineSlice';
export default function Contact(props) {
  const {email,name,roomID,idx,setCurrentUser} = props
  
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(9990,props)
    socket.on('goesOffline',(id)=>{
      // console.log(email)
    if(id == email) dispatch(checkOnline('offline'))
    })
  }, [socket])
  
    const handleClick = () =>{
      dispatch(changeRoom(roomID));
      setCurrentUser(name)
      socket.emit("checkOnline",email, (isOnline) => {
      // console.log(name)
      if  (isOnline) dispatch(checkOnline('online'))
      else dispatch(checkOnline('offline'))
      // console.log(`${email} is ${isOnline ? "Online" : "Offline"}`);
    })
    }
  return (
     <li className="list-group-item d-flex align-items-center oik btn btn-outline-warning" id={idx} onClick={handleClick}>
                <img src='https://img.icons8.com/?size=100&id=7847&format=png&color=000000'
                  className="me-3 rounded-circle"
                  style={{ width: 40, height: 40 }}
                ></img>
                <div>
                  <strong>{name}</strong>
                  {/* <div className="text-muted small">Last message...</div> */}
                </div>
              </li>
  )
}
