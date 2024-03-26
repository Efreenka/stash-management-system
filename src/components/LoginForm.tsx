import { SyntheticEvent, useState } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material'
import { LoginRequest } from "../types/Api"
import useApi  from "../hooks/useApi"
import { useLogin } from "../context/LoginProvider"

const LoginForm = () => {
    const [formData, setFormData] = useState<LoginRequest>({email: "", password: ""})

    const { login } = useLogin()

    const { loginRequest } = useApi()

    const handleLogin = async (event: SyntheticEvent) => {
        event.preventDefault()
        const response = await loginRequest(formData)
        if (response) {
            login(response)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <FormControl className="flex flex-col gap-5">
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

                <Button type="submit" variant="contained">Přihlásit se</Button>
            </FormControl>
        </form>
    )
}

export default LoginForm
