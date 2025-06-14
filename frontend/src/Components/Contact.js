import React from 'react'
import { useDispatch } from 'react-redux';
import { changeRoom } from '../Store/room/roomSlice';
import { useSelector } from 'react-redux';

export default function Contact(props) {
  const currentRoom = useSelector((state) => state.room.value);
    const {name,roomID} = props
    const dispatch = useDispatch();
    const handleClick = () =>{
      dispatch(changeRoom(roomID));
   
    }
  return (
     <li className="list-group-item d-flex align-items-center btn btn-outline-warning" onClick={handleClick}>
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
