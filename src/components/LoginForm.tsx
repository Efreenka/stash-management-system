import { useState } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material'
import { LoginRequest } from "../types/Api"
import useApi  from "../hooks/useApi"
import { useLogin } from "../context/LoginProvider"
// import { useCookies } from 'react-cookie'

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginRequest>({email: "", password: ""})
    // const [cookies] = useCookies<string>(['access_token'])
    const { login } = useLogin()

    const { loginRequest } = useApi()
    

    const handleLogin = async () => {
        const response = await loginRequest(formData)
        if (response) {
            login(response)
        }
    }

    return (
        <FormControl className="flex flex-col gap-4">
            <TextField
                required
                label="Email"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({...formData, email: event.target.value})}
            />
            <TextField
                required
                label="Heslo"
                type="password"
                value={formData.password}
                onChange={(event) => setFormData({...formData, password: event.target.value})}
            />

            <Button onClick={handleLogin}>Přihlásit se</Button>
        </FormControl>
    )
}

export default LoginForm
