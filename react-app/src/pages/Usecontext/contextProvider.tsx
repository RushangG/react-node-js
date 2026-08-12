import React, { createContext,useState, useContext} from 'react';
import react from 'react';

interface User {
    name: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}


const UserContext = createContext<UserContextType | null>(null);

export default function ContextProvider( {child} : {child: React.ReactNode}) {


    const [user, setUser] = useState<User | null>(null);

    const login = (User : User) => {
        setUser(User);
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={ { user, login, logout } }>
            {child}
        </UserContext.Provider>
    )

    }

