import DisplayPosts from './post/DisplayPosts.js'
import { getToken } from '../helpers/auth.js'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Profile = () => {

  const navigate = useNavigate()

  const [ userInfo, setUserInfo ] = useState()

  const handleClick = () => {
    navigate('/posts')
  }

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log('response')
        // console.log(response.data)
        setUserInfo(response.data)
        console.log(response.data)
      } catch (err){
        console.log(err)
      }
    }
    getProfile()
  }, [])


  return (
    <>
      {userInfo ? 
        <> 
          <div className='homepage profilepage'>
            <div className='profile-top'>
              <div className='profile-picture'></div>
              <div className='profile-right'>
                <div className='profile-username'>{userInfo.username}</div>
                <div className='bio'>Bio Quisquam obcaecati sint tempora, facilis.</div>
                <button onClick={handleClick}>Create new post</button>
              </div>
            </div>
          
            <div className='photo-center'>
              <div className='photos-wrapper'>
                {userInfo.posts.length > 0 ?
                  userInfo.posts.map(post => {
                    const { _id, caption, image, owner } = post
                    // console.log(_id, caption, image, owner.username)
                    return (
                      <Link key={_id} to={`/api/posts/${_id}`}>
                        <DisplayPosts 
                          key={_id}
                          _id={_id}
                          // username={userInfo.username}
                          image={image}
                          // caption={caption}
                        />
                      </Link>
                    )
                  })
                  : <>Error</> 
                }
              </div>
            </div>

          </div>
        </>
        : 'Please log in!'
      }
    </>
  )
}

export default Profile