import { useState } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material'
import { LoginRequest } from "../types/Api"
import useApi  from "../hooks/useApi"
import { useLogin } from "../context/LoginProvider"

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginRequest>({email: "", password: ""})

    const { loginRequest } = useApi()
    const { login } = useLogin()

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
                id="outlined-required"
                label="Email"
                value={formData.email}
                onChange={(event) => setFormData({...formData, email: event.target.value})}
            />
            <TextField
                required
                id="outlined-required"
                label="Heslo"
                value={formData.password}
                onChange={(event) => setFormData({...formData, password: event.target.value})}
            />

            <Button onClick={handleLogin}>Odeslat</Button>
        </FormControl>
    )
}

export default LoginForm
