import { useNavigate, useParams } from 'react-router-dom'
import { setHeaders } from '../../helpers/auth'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { isAuthenticated, userIsOwner } from '../../helpers/auth'

const EditPost = () => {

  //!Location variables
  const navigate = useNavigate()
  const { id } = useParams()

  //!State
  const [ formFields, setFormFields] = useState({
    caption: '',
    image: '',
  })

  const [error, setError ] = useState('')
  const [posts, setPosts] = useState(null)


  //!On Mount
  useEffect(() => {

    // (!isAuthenticated() || !userIsOwner(posts)) && navigate(`/posts/${id}`)
    
    const getPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${id}`)
        setFormFields(data)
        setPosts(data)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  }, [id, navigate])

  //!Execution

  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log('Changes submitted!')
    try {
      const { data } = await axios.put(`/api/posts/${id}`, formFields, setHeaders())
      // console.log('Response Data --> ', data)
      navigate(`/posts/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value })
    setError('')
  }

  //! Return
  return (
    <>
      {posts && isAuthenticated() && userIsOwner(posts) ?
        <main className="form-page">
          <div className="form-border">
            <form action="" onSubmit={handleSubmit}>
              <h1>Edit Post</h1>
              <label htmlFor="caption"></label>
              <input type="text" name="caption" placeholder="write caption" value={formFields.caption} onChange={handleChange} />
              <button type="submit">Submit</button>
              { error ? <p>{error}</p> : '' }
            </form>
          </div>
        </main>
        :
        <>
          {posts && !userIsOwner(posts) && !isAuthenticated() &&
            <p>You are not authenticated. Please log in to edit this post  </p>
          }
          {posts && !userIsOwner(posts) && isAuthenticated() &&
            <p>You are not the owner of this post. You cannot edit it </p>
          }
          { posts && <button onClick={() => navigate('/')}>Go Back to Home </button>}
        </>
      }
    </>

  )
}

export default EditPost