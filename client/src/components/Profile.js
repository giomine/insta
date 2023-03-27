import DisplayPosts from './post/DisplayPosts.js'
import { getToken } from '../helpers/auth.js'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

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
          <div className='homepage'>
            <div className='profile-top'>
              <div className='profile-picture'></div>
              <div className='profile-right'>
                <div className='username'>{userInfo.username}</div>
                <div className='bio'>Bio Quisquam obcaecati sint tempora, facilis.</div>
                <button onClick={handleClick}>Create new post</button>
              </div>
            </div>
          
            {userInfo.posts.length > 0 ?
              userInfo.posts.map(post => {
                const { _id, caption, image, owner } = post
                // console.log(_id, caption, image, owner.username)
                return (
                  <DisplayPosts 
                    key={_id}
                    username={userInfo.username}
                    image={image}
                    caption={caption}
                  />
                )
              })
              : <>Error</> 
            }
          </div>
        </>
        : 'Please log in!'
      }
    </>
  )
}

export default Profile