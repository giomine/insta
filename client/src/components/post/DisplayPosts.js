import { Link } from 'react-router-dom'

const DisplayPosts = ({ _id, userId, link, username, caption, image }) => {


  return (
    <>
      <div className='post-card' key={_id}>
        <div className='username'>
          <Link to={link}><h4>{username}</h4></Link>
        </div>
        <Link key={_id} to={`/posts/${_id}`}><div className='post-image' style={{ backgroundImage: `url('${image}')` }}></div></Link>
        <div className="thing">
          <div className='caption'>{caption}</div>
        </div>
      </div>
    </>
  )
}

export default DisplayPosts