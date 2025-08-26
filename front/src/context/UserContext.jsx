import { useContext, createContext, useState, useEffect } from "react";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Al iniciar, intenta cargar el usuario del localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Guarda automáticamente en localStorage cada vez que cambia el usuario
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Función para login
  const login = (userData) => {
    setUser(userData);
  };

  // Función para logout
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};