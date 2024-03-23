
import { Dispatch, SetStateAction, useState } from "react"
import Stash from "./Stash"
import useModal from "../hooks/useModal"
import Collapse from "./Collapse"
import CreateProductForm from "./CreateProductForm"
import Button from '@mui/material/Button'
import TheModal from "./TheModal"
import { TableType } from "../types/TableType"
import { TableItem } from "../types/TableItem"

interface StashItemProps {
    table: TableType,
    setTables: Dispatch<SetStateAction<TableType[]>>
}

const StashItem = ({table, setTables}: StashItemProps) => {
    // const [formData, setFormData] = useState<TableItem[]>([{name: "", brand: "", weight: 0, expiration: dayjs(new Date())}])
    const { openModal, handleOpen, handleClose } = useModal()

  const handleEdit = (item: TableItem) => {
    handleOpen()
    setEditItem(item)
  }

  const handleCloseEdit = () => {
    handleClose()
    setEditItem(null)
  }
  
  return (
    <Collapse name={table.name}> 
      <Stash table={table} setTables={setTables} edit={handleEdit}/>
      <Button variant="contained" onClick={handleOpen}>Přidat</Button>
        {editItem 
        ? 
        <TheModal open={openModal} close={handleCloseEdit} name={"Upravte produkt: "}>
        <EditProductForm table={table} setTables={setTables} close={handleCloseEdit} editItem={editItem}/>
      </TheModal>
        : 
        <TheModal open={openModal} close={handleClose} name={"Přidejte produkt: "}>
        <CreateProductForm table={table} setTables={setTables} close={handleClose}/>
      </TheModal>
        }   
        
    </Collapse> 
  )
}

export default StashItem
