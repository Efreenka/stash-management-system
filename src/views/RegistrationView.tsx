import { Navigate, useLocation } from "react-router-dom"
import { useLogin } from "../context/LoginProvider"
import RegisterForm from '../components/RegisterForm'
import { useEffect } from "react"

const RegistrationView = () => {
  const { user } = useLogin()
  const location = useLocation()

  useEffect(() => {
    document.title = "Registrace"
  })

  return !user ?
  (
    <div className='w-[300px] md:w-[400px] h-[520px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center border-2 pt-7 rounded-md shadow-md'>
      <h1 className='text-4xl'>Registrace</h1>
      <div className='m-6 pt-8'>
        <RegisterForm />
      </div>
    </div>

  )
  :
  (
    <Navigate to={"/prihlaseni"} replace state={{ path: location.pathname }} />
  )
}

export default RegistrationView
