import { useState } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material'

interface AddStashFormData {
    name: string
}

const AddStahForm = () => {
    const [formData, setFormData] = useState<AddStashFormData>({name: ""})

    const handleAddStash = () => {
        
    }

    return (
        <FormControl className="flex flex-col gap-4">
            <TextField
                required
                id="outlined-required"
                label="Název tabulky"
                value={formData.name}
                onChange={(event) => setFormData({name: event.target.value})}
            />
            <Button onClick={handleAddStash}>Vytvořit</Button>
        </FormControl>
    )
}

export default AddStahForm
