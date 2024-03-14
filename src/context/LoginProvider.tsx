import { createContext, useContext, useState, useEffect, PropsWithChildren } from 'react'
import { LoginResponse } from '../types/Api'

interface LoginProviderProps {
    auth: boolean
    user: LoginResponse | null
    login: (u:LoginResponse) => void
    logout: () => void
}

const LoginContext = createContext<LoginProviderProps>({auth: false, user: null, login: () => {}, logout: () => {}})
export const useLogin = () => useContext(LoginContext)

const LoginProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState<LoginResponse | null>(null)
    const [auth, setAuth] = useState<boolean>(false)

    const login = (u: LoginResponse) => {
        console.log(u)
        setUser(u)
        setAuth(true)
    }

    const logout = () => {
        setUser(null)
        setAuth(false)
    }

    return (
        <LoginContext.Provider value={{ auth, user, login, logout }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider