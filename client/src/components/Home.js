import DisplayPosts from './post/DisplayPosts.js'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SpinnerComponent from './common/Spinner.js'

const Home = () => {

  const [ posts, setPosts ] = useState([])
  const [ error, setError ] = useState('')

  useEffect(() => {
    const getPosts = async () => {
      try {
        // setTimeout(async () => {
        const response = await axios.get('/api/posts')
        console.log(response.data)
        setPosts(response.data)
        // }, 5000)
      } catch (err) {
        setError(error)
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
              <Link key={_id} to={`/posts/${_id}`}>
                <DisplayPosts 
                  // key={_id}
                  _id={_id}
                  username={owner.username}
                  image={image}
                  caption={caption}
                />
              </Link>
            )
          })
          : 
          <>
            { error ? 
              <p>{error}</p>
              :
              <SpinnerComponent/>}
          </> 
        }
      </div>
    </>
  )
}

export default Home