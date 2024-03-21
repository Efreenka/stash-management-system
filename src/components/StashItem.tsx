// import { useState } from "react"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Stash from "./Stash"
import useModal from "../hooks/useModal"
import Collapse from "./Collapse"
import CreateProductForm from "./CreateProductForm"
import EditProductForm from "./EditProductForm"
import Button from '@mui/material/Button'
import TheModal from "./TheModal"
import { TableType } from "../types/TableType"
import { TableItem } from "../types/TableItem"
// import { TableItem } from "../types/TableItem"
// import dayjs from 'dayjs'


interface StashItemProps {
    table: TableType
    setTables: Dispatch<SetStateAction<TableType[]>>
}

const StashItem = ({table, setTables}: StashItemProps) => {
  const [editItem, setEditItem] = useState<TableItem|null>(null)
  
  const { openModal, handleOpen, handleClose } = useModal()

  const handleEdit = (item: TableItem) => {
    handleOpen()
    console.log(item)
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