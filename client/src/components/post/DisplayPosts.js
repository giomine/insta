import axios from 'axios'
import { useState, useEffect } from 'react'

const DisplayPosts = () => {

  const [ posts, setPosts ] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get('/api/posts')
        console.log(response.data)
        setPosts(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getPosts()
  }, [])

  return (
    <>
      {posts.length > 0 ?
        posts.map(post => {
          const { _id, caption, image, owner } = post
          // console.log(_id, caption, image, owner.username)
          return (
            <div className='post-card' key={_id}>
              <div className='username'><h4>{owner.username}</h4></div>
              <div className='post-image' style={{ backgroundImage: `url('${image}')` }}></div>
              <div className='caption'>{caption}</div>
            </div>
          )
        })
        : <>Error</> 
      }
    </>
  )
}

export default DisplayPosts