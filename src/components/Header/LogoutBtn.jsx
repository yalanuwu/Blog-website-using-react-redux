
import { useDispatch } from 'react-redux'
import authService from '@/appwrite/auth'
import { logout } from '@/redux/authSlice'
import { Button } from '../ui/button'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => { dispatch(logout())})
    }
  return (
    <Button 
        onClick = {logoutHandler}
    >
        Logout
    </Button>
    
  )
}

export default LogoutBtn