import { Link } from 'react-router-dom'

const DisplayPosts = ({ _id, profile, userId, link, username, caption, image }) => {


  return (
    <>
      <div className='post-card' key={_id}>
        <div className='username'>
          <div style={{ backgroundImage: `url('${profile}')` }} className='profile-picture'></div>
          <Link to={link}>
            <h4>{username}</h4>
          </Link>
        </div>
        <Link key={_id} to={`/posts/${_id}`}>
          <div className='post-image' style={{ backgroundImage: `url('${image}')` }}></div>
          <div className="thing">
            <div className='caption'>{caption}</div>
          </div>
        </Link>
      </div>
    </>
  )
}

export default DisplayPosts