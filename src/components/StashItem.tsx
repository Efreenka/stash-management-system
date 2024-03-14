import Stash from "./Stash"
import useModal from "../hooks/useModal"
import Collapse from "./Collapse"
import CreateProductForm from "./CreateProductForm"
import Button from '@mui/material/Button'
import TheModal from "./TheModal"
import { TableType } from "../types/TableType"

interface StashItemProps {
    table: TableType
}

const StashItem = ({table}: StashItemProps) => {
    const { openModal, handleOpen, handleClose } = useModal()

  return (
    <Collapse name={table.name}> 
        <Stash table={table}/>
        <Button variant="contained" onClick={handleOpen}>Přidat</Button>
            
        <TheModal open={openModal} close={handleClose} name={"Přidejte produkt: "}>
            <CreateProductForm />
        </TheModal>
    </Collapse> 
  )
}

export default StashItem