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
import WarningIcon from '@mui/icons-material/Warning'
import useApi from "../hooks/useApi"
import { TableItem } from "../types/TableItem"

interface StashProps {
  table: TableType
  setTables: Dispatch<SetStateAction<TableType[]>>
  edit: (item: TableItem) => void
}
// table: {items}

const Stash = ({table, setTables, edit}: StashProps) => {
  // sx={{
  //   display: 'flex',
  //   flexDirection: { xs: 'column', sm: 'row' },
  //   gap: 2,
  // }}

  const { addProduct } = useApi()

  
  
  const handleDelete = async(item: any) => {
    const newItems = table.items.filter((i) => {
      return i.id !== item.id
    })
    
    const response: TableItem[] | undefined = await addProduct(table.id, newItems)
    table.items = newItems
    
    if(response) {
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
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="center"></TableCell>
            <TableCell align="center">Název produktu</TableCell>
            <TableCell align="center">Značka</TableCell>
            <TableCell align="center">Váha&nbsp;(g)</TableCell>
            <TableCell align="center">Expirace</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table.items.map((item, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center"><div className=' bg-black w-5 h-5'></div></TableCell>
              <TableCell align="center" component="th" scope="row" width="150">
                {item.name}
              </TableCell>
              <TableCell align="center">{item.brand}</TableCell>
              <TableCell align="center">{item.weight}</TableCell>
              <TableCell align="center">{item.expiration}</TableCell>
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
                <Tooltip
                  title={
                    <p>
                      <Typography color="inherit">Tooltip with HTML</Typography>
                      <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                      {"It's very engaging. Right?"}
                    </p>
                  }
                >
                  <IconButton>
                    <WarningIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Stash