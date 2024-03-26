import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { useEffect } from 'react'

const NotFound = () => {
  useEffect(() => {
    document.title = "Stránka nenalezena"
  })

  return (
    <div className='w-[500px] h-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
      <h1 className='text-7xl'>Not Found</h1>
      <div className='m-6 text-2xl'>
        <p>Tato stránka neexistuje.</p>
        <p className='pb-2'>Přejít na:</p>
        <div className='flex flex-row align-middle justify-center gap-3 mt-2'>
          <Button variant="contained"><Link to="/" >Domů</Link></Button>
          <Button variant="contained"><Link to="/tabulky" >Tabulky</Link></Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
