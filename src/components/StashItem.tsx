import { Dispatch, SetStateAction, useState } from "react"
import Stash from "./Stash"
import useModal from "../hooks/useModal"
import Collapse from "./Collapse"
import CreateProductForm from "./CreateProductForm"
import EditProductForm from "./EditProductForm"
import Button from '@mui/material/Button'
import TheModal from "./TheModal"
import { TableType } from "../types/TableType"
import { TableItem } from "../types/TableItem"
import useApi from "../hooks/useApi"

interface StashItemProps {
    table: TableType
    setTables: Dispatch<SetStateAction<TableType[]>>
}

const StashItem = ({table, setTables}: StashItemProps) => {
  const [editItem, setEditItem] = useState<TableItem|null>(null)
  
  const { openModal, handleOpen, handleClose } = useModal()

  const { deleteOneStash, getStash } = useApi()

  const handleEdit = (item: TableItem) => {
    handleOpen()
    setEditItem(item)
  }

  const handleCloseEdit = () => {
    handleClose()
    setEditItem(null)
  }

  const deleteStash = async () => {
    console.log("delete stash")
    if(table.items.length === 0) {
      const response = await deleteOneStash(table.id)
      if(response) {
        const data = await getStash()
        if(data) {
          setTables(data)
        }
      } 
    } else {
      console.log("Nelze smazat plnou tabulku!")
    }
  }

  return (
    <Collapse name={table.name} deleteStash={deleteStash} >
      <div className="flex flex-col gap-5">

      
        <Stash table={table} setTables={setTables} edit={handleEdit}/>
        <Button variant="contained" onClick={handleOpen} sx={{width: "110px"}}>Přidat</Button>
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
      </div>
    </Collapse> 
  )
}

export default StashItem
