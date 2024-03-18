import { useState, Dispatch, SetStateAction } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material'
import dayjs from 'dayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useCookies } from 'react-cookie'
import useApi from "../hooks/useApi"
import { TableItem } from "../types/TableItem"
import { TableType } from "../types/TableType"

interface CreateProductFormProps {
  table: TableType
  setTables: Dispatch<SetStateAction<TableType[]>>
  close: () => void
}

const CreateProductForm = ({table, setTables, close}: CreateProductFormProps) => {
  const [formData, setFormData] = useState<TableItem>({name: "", brand: "", weight: 0, expiration: "2013-03-31T14:32:22Z"})

  const [cookies] = useCookies<string>(['access_token'])

  const { addProduct } = useApi(cookies.access_token)

  const handleAddProduct = async () => {
    const allItems = [...table.items, formData]
    const response = await addProduct(table.id, allItems)
    table.items = allItems


    
    if(response) {
      setTables((prev) => {
        const index = prev.findIndex((t) => {
          return t.id === table.id
        })
        console.log(index)
        prev.splice(index, 1, table)
        console.log(prev)
        return prev
      })
      close()
    }
  }  

  return (
    <FormControl className="flex flex-col gap-4">
      <TextField
          required
          id="outlined-required"
          label="Název produktu"
          value={formData.name}
          onChange={(event) => setFormData({...formData, name: event.target.value})}
      />
      <TextField
          required
          id="outlined-required"
          label="Značka produktu"
          value={formData.brand}
          onChange={(event) => setFormData({...formData, brand: event.target.value})}
      />
    
      <TextField
          required
          id="outlined-required, formatted-numberformat-input"
          label="Váha produktu"
          type="number"
          inputProps={{ min: 0, max: 10000000 }}
          value={formData.weight}
          onChange={(event) => setFormData({...formData, weight: parseInt(event.target.value)})}
      />

      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DemoItem label="Expirace">
            <DatePicker
              format="DD-MM-YYYY"
              defaultValue={formData.expiration}
            />
            
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider> */}
      
      <Button onClick={handleAddProduct}>Vytvořit</Button>
    </FormControl>
  )
}

export default CreateProductForm
