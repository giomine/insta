import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <div className="footer-container">
      <div className="footer">
        <Link to='/' className="item">&copy; Instasham</Link>
        <Link to='/' className="item">About</Link>
        <Link to='/' className="item">Blog</Link>
        <Link to='/' className="item">Jobs</Link>
        <Link to='/' className="item">Help</Link>
        <Link to='/' className="item">UK</Link>
        <Link to='/' className="item">Matea, James, & Giorgia</Link>
      </div>
    </div>
  )
}



export default Footer