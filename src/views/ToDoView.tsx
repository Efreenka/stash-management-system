import { useState, useEffect } from "react"
import TextField from '@mui/material/TextField'
import { FormControl } from '@mui/material'
import useApi from "../hooks/useApi"
import { AddToDoRequest, ToDo } from "../types/Api"
import { useLogin } from "../context/LoginProvider"
import NotLogin from "./NotLogin"
import ToDoItem from "../components/ToDoItem"
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

const ToDoView = () => {
    const [toDoProducts, setToDoProducts] = useState<ToDo[]>([])
    const [formData, setFormData] = useState<AddToDoRequest>({title: ""})

    const { getToDo, addToDo } = useApi()

    const { user } = useLogin()

    const formSubmit = async (event: any) => {
        event.preventDefault()

        const response = await addToDo(formData)
        if(response) {
            setToDoProducts((prev: ToDo[]) => {
                return [response, ...prev]
            }) 
         }
         setFormData({title: ""})
    }

    const getToDoProducts = async () => {
        const data = await getToDo()
        if(data) {
            setToDoProducts(data)
        }
    }
  
    useEffect(() => {
        document.title = "Nákupní seznam"
        getToDoProducts()
    }, [])

    return user ? 
    (
        <div className="flex flex-col gap-6 py-14 px-7 items-center">
            <h1 className=" text-3xl md:text-5xl pb-6">Nákupní seznam</h1>
            <Paper elevation={4} variant="outlined">
                <div className=" md:w-[400px] flex flex-col items-center p-7">
                    <form onSubmit={formSubmit}>
                        <FormControl >
                            <div className="flex flex-row gap-4">
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Produkt"
                                    value={formData.title}
                                    onChange={(event) => setFormData({...formData, title: event.target.value})}
                                />
                                <Button variant="contained" type="submit">Přidat</Button>
                            </div>
                        </FormControl>
                    </form>
                    <ul className="text-xl pt-6 self-start md:mx-5  ">
                        {toDoProducts.map((product) => 
                        <ToDoItem key={product.id} product={product} getToDo={getToDoProducts}/>
                        )}
                    </ul>
                </div>
            </Paper>
        </div>
    )
    :
    <div>
        <NotLogin/>
    </div>
}

export default ToDoView
