import LoginForm from '../components/LoginForm'
import { Navigate, useLocation, Link } from "react-router-dom"
import { useLogin } from "../context/LoginProvider"
import Button from '@mui/material/Button'

const LoginView = () => {
  const { user } = useLogin()
  const location = useLocation()

  return !user ?
  (
    <div className='w-[300px] md:w-[400px] h-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center border-2 pt-7 rounded-md shadow-md'>
      <h1 className='text-4xl'>Přihlášení</h1>
      <div className='m-6 pt-8'>
        <LoginForm />
      </div>
      <Button variant="contained"><Link to="/registrace" >Registrovat se</Link></Button>
    </div>

  )
  :
  (
    <Navigate to={"/tabulky"} replace state={{ path: location.pathname }} />
  )
}

export default LoginView
