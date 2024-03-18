import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableType } from '../types/TableType'

interface StashProps {
  table: TableType
}

const Stash = ({table: {items}}: StashProps) => {
  // sx={{
  //   display: 'flex',
  //   flexDirection: { xs: 'column', sm: 'row' },
  //   gap: 2,
  // }}

  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Název produktu</TableCell>
            <TableCell align="center">Značka</TableCell>
            <TableCell align="center">Váha&nbsp;(g)</TableCell>
            <TableCell align="center">Expirace</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row" width="150">
                {item.name}
              </TableCell>
              <TableCell align="center">{item.brand}</TableCell>
              <TableCell align="center">{item.weight}</TableCell>
              <TableCell align="center">{item.expiration}</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Stash