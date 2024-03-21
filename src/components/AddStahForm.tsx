import { Dispatch, SetStateAction, useState } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material'
import useApi from "../hooks/useApi"
import { AddStashFormDataRequest } from "../types/Api"
import { TableType } from "../types/TableType"

interface AddStashFormDataProps {
    setTables: Dispatch<SetStateAction<TableType[]>>
    close: () => void
}

const AddStahForm = ({setTables, close}: AddStashFormDataProps) => {
    const [formData, setFormData] = useState<AddStashFormDataRequest>({name: ""})

    const { addStash } = useApi()

    const handleAddStash = async () => {
        const response = await addStash(formData)
        if(response) {
            setTables((prev: TableType[]) => {
                return [...prev, response]
            })
            close()
        }
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
