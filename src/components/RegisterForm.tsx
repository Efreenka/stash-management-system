import { SyntheticEvent, useState } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material'
import { RegisterRequest } from '../types/Api'
import useApi  from "../hooks/useApi"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'

const RegisterForm = () => {
    const [formData, setFormData] = useState<RegisterRequest>({name: "", email: "", password: ""})
    const [passwordVerification, setPasswordVerification] = useState<string>("")
    const [passwordError, setPasswordError] = useState(false)

    const navigate = useNavigate()

    const { registerRequest } = useApi()

    const handleRegistration = async (event: SyntheticEvent) => {
        event.preventDefault()
        if(formData.password === passwordVerification) {
            setPasswordError(false)
            const response = await registerRequest(formData)
            if(response) {
                navigate("/prihlaseni")
            }
            setPasswordVerification("")
            setFormData({name: "", email: "", password: ""})
        } else {
            setPasswordError(true)
            toast.error('Chyba! Vyplňte správně formulář!')
        }
    }

    return (
        <form onSubmit={handleRegistration}>
            <FormControl className="flex flex-col gap-4">
                <TextField
                    required
                    label="Jméno"
                    value={formData.name}
                    onChange={(event) => setFormData({...formData, name: event.target.value})}
                />

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
                    error={passwordError}
                    helperText={passwordError ? "Hesla se musí shodovat" : ""}
                />

                <TextField
                    required
                    label="Znovu heslo"
                    type="password"
                    value={passwordVerification}
                    onChange={(event) => setPasswordVerification(event.target.value)}
                    error={passwordError}
                    helperText={passwordError ? "Hesla se musí shodovat" : ""}
                />

                <Button type="submit">Registrovat se</Button>
            </FormControl>
        </form>
    )
}

export default RegisterForm
