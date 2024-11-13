// AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
