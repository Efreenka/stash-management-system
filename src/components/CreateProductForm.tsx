import { useState } from "react"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { csCZ } from '@mui/x-date-pickers/locales'

interface CreateProductFormData {
  name: string,
  brand: string,
  weight: number | null,
  expiration: Dayjs | null
}

const CreateProductForm = () => {
  const [formData, setFormData] = useState<CreateProductFormData>({name: "", brand: "", weight: null, expiration: dayjs(new Date())})

  const handleAddProduct = () => {
      
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

      <LocalizationProvider dateAdapter={AdapterDayjs} localeText={csCZ.components.MuiLocalizationProvider.defaultProps.localeText}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DemoItem label="Expirace">
            <DatePicker
              format="DD-MM-YYYY"
              defaultValue={formData.expiration}
            />
            
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
      
      <Button onClick={handleAddProduct}>Vytvořit</Button>
    </FormControl>
  )
}

export default CreateProductForm
