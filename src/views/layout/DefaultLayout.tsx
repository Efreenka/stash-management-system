import { Outlet } from "react-router-dom"
import Header from "../../components/Header"

const DefaultLayout = () => {
  return (
    <>
        <Header />
        <div className="w-screen md:w-4/5 m-auto h-screen">
          <Outlet />
        </div>
    </>
  )
}

export default DefaultLayout
