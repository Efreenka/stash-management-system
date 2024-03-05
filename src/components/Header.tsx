import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <>
        <div>Header</div>
        <NavLink to="/" >Domů</NavLink>
        <NavLink to="/table/:username" >Tabulky</NavLink>
    </>
    
  )
}

export default Header
