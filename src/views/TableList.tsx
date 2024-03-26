import { useState, useEffect } from "react"
import { TableType } from "../types/TableType"
import useModal from "../hooks/useModal"
import Button from '@mui/material/Button'
import TheModal from "../components/TheModal"
import AddStahForm from '../components/AddStahForm'
import StashItem from "../components/StashItem"
import { useLogin } from "../context/LoginProvider"
import NotLogin from "./NotLogin"
import useApi from "../hooks/useApi"

const TableList = () => {
  const [tables, setTables] = useState<TableType[]>([])

  const { openModal, handleOpen, handleClose } = useModal()

  const AddStashFormName: string = "Zadejte název tabulky:"

  const { user } = useLogin()

  const { getStash } = useApi()
  
  useEffect(() => {
    document.title = "Tabulky"
    getStash()
    .then((data) => {
      if(data) {
        setTables(data)
      }
    })
  }, [])

  return user ?
  (
    <div className="flex flex-col gap-6 py-14 px-7 md:items-center">
      <Button variant="contained" className="w-60" onClick={handleOpen}>Vytvořit tabulku</Button>
      <TheModal open={openModal} close={handleClose} name={AddStashFormName}>
        <AddStahForm setTables={setTables} close={handleClose}/>
      </TheModal>
      
      {tables.map((table) => <StashItem key={table.id} table={table} setTables={setTables} />)}
    </div>
  ) 
  : 
  <div>
    <NotLogin />
  </div>
}

export default TableList
