import { useState, Dispatch, SetStateAction, useEffect, SyntheticEvent, ChangeEvent } from "react"
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
import { MemoryProducts } from "../types/Api"
import Autocomplete  from "@mui/material/Autocomplete"

interface CreateProductFormProps {
  table: TableType
  setTables: Dispatch<SetStateAction<TableType[]>>
  close: () => void
}

const CreateProductForm = ({table, setTables, close}: CreateProductFormProps) => {
  const [formData, setFormData] = useState<TableItem>({name: "", quantity: 1, brand: "", weight: 0, expiration: dayjs(), warning_days: 1})
  const [memoryData, setMemoryData] = useState<MemoryProducts>({brands: [], names: []})

  const { addProduct, getMemoryProducts } = useApi()

  const handleAddProduct = async (event: SyntheticEvent) => {
    event.preventDefault()
    const allItems: TableItem[] = [...table.items, formData]
    const response: TableItem[] | undefined = await addProduct(table.id, allItems)
    table.items = response!

    if(response) {
      setTables((prev) => {
        const index: number = prev.findIndex((t) => {
          return t.id === table.id
        })
        prev.splice(index, 1, table)
        return [...prev]
      })
      close()
    }
  } 

  useEffect(() => {
    getMemoryProducts()
      .then((data) => {
        if(data) {
          setMemoryData(data)
        }
      })
  }, [])

  return (
    <form onSubmit={handleAddProduct}>
      <FormControl className="flex flex-col gap-4">
        <Autocomplete
          freeSolo
          options={memoryData.names}
          value={formData.name}
          onChange={(_event, newValue) => {
            if(newValue) {
              setFormData({...formData, name: newValue})
            }
          }}
    
          renderInput={(params) => (
            <TextField 
              {...params} 
              required 
              label="Název Produktu" 
              variant="outlined"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: event.target.value})}
            />
          )}
        />

        <TextField
          required
          label="Množství"
          type="number"
          inputProps={{ min: 1, max: 10000000 }}
          value={formData.quantity}
          onChange={(event) => setFormData({...formData, quantity: parseInt(event.target.value)})}
        />

        <Autocomplete
          freeSolo
          options={memoryData.brands}
          value={formData.brand}
          onChange={(_event, newValue) => {
            if(newValue) {
              setFormData({...formData, brand: newValue})
            }
          }}
    
          renderInput={(params) => (
            <TextField {...params} required label="Značka produktu" variant="outlined" 
            onChange={(event) => setFormData({...formData, brand: event.target.value})}
            />
          )}
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
                defaultValue={formData.expiration}
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
        
        <Button variant="contained" sx={{width: "100px", alignSelf:"center"}} type="submit" >Přidat</Button>
      </FormControl>
    </form>
  )
}

export default CreateProductForm
