import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

export const authContext = createContext();
export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  useEffect(function () {
    const val = localStorage.getItem("tkn");
    if (val != null) {
      setToken(val);
      getUserDate();
    }
  }, []);
  function getUserDate() {
    const userdecoe = jwtDecode(localStorage.getItem("tkn"));
    console.log("userdecoe", userdecoe);
    setUserData(userdecoe);
  }

  return (
    <authContext.Provider value={{ token, setToken, userData, getUserDate }}>
      {children}
    </authContext.Provider>
  );
}
