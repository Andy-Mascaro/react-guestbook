import { createContext, useState, useContext } from "react";

const UserContext = createContext(); 

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
   
   
    
  return (
    <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
  );
};

const useUserContext = () =>{ 
    const context = useContext(UserContext);
if (context === undefined) {
    throw new error('Error need to use UserContext');
}

return context;
};
export { useUserContext, UserProvider };
