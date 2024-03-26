import { useState, Dispatch, SetStateAction, SyntheticEvent } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material'
import dayjs from 'dayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import useApi from "../hooks/useApi"
import { TableItem } from "../types/TableItem"
import { TableType } from "../types/TableType"

interface CreateProductFormProps {
  table: TableType
  setTables: Dispatch<SetStateAction<TableType[]>>
  close: () => void
  editItem: TableItem
}

const CreateProductForm = ({table, setTables, close, editItem}: CreateProductFormProps) => {
  const [formData, setFormData] = useState<TableItem>(editItem)

  const { addProduct } = useApi()

  const handleEditProduct = async (event: SyntheticEvent) => {
    event.preventDefault()
    const index = table.items.findIndex((i) => {
        return i.id === editItem.id
    })

    table.items.splice(index, 1, formData)

    const response: TableItem[] | undefined = await addProduct(table.id, table.items)
    
    table.items = response!
    
    if(response) {
      setTables((prev) => {
        const index = prev.findIndex((t) => {
          return t.id === table.id
        })
        
        prev.splice(index, 1, table)
        return [...prev]
      })
      close()
    }
  }  

  return (
    <form onSubmit={handleEditProduct}>
      <FormControl className="flex flex-col gap-4">
        <TextField
          required
          label="Název produktu"
          value={formData.name}
          onChange={(event) => setFormData({...formData, name: event.target.value})}
        />

        <TextField
          required
          label="Množství"
          type="number"
          inputProps={{ min: 1, max: 10000000 }}
          value={formData.quantity}
          onChange={(event) => setFormData({...formData, quantity: parseInt(event.target.value)})}
        />  

        <TextField
          required
          label="Značka produktu"
          value={formData.brand}
          onChange={(event) => setFormData({...formData, brand: event.target.value})}
        />
      
        <TextField
          required
          label="Váha produktu&nbsp;(g)"
          type="number"
          inputProps={{ min: 0, max: 10000000 }}
          value={formData.weight}
          onChange={(event) => setFormData({...formData, weight: parseInt(event.target.value)})}
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DemoItem label="Expirace">
              <DatePicker
                format="DD. MM. YYYY"
                defaultValue={dayjs(formData.expiration)}
                onChange={(value) => setFormData({...formData, expiration: dayjs(value)})}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>

        <TextField
          required
          label="Varování&nbsp;(dny)"
          type="number"
          inputProps={{ min: 1, max: 10000000 }}
          value={formData.warning_days}
          onChange={(event) => setFormData({...formData, warning_days: parseInt(event.target.value)})}
        />
        
        <Button type="submit">Upravit</Button>
      </FormControl>
    </form>
  )
}

export default CreateProductForm
