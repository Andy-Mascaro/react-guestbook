import { createContext, useState } from "react";

const AuthContext = createContext(); 

const AuthProvider = ({ children }) => {
    const[user, setUser] = useState(null);
   
   
    
  return (
    <AuthContext.Provider value={{ user, setUser }}>
        {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () =>{ 
    const context = useContext(AuthContext);
if (context === undefined) {
    throw new error('Error need to use AuthContext');
}

return context;
};
export { useAuthContext, AuthProvider };
