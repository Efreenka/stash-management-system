import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { ToDo } from '../types/Api'
import { useEffect, useState } from "react"
import useApi from '../hooks/useApi'

interface ToDoItemProps {
    product: ToDo
    getToDo: () => void
}

const ToDoItem = ({product, getToDo}: ToDoItemProps) => {
    const [checked, setChecked] = useState(false)

    const { deleteToDo } = useApi()

    const handleChange = (event: any) => {
        event.preventDefault()
        setChecked((prev) => !prev)
        
    }

    const handleDeleteToDo = async () => {
        if(checked === true) {
            setTimeout(async () => {
                const response = await deleteToDo(product.id)
                if(response) {
                    getToDo()
                }
            }, 300)
            
        } 
    }

    useEffect(() => {
        handleDeleteToDo()
    }, [checked])

    return (
        <>  
            <li className={`py-3 transition-all duration-300 break-all ${checked ? "translate-x-72 opacity-0" : "translate-x-0 opacity-100"}`}>
                <FormControlLabel control={
                    <Checkbox 
                        checked={checked}
                        onClick={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                } label={product.title} /> 
            </li> 
        </>
    )
}

export default ToDoItem
