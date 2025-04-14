import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const localStorageState = localStorage.getItem('isLoggedIn') === 'true' ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(localStorageState);
  const [userData, setUserData] = useState({
    fullname: localStorage.getItem('fullname') || '',
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    phone: localStorage.getItem('phone') || '',
    state: localStorage.getItem('state') || '',
    role: localStorage.getItem('role') || ''
  });

  const login = (user) => {
    localStorage.setItem('isLoggedIn', true);
    Object.entries(user).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    setUserData(user);
    setIsLoggedIn(true);
  };
  

  const logout = () => {
    // Clear all specific user details from localStorage
    const keysToRemove = ['isLoggedIn', 'fullname', 'username', 'email', 'phone', 'state', 'role'];
    keysToRemove.forEach(key => localStorage.removeItem(key));
  
    setUserData({
      fullname: '',
      username: '',
      email: '',
      phone: '',
      state: '',
      role: ''
    });
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
