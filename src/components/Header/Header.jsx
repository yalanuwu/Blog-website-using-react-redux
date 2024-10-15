
import Container from '../container/container'
import Logo from '../logo'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import LogoutBtn from './LogoutBtn'


function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name : 'Home',
      slug : '/',
      active : true
    },
    {
      name : 'Login',
      slug : '/login',
      active : !authStatus
    },
    {
      name : 'Signup',
      slug : '/signup',
      active : !authStatus
    },
    {
      name : 'All Posts',
      slug : '/all-posts',
      active : authStatus
    },
    {
      name : 'Add Post',
      slug : '/add-post',
      active : authStatus
    },
  ]
  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to={'/'}> <Logo /> </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item) => item.active ? (
              <li key={item.name}>
                  <Button onClick={() => navigate(item.slug)} variant="ghost">
                    {item.name}
                  </Button>
              </li>) : null)
            }
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header