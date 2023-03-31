import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import DisplayPosts from './post/DisplayPosts'
import axios from 'axios'
import SpinnerComponent from './common/Spinner.js'

const OtherProfiles = () => {

  const { id } = useParams()
  const [ userInfo, setUserInfo ] = useState()
  const [ error, setError ] = useState('')

  useEffect(() => {
    const getProfile = async () => {
      try {
        // setTimeout(async () => {
        const response = await axios.get(`/api/profile/${id}`)
        // console.log('response')
        response.data.posts.reverse()
        setUserInfo(response.data)
        // console.log(response.data)
        // }, 5000)

      } catch (err){
        setError(err)
      }
    }
    getProfile()
  }, [])

  return (
    <>
      <>
        { userInfo ?
        
        
          <> 
            <div className='profile-top'>
              <div style={{ backgroundImage: `url('${userInfo.profilePhoto}')` }} className='profile-picture'></div>
              <div className='profile-right'>
                <div className='profile-username'>{userInfo.username}</div>
                {/* <div className='bio' onClick={handleBio}>{bio}</div> */}
                <div>{userInfo.bio}</div>
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
                  <p>No posts yet!</p>
                </> 

              }
            </div>
            
          </>
          : 
          <>
            {
              error ?
                <p>User not found</p>
                :
                <SpinnerComponent />
            }
          </> 
        }
      </>
    </>
  )
}


export default OtherProfiles