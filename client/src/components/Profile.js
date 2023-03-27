import DisplayPosts from './post/DisplayPosts.js'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/posts')
  }

  return (
    <>
      {/* <h1>Profile Page</h1> */}
      <div className='homepage'>
        <div className='profile-top'>
          <div className='profile-picture'></div>
          <div className='profile-right'>
            <div className='username'>Username</div>
            <div className='bio'>Bio Quisquam obcaecati sint tempora, facilis.</div>
            <button onClick={handleClick}>Create new post</button>
          </div>
        </div>
      
        <DisplayPosts />
      </div>
    </>
  )
}

export default Profile