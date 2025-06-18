
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
import socket from './Socket'
import '../ChatLayout.css'
import { useRef } from 'react';
import Spinner from './Spinner';
import { showSpinner } from '../Store/spinner/spinnerSlice';



export default function ChatLayout() {

  const [msgs, setMsgs] = useState([]);
  const  contacts = useSelector((state) => state.contacts.value);
  const msg = useSelector((state) => state.message.value);
  const currentRoom = useSelector((state) => state.room.value);
  const checkIfOnline = useSelector((state)=>state.checkIfOnline.value)
  const dispatch = useDispatch();
  const userSocketId = useSelector(state=>state.user.email)
  const [currentUser,setCurrentUser] = useState('')
  const containerRef = useRef(null);
  

//New msgs will be seen without manual scroll
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [msgs]);
  
  
  
  useEffect(()=>{
    socket.on('connect',()=>{
    })
    socket.on('Recieve',(msg)=>{
      setMsgs(prevMsgs=>[...prevMsgs,msg])
     
        console.log(msgs)

      })
    // const handleRecieve = (msg)=>{
      

      
    // }
  //  ret/urn () => {
    // soc/ket.off("Receive", handleRecieve); // must be same reference
  
  
 
},[])
//connect to socket.io

useEffect(() => {  
  
  
  const fetching = async () => {
    dispatch(showSpinner('flex'))
    try {
      const response = await fetch(`${config.APP_URL}/contacts`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      dispatch(showSpinner('none'))
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
    setMsgs([]); // Clear previous messages

    dispatch(showSpinner('flex'))

    socket.emit("userOnline",userSocketId)
    socket.emit("leave room",currentRoom)
    socket.emit("join room",currentRoom)
  
    const showStoredMsg = async ()=>{
      const response = await fetch(`${config.APP_URL}/show-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({roomId:currentRoom}),
        credentials: 'include',
      });

      dispatch(showSpinner("none"))
      
      if (response.ok) {
        const data = await response.json();
        // console.log("fetched successfully")
        // Assuming data is an array of messages
        setMsgs(prevMsgs => [...prevMsgs,...data]);
        
     
      } else {
        console.error('Failed to fetch messages');
      }
    }
    showStoredMsg();
  }, [currentRoom])
  

 

  const handleChange = (e) => {
    // console.log(e.target.value)
    dispatch(createMsg(e.target.value));
  }
  const handleSubmit = async (e) => {
    dispatch(createMsg(msg));
    e.preventDefault();
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
      socket.emit("send",{msgItem,currentRoom})
      // console.log(msgs)
      dispatch(createMsg(''));
      
      // console.log('Message sent successfully');
    } else {
      console.error('Failed to send message');
    }
  }catch (error) {
    console.error('Failed to send message:', error);
  }
}



return (
  <div className="container-fluid px-0"style={{background:"rgb(244, 244, 244)"}}>
      <div className="d-flex vh-100 chatScreen">
      

        {/* Contact List */}
        <div
          className="col-12 border-top col-md-4 col-lg-3 border-end bg-white overflow-auto"
          style={{ maxHeight: '82vh', background:"fcfcfce8" }}
        >
          <div className="p-3 border-bottom position-sticky top-0 bg-white z-1">
            <h5 className="mb-0 fw-bold text-primary">Contacts</h5>
            <Spinner position = 'absolute' right='0' top='13px' margin='1rem' ></Spinner>
          </div>
          <ul className="list-group list-group-flush">
            {contacts.map((data, index) =>{
            
              return <Contact key = {index} setCurrentUser={setCurrentUser} email = {data.email} idx = {index} name = {data.name} roomID={data.roomId} ></Contact>
            })}
          </ul>
        </div>

        {/* Chat Area */}
       {
       (!currentRoom)?<AuthenticateWelcome/>:<div style={{background:'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvTNvmAB7U4bI9MMmOuGUCHcpmKXwGZ4z_EA&s)'}} className="MsgScreen col-12 col-md-8 col-lg-9 d-flex flex-column bg-light position-relative">
          
          {/* Chat Header */}
          <div className="border-bottom border-top px-4 py-3 bg-white position-sticky top-0 z-1">
            <h5 className="mb-0 fw-semibold">{currentUser}</h5>
            <small style={{color:checkIfOnline === 'online'?"#318931":"rgb(114, 114, 114)"}}><li style={{marginLeft:"11px"}}>{checkIfOnline}</li></small>
          </div>

          {/* Chat Messages (Scrollable) */}
          <div ref={containerRef}
            className=" overflow-auto px-4 py-3 msgScreen"
            style={{ marginBottom: '14vh',height:"65vh" }}
          >
            {msgs.map((message, index) => {
           
                return message.sendBy == 'You' ? (
                  <ClientMessage key={index} message={message.message} time={message.createdAt} />
                ) : (
                  <ServerMessages key={index.createAt} message={message.message} time={message.createdAt} />
                );
             
            })}
           
          </div>

         <div
      className="position-fixed end-0 w-100 bg-white px-0 py-2 border-top"
      style={{ bottom: '3rem', height: '10vh', zIndex: 999 }}
    >
      <div className="container msgType h-100 d-flex align-items-center justify-content-center float-end"style={{paddingLeft:"10vw"}}>

        {/* Left Icons */}
        <div className="d-flex align-items-center gap-2">
          {/* <button className="btn btn-light rounded-circle p-2">
            <i className="bi bi-emoji-smile"></i>
          </button> */}
          <button className="btn btn-light rounded-circle p-2">
            <label htmlFor="uploadImg"> <i className="bi bi-paperclip"> </i></label>
            <input onChange={handleChange} type="file" name="/img" id="uploadImg" accept='image/*' style={{display:"none"}}></input>
           
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
            <i className="bi bi-send"></i>
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
