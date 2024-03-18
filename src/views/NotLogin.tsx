import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

const NotLogin = () => {
  return (
    <div className='w-[500px] h-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
      <h1 className='text-5xl'>Nejste přihlášen!</h1>
      <div className='m-6 text-2xl'>
        <p className='pb-2'>Přejít na:</p>
        <div className='flex flex-row align-middle justify-center gap-3 mt-2'>
          <Button variant="contained"><Link to="/prihlaseni" >Přihlásit se</Link></Button>
          <Button variant="contained"><Link to="/registrace" >Registrovat se</Link></Button>
        </div>
      </div>
    </div>
  )
}

export default NotLogin
