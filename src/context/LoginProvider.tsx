import { createContext, useContext, useState, PropsWithChildren } from 'react'
import { LoginResponse } from '../types/Api'

interface LoginProviderProps {
    user: LoginResponse | null
    login: (u:LoginResponse) => void
    logout: () => void
}

const LoginContext = createContext<LoginProviderProps>({ user: null, login: () => {}, logout: () => {}})
export const useLogin = () => useContext(LoginContext)

const LoginProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState<LoginResponse | null>(null)

    const login = (u: LoginResponse) => {
        console.log(u)
        setUser(u)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <LoginContext.Provider value={{ user, login, logout }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider