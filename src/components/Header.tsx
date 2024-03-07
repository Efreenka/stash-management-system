import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <>
      <div className=" flex">Header</div>
      <NavLink to="/" >Domů</NavLink>
      <NavLink to="/table" >Tabulky</NavLink>
    </>
    
  )
}

export default Header
