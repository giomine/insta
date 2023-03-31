import DisplayPosts from './post/DisplayPosts.js'
import { getToken, isAuthenticated } from '../helpers/auth.js'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SpinnerComponent from './common/Spinner.js'

const Profile = () => {

  const navigate = useNavigate()

  const [ userInfo, setUserInfo ] = useState()
  const [ error, setError ] = useState('')

  const handleClick = () => {
    navigate('/posts')
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        // setTimeout(async () => {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        
        const sortedPosts = response.data.posts.reverse()
        setUserInfo(response.data)
        // console.log(response.data)
        // }, 50000)

      } catch (err){
        setError(err)
      }
    }
    getProfile()
  }, [])


  return (
    <>
      { isAuthenticated() ?
        userInfo ?
        
        
          <> 
            <div className='profile-top'>
              <Link to={`/profile/${userInfo.id}/edit-picture`}>
                <div style={{ backgroundImage: `url('${userInfo.profilePhoto}')` }} className='profile-picture'></div>
              </Link>
              <div className='profile-right'>
                <div className='profile-username'>{userInfo.username}</div>
                {/* <div className='bio' onClick={handleBio}>{bio}</div> */}
                <Link to={`/profile/${userInfo.id}/edit`}>
                  <div>{userInfo.bio ? userInfo.bio : 'Edit bio'}</div>
                </Link>
                
                <button onClick={handleClick}>Create new post</button>
              </div>
            </div>
            
            <div className='homepage profilepage'>
              {userInfo.posts.length > 0 ?
                userInfo.posts.map(post => {
                  const { _id, caption, image, owner } = post
                  // console.log(_id, caption, image, owner.username)
                  return (
                    <Link key={_id} to={`/posts/${_id}`}>
                      <DisplayPosts 
                        _id={_id}
                        image={image}
                        // username={userInfo.username}
                        // caption={caption}
                      />
                    </Link>
                  )
                })
                :
                <>
                  <div></div> {/* //! this pushes the message into the center because there are three columns in the grid */}
                  <>
                    <p>No posts yet!</p>
                  </> 
                </>

              }
            </div>
            
          </>
          : 
          <>
            {/* <p>No posts yet</p> */}
            <SpinnerComponent/>
          </> 
        :
        'Please log in!'
      }
    </>
  )
}

export default Profile