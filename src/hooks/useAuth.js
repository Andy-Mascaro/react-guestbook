import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


export default function useAuth() {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error('UserContext must be used within a UserProvide context');
    } 

  return context;

}
