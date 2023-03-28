import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { isAuthenticated, getToken } from '../../helpers/auth'
import { useNavigate } from 'react-router-dom'
import DisplayPosts from './DisplayPosts'


const SinglePost = () => {

  // const navigate = useNavigate()
  const { id } = useParams()
  
  const [posts, setPosts] = useState(null)

  const [formFields, setFormFields] = useState({
    text: '',
    // owner: 'anon',
  })

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    console.log(formFields)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`/api/posts/${id}/comments`, formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${id}`)
        console.log(data)
        setPosts(data)
      } catch (err) {
        console.log(err)
      }
    }
    getPost()
  }, [formFields, posts])

  return (
    <main className='homepage single-post-page'>
      {posts ? 
        <div className='direction'>
          <div className='block1'>
            <DisplayPosts 
              id={posts.id}
              image={posts.image}
            />
          </div>
    
          <div className='block2'>
            <div className='block2-top'>
              <div>{posts.owner.username}</div>
              <div>{posts.caption}</div>
            </div>

            <div className='block2-mid'>
              <h5>Comments</h5>
              {posts.comments.map(comment => {
                const { text, owner, createdAt } = comment
                // console.log(owner.username, text, createdAt)
                return (
                  <div key={posts.id} className='comment'>
                    <div>{owner.username}</div>
                    <div>{text}</div>
                    <div>{createdAt}</div>
                  </div>
                )
              })}
            </div>

            <div className='block2-bottom'>
              <form onSubmit={handleSubmit}>
                <input type="text" name="text" placeholder="enter a comment here" onChange={handleChange} value={formFields.text} />
              </form>
              <Link to={`/api/posts/${id}/edit`}>
                <button>edit</button>
              </Link>
            </div>
          </div>
        </div>
        : <p>error</p>
      }
    </main>

  )
}

export default SinglePost