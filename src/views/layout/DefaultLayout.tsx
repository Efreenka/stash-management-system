import { Outlet } from "react-router-dom"
import Header from "../../components/Header"

const DefaultLayout = () => {
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
