import { Link } from 'react-router-dom'

const PageNavbar = () => {

  return (
    <>
      <Link to="/"> Home </Link>
      <Link to="/login"> Login </Link>
      <Link to="/register"> Register </Link>
      <Link to="/profile"> Profile </Link>
    </>

  )
}

export default PageNavbar
