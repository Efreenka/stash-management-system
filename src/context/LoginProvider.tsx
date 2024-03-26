import { createContext, useContext, useState, PropsWithChildren, Dispatch, SetStateAction } from 'react'
import { LoginResponse, User } from '../types/Api'
import { useCookies } from 'react-cookie'

interface LoginProviderProps {
    user: User | null
    login: (u:LoginResponse) => void
    logout: () => void
    getToken: () => string
    setUser:  Dispatch<SetStateAction<User | null>> 
}

const LoginContext = createContext<LoginProviderProps>({ user: null, login: () => {}, logout: () => {}, getToken: () => 'access_token', setUser: () => {}})
export const useLogin = () => useContext(LoginContext)

const LoginProvider = ({children}: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null)
    const [cookies, setCookie, removeCookie] = useCookies(['access_token'])

    const login = (response: LoginResponse) => {
        console.log(response)
        setUser(response.user)
        setCookie('access_token', response.token, {
            path: '/',
            maxAge: 36000000,
        })
    }

    const logout = () => {
        setUser(null)
        removeCookie("access_token")
    }

    const getToken = () => {
        return cookies.access_token
    }

    return (
        <LoginContext.Provider value={{ user, login, logout, getToken, setUser }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider
