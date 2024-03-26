import { Dispatch, SetStateAction } from "react"
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableType } from '../types/TableType'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import useApi from "../hooks/useApi"
import { TableItem } from "../types/TableItem"
import dayjs from 'dayjs'
import { toast } from 'react-toastify'

interface StashProps {
  table: TableType
  setTables: Dispatch<SetStateAction<TableType[]>>
  edit: (item: TableItem) => void
}

const Stash = ({table, setTables, edit}: StashProps) => {

  const { addProduct } = useApi()
  
  const determineWarning = (warningDays: number, expiration: any) => {
    let warningColor = ""
    let warningMessage = ""
    const now = dayjs().format('YYYY-MM-DD')
    const days: number = dayjs(expiration).diff(now, "day")

    const dayBowed = days > 4 ? "dnů" : "dny" 

    if (days > warningDays) {
      warningColor = "green"
      warningMessage = `Produkt expiruje za: ${days} ${dayBowed}!`
    } else if ( warningDays >= days && days > 0) {
      warningColor = "orange"
      warningMessage = `Produkt expiruje za: ${days} ${dayBowed}!`
    } else if (days === 0) {
      warningColor = "red"
      warningMessage = "Produkt expiruje dnes!"
    } else if (days <= -1) {
      warningColor = "black"
      warningMessage = "Expirace již vypršela!"
    }

    return {warningMessage, warningColor}
  }
  
  const handleDelete = async(item: any) => {
    const newItems = table.items.filter((i) => {
      return i.id !== item.id
    })
    
    const response: TableItem[] | undefined = await addProduct(table.id, newItems)
    table.items = newItems
    
    if(response) {
      toast.success("Produkt se podařilo úspěšně smazat!")
      setTables((prev) => {
        const index: number = prev.findIndex((t) => {
          return t.id === table.id
        })
        prev.splice(index, 1, table)
        return [...prev]
      })
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: { xs: 250, sm:700, md: 840 } }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="center"></TableCell>
            <TableCell align="center">Název produktu</TableCell>
            <TableCell align="center">Množství</TableCell>
            <TableCell align="center">Značka</TableCell>
            <TableCell align="center">Váha&nbsp;(g)</TableCell>
            <TableCell align="center">Expirace</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table.items.map((item, index) => {
            const {warningMessage, warningColor} = determineWarning(item.warning_days, dayjs(item.expiration).format('YYYY-MM-DD'))

            return (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">
                  <Tooltip
                      title={
                        <h3>
                          <Typography color="inherit"><b>{warningMessage}</b> </Typography> 
                        </h3>
                      }
                  >
                    <IconButton>
                      <div style={{backgroundColor: warningColor}} className='w-5 h-5'></div>
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell align="center" component="th" scope="row" width="150">
                  {item.name}
                </TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">{item.brand}</TableCell>
                <TableCell align="center">{item.weight}</TableCell>
                <TableCell align="center">{dayjs(item.expiration).format('DD. MM. YYYY')}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Upravit">
                    <IconButton onClick={() => {edit(item)}}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Smazat">
                    <IconButton onClick={() => {handleDelete(item)}}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Stash
