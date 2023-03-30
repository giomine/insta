import DisplayPosts from './post/DisplayPosts.js'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SpinnerComponent from './common/Spinner.js'
import { getToken } from '../helpers/auth.js'

const Home = () => {

  const [ posts, setPosts ] = useState([])
  const [ error, setError ] = useState('')

  const [ user, setUser ] = useState('')

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        console.log('response')
        console.log(response.data.username)
        setUser(response.data.username)
        // console.log(response.headers)

      } catch (err){
        setError(err)
        // setError(err)
      }
    }
    getProfile()
  }, [])

  useEffect(() => {
    const getPosts = async () => {
      try {
        // setTimeout(async () => {
        const response = await axios.get('/api/posts')
        console.log(response.data)
        setPosts(response.data)
        // }, 50000)
      } catch (err) {
        setError(err)
      }
    }
    getPosts()
  }, [])

  let linkUrl

  return (
    <>
      <div className='homepage'>
        {posts.length > 0 ?
          posts.map(post => {
            const { _id, caption, image, owner, comments } = post
            // console.log(_id, caption, image, owner.username, comments[0])
            console.log(owner.profilePhoto)
            {user === owner.username ? linkUrl = '/profile' : linkUrl = `/profile/${owner.id}`}
            return (
              <div key={_id}>
                <DisplayPosts 
                  // key={_id}
                  _id={_id}
                  profile={owner.profilePhoto}
                  userId={owner.id}
                  link={linkUrl}
                  username={owner.username}
                  image={image}
                  caption={caption}
                />
                <div className='home-comments'>
                  {comments.length > 0 ? 
                    (
                      <>
                        <div className='home-comments-left'>Comments</div>
                        <div className='home-comments-right'>
                          <>{comments[0].owner.username}</>
                          <>{comments[0].text}</>
                          <>{comments[0].createdAt}</>
                        </div>
                      </>
                    )
                    :                       
                    <>
                      <div className='home-comments-left'>Comments</div>
                      <div className='home-comments-right'>
                        <>Be the first to comment!</>
                      </div>
                    </>
                  }
                </div>
              </div>
            )
          })
          : 
          <>
            { error ? 
              <p>{error && <p className='text-center'>{error.message}</p>}</p>
              :
              <SpinnerComponent/>}
          </> 
        }
      </div>
    </>
  )
}

export default Home