import { useState } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material'
import { RegisterRequest } from '../types/Api'
import useApi  from "../hooks/useApi"


const RegisterForm = () => {
    const [formData, setFormData] = useState<RegisterRequest>({name: "", email: "", password: ""})

    const { registerRequest } = useApi()
    

    const handleRegistration = async () => {
      const response = await registerRequest(formData)
      console.log(response)
    }

    return (
        <FormControl className="flex flex-col gap-4">
            <TextField
                required
                id="outlined-required"
                label="Jméno"
                value={formData.name}
                onChange={(event) => setFormData({...formData, name: event.target.value})}
            />
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

            <Button onClick={handleRegistration}>Registrovat se</Button>
        </FormControl>
    )
}

export default RegisterForm
