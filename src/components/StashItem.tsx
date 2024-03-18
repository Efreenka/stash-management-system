// import { useState } from "react"
import { Dispatch, SetStateAction } from "react"
import Stash from "./Stash"
import useModal from "../hooks/useModal"
import Collapse from "./Collapse"
import CreateProductForm from "./CreateProductForm"
import Button from '@mui/material/Button'
import TheModal from "./TheModal"
import { TableType } from "../types/TableType"
// import { TableItem } from "../types/TableItem"
// import dayjs from 'dayjs'

interface StashItemProps {
    table: TableType,
    setTables: Dispatch<SetStateAction<TableType[]>>
}

const StashItem = ({table, setTables}: StashItemProps) => {
    // const [formData, setFormData] = useState<TableItem[]>([{name: "", brand: "", weight: 0, expiration: dayjs(new Date())}])
    const { openModal, handleOpen, handleClose } = useModal()

  return (
    <Collapse name={table.name}> 
        <Stash table={table}/>
        <Button variant="contained" onClick={handleOpen}>Přidat</Button>
            
        <TheModal open={openModal} close={handleClose} name={"Přidejte produkt: "}>
          <CreateProductForm table={table} setTables={setTables} close={handleClose}/>
        </TheModal>
    </Collapse> 
  )
}

export default StashItem