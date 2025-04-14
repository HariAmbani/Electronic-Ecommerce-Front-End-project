import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localStorageState = localStorage.getItem('isLoggedIn') === 'true' ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(localStorageState);
  const [userData, setUserData] = useState({
    fullname: localStorage.getItem('fullname') || '',
    role: localStorage.getItem('role') || ''
  });

  const login = (user) => {
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('fullname', user.fullname);
    localStorage.setItem('role', user.role);
    setUserData({
      fullname: user.fullname,
      role: user.role,
    });
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.setItem('isLoggedIn', false);
    localStorage.removeItem('fullname');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserData({ fullname: '', role: '' });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
