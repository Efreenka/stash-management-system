import { TableType } from "../types/TableType"
import useModal from "../hooks/useModal"
import Collapse from "../components/Collapse"
import Button from '@mui/material/Button'
import TheModal from "../components/TheModal"
import Stash from "../components/Stash"
import AddStahForm from '../components/AddStahForm'

const tables: TableType[] = [{
  id: 1,
  name: "tabulka",
  items: [{id: 1,
    name: "Skořice",
    brand: "Vitana",
    weight: 250,
    expiration: 2}]
  },
  {
    id: 2,
    name: "tabulka2",
    items: []  
  }]

const TableList = () => {
  const { openModal, handleOpen, handleClose} = useModal()

  const AddStashFormName: string = "Zadejte název tabulky:"
  
  return (
    <div className="flex flex-col gap-6 py-8 px-7">
      <Button variant="contained" className="w-60" onClick={handleOpen}>Vytvořit tabulku</Button>
      <TheModal open={openModal} close={handleClose} name={AddStashFormName}>
        <AddStahForm />
      </TheModal>
      
      {tables.map((table) => {
        return(
          <Collapse key={table.id}> 
            <Stash table={table}/>
            <Button variant="contained">Přidat</Button> 
          </Collapse>
        )
      })}
      
    </div>
  )
}

export default TableList
