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
      {/* <h1>Home Page</h1> */}
      <div className='homepage'>
        {posts.length > 0 ?
          posts.map(post => {
            const { _id, caption, image, owner, comments } = post
            // console.log(_id, caption, image, owner.username, comments[0])
            // console.log(owner.id)
            return (
              <div key={_id}>
                <DisplayPosts 
                  // key={_id}
                  _id={_id}
                  userId={owner.id}
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