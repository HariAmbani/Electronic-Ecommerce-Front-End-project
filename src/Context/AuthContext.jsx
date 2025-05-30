import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const sessionStorageState = sessionStorage.getItem('isLoggedIn') === 'true' ? true : false;
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorageState);
  const [userData, setUserData] = useState({
    fullname: sessionStorage.getItem('fullname') || '',
    username: sessionStorage.getItem('username') || '',
    email: sessionStorage.getItem('email') || '',
    phone: sessionStorage.getItem('phone') || '',
    state: sessionStorage.getItem('state') || '',
    role: sessionStorage.getItem('role') || ''
  });

  const login = (user) => {
    sessionStorage.setItem('isLoggedIn', true);
      
    Object.entries(user).forEach(([key, value]) => {
      sessionStorage.setItem(key, value);
    });
    setUserData(user);
    setIsLoggedIn(true);
  };
  

  const logout = () => {
    // Clear all specific user details from localStorage
    const keysToRemove = ['isLoggedIn', 'fullname', 'username', 'email', 'phone', 'state', 'role'];
    sessionStorage.removeItem("token")
    keysToRemove.forEach(key => sessionStorage.removeItem(key));
  
    setUserData({
      fullname: '',
      username: '',
      email: '',
      phone: '',
      state: '',
      role: '',
      token:''
    });
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};
