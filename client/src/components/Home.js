import DisplayPosts from './post/DisplayPosts.js'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {

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
      <h1>Home Page</h1>
      <div className='homepage'>
        {posts.length > 0 ?
          posts.map(post => {
            const { _id, caption, image, owner } = post
            // console.log(_id, caption, image, owner.username)
            return (
              <DisplayPosts 
                key={_id}
                _id={_id}
                username={owner.username}
                image={image}
                caption={caption}
              />
            )
          })
          : <>Error</> 
        }
      </div>
    </>
  )
}

export default Home