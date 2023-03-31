import { Link } from 'react-router-dom'

const Footer = () => {

  const handleClick = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="footer-container">
      <div className="footer">
        <Link onClick={handleClick} to='/' className="item">&copy; Instasham</Link>
        <Link onClick={handleClick} to='/' className="item">About</Link>
        <Link onClick={handleClick} to='/' className="item">Blog</Link>
        <Link onClick={handleClick} to='/' className="item">Jobs</Link>
        <Link onClick={handleClick} to='/' className="item">Help</Link>
        <Link onClick={handleClick} to='/' className="item">UK</Link>
        <Link target="_blank" to='https://github.com/giomine/insta' className="item">Matea, James, & Giorgia</Link>
      </div>
    </div>
  )
}



export default Footer