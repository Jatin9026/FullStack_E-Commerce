import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("auth");
    return stored ? JSON.parse(stored) : { user: null, token: "" };
  });

  // Set axios default header when token changes
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
      console.log("Axios Authorization header set.");
    } else {
      delete axios.defaults.headers.common["Authorization"];
      console.log("Axios Authorization header removed.");
    }
  }, [auth?.token]);

  // Sync state with localStorage on initial load
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAuth(parsed);

        // Defensive header setting
        if (parsed?.token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
        }
      } catch (err) {
        console.error("❌ Failed to parse auth from localStorage", err);
        localStorage.removeItem("auth");
      }
    }
  }, []);

  // Login function
  const login = (userData, token) => {
    const newAuth = { user: userData, token };
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   
  };

  // Logout function
  const logout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    delete axios.defaults.headers.common["Authorization"];
    console.log("Logged out and cleared session.");
  };

  return (
    <AuthContext.Provider value={[auth, setAuth, { login, logout }]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
