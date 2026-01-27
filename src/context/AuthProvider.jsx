import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [test, setTest] = useState('');

    return (
        <AuthContext.Provider value={{ auth, setAuth, test, setTest }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext