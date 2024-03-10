import { Outlet } from "react-router-dom"
import Header from "../../components/Header"

const DefaultLayout = () => {
  return (
    <>
        <Header />
        <div>
          <Outlet />
        </div>
    </>
  )
}

export default DefaultLayout
