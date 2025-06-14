
import Contact from './Contact';
import ClientMessage from './ClientMessage';
import ServerMessages from './ServerMessage'
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchContacts } from '../Store/contacts/contactSlice';
import { useEffect } from 'react';
import config from '../config/env';
import { useState } from 'react';
import { createMsg } from '../Store/Messages/messageSlice';
import AuthenticateWelcome from './AuthenticateWelcome';



export default function ChatLayout() {
  const [msgs, setMsgs] = useState([]);
  const  contacts = useSelector((state) => state.contacts.value);
  const msg = useSelector((state) => state.message.value);
  const currentRoom = useSelector((state) => state.room.value);
  
  const dispatch = useDispatch();
  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await fetch(`${config.APP_URL}/contacts`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        });
        const data = await response.json();
        // console.log(data)
        if (response.ok) {
          dispatch(fetchContacts(data));
        } else {
          console.error('Failed to fetch contacts:');
        }
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
    }
    fetching();
  }, [])

  useEffect(() => {
    const showStoredMsg = async ()=>{
      const response = await fetch(`${config.APP_URL}/show-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({roomId:currentRoom}),
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        // console.log("fetched successfully")
        // Assuming data is an array of messages
        setMsgs([]); // Clear previous messages
        setMsgs(prevMsgs => [...prevMsgs,...data]);
     
      } else {
        console.error('Failed to fetch messages');
      }
    }
    showStoredMsg();
  }, [currentRoom])
  


  const handleChange = (e) => {
    dispatch(createMsg(e.target.value));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createMsg(msg));
    // Send the message to the server
    try {
      const response = await fetch(`${config.APP_URL}/message`, {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({msg,currentRoom}),
    });
    
    if (response.ok) {
      const msgItem = {
        message:msg,
        sendBy:"You",
        createdAt:Date.now().toLocaleString()
      }
  
      setMsgs(prevMsgs=>[...prevMsgs,msgItem])
      dispatch(createMsg(''));

      console.log('Message sent successfully');
    } else {
      console.error('Failed to send message');
    }
  }catch (error) {
    console.error('Failed to send message:', error);
  }
  }
 

  return (
    <div className="container-fluid px-0"style={{background:"rgb(244, 244, 244)"}}>
      <div className="d-flex vh-100">
      

        {/* Contact List */}
        <div
          className="col-12 col-md-4 col-lg-3 border-end bg-white overflow-auto"
          style={{ maxHeight: '82vh', background:"fcfcfce8" }}
        >
          <div className="p-3 border-bottom position-sticky top-0 bg-white z-1">
            <h5 className="mb-0 fw-bold text-primary">Contacts</h5>
          </div>
          <ul className="list-group list-group-flush">
            {contacts.map((data, index) =>{
              return <Contact key = {index} name = {data.email} roomID={data.roomId} ></Contact>
            })}
          </ul>
        </div>

        {/* Chat Area */}
       {
       (!currentRoom)?<AuthenticateWelcome/>:<div className="col-12 col-md-8 col-lg-9 d-flex flex-column bg-light position-relative">
          
          {/* Chat Header */}
          <div className="border-bottom px-4 py-3 bg-white position-sticky top-0 z-1">
            <h5 className="mb-0 fw-semibold">Design chat</h5>
            <small className="text-muted">23 members, 10 online</small>
          </div>

          {/* Chat Messages (Scrollable) */}
          <div
            className="flex-grow-1 overflow-auto px-4 py-3"
            style={{ marginBottom: '14vh' }}
          >
            {msgs.map((message, index) => {
           
                return message.sendBy == 'You' ? (
                  <ServerMessages key={message.createdAt} message={message.message} time={message.createdAt} />
                ) : (
                  <ClientMessage key={message.createAt} message={message.message} time={message.createdAt} />
                );
             
            })}
           
          </div>

         <div
      className="position-fixed end-0 w-100 bg-white px-0 py-2 border-top"
      style={{ bottom: '3rem', height: '10vh', zIndex: 999 }}
    >
      <div className="container h-100 d-flex align-items-center justify-content-center float-end"style={{paddingLeft:"10vw"}}>

        {/* Left Icons */}
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-light rounded-circle p-2">
            <i className="bi bi-emoji-smile"></i>
          </button>
          <button className="btn btn-light rounded-circle p-2">
            <i className="bi bi-paperclip"></i>
          </button>
        </div>

        {/* Message Input */}
        <div className="mx-3">
          <input onChange={handleChange} value={msg}
            type="text"
            className="form-control rounded-pill px-4"
            placeholder="Type a message..."style={{width:"60vw"}}
          />
        </div>

        {/* Mic Icon */}
        <div>
          <button type='submit' onClick={handleSubmit} className="btn btn-primary rounded-circle p-2">
            <i className="bi bi-mic"></i>
          </button>
        </div>

      </div>
    </div>

        </div>
        }

      </div>
    </div>
  );
}
