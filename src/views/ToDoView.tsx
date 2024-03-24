import { useState, useEffect } from "react"
import TextField from '@mui/material/TextField'
import { FormControl } from '@mui/material'
import useApi from "../hooks/useApi"
import { AddToDoRequest, ToDo } from "../types/Api"

const ToDoView = () => {
    const [toDoProducts, setToDoProducts] = useState<ToDo[]>([])
    const [formData, setFormData] = useState<AddToDoRequest>({title: ""})

    const { getToDo, addToDo } = useApi()

    const formSubmit = async (event: any) => {
        event.preventDefault()

        const response = await addToDo(formData)
        if(response) {
            setToDoProducts((prev: ToDo[]) => {
                return [...prev, response]
            }) 
         }
         setFormData({title: ""})
    }
  
    useEffect(() => {
        getToDo()
        .then((data) => {
            if(data) {
                setToDoProducts(data)
            }
        })
    }, [])

    return (
        <div className="flex flex-col gap-6 py-14 px-7 items-center">
            <form onSubmit={formSubmit}>
            <FormControl >
                <div className="flex flex-row">
                    <TextField
                        required
                        id="outlined-required"
                        label="Produkt"
                        value={formData.title}
                        onChange={(event) => setFormData({...formData, title: event.target.value})}
                    />

                    <input type="submit" value="Přidat" className="w-14"/>
                </div>
            </FormControl>
            </form>
            <ul className="text-xl pt-6">
                {toDoProducts.map((product) => <li key={product.id} className=" list-disc py-3">{product.title}</li>)}
            </ul>
        </div>
    )
}

export default ToDoView
