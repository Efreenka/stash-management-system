import { Outlet } from "react-router-dom"
import Header from "../../components/Header"
import { useEffect } from "react"
import { useLogin } from "../../context/LoginProvider"
import useApi from "../../hooks/useApi"

const DefaultLayout = () => {
  const { getUser } = useApi()
  const { setUser, getToken } = useLogin()

  const handleGetUser = async () => {
    const response = await getUser()
    if (response) {
      setUser(response)
    }
  }

  useEffect(() => {
    if(getToken()){
      handleGetUser()
    }
  }, [])
  
  return (
    <div className="m-0 p-0 w-screen h-screen">
        <Header />
        <div className="w-screen md:w-4/5 m-auto">
          <Outlet />
        </div>
    </div>
  )
}

export default DefaultLayout
