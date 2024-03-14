import { TableType } from "../types/TableType"
import useModal from "../hooks/useModal"
import Button from '@mui/material/Button'
import TheModal from "../components/TheModal"
import AddStahForm from '../components/AddStahForm'
import StashItem from "../components/StashItem"
import LoginForm from "../components/LoginForm"
import { useLogin } from "../context/LoginProvider"
import RegisterForm from '../components/RegisterForm';

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
  const { openModal, handleOpen, handleClose } = useModal()

  const AddStashFormName: string = "Zadejte název tabulky:"

  const { user } = useLogin()
  
  return user ?(
    <div className="flex flex-col gap-6 py-8 px-7 md:items-center">
      <Button variant="contained" className="w-60" onClick={handleOpen}>Vytvořit tabulku</Button>
      <TheModal open={openModal} close={handleClose} name={AddStashFormName}>
        <AddStahForm />
      </TheModal>
      
      {tables.map((table) => <StashItem key={table.id} table={table}/>)}
      
    </div>
  ) : <div>
      <p>Přihlaš se</p>
        <LoginForm />
        <RegisterForm />
    </div>
}

export default TableList
