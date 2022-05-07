import { createContext, useState, useContext } from "react";
import { getUser } from "../services/user";

const UserContext = createContext(); 

const UserProvider = ({ children }) => {
  const user = getUser();
  const [currentUser, setCurrentUser] = useState(user || { email: null });
  
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
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
export { useUserContext, UserProvider, UserContext};
