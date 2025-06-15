import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config/env";
import { useDispatch } from "react-redux";
import { loggedOut } from "../Store/auth/authSlice";
import { changeRoom } from '../Store/room/roomSlice';


export default function Logout() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      const res = await fetch(`${config.APP_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(),
      });

      if (!res.ok) console.error("Something went wrong");
      else {
        dispatch(loggedOut());
        dispatch(changeRoom(null))
        navigator("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    logout();
  }, []);

  return <div>hello</div>;
}
