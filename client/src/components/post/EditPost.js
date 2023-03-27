import { useNavigate, useParams } from 'react-router-dom'
import { setHeaders } from '../../helpers/auth'
import { useState, useEffect } from 'react'
import axios from 'axios'

import { isAuthenticated, userIsOwner } from '../../helpers/auth'

const EditPost = () => {

  //!Location variables
  const navigate = useNavigate()
  const { postId } = useParams()

  //!State
  const [ formFields, setFormFields] = useState({
    caption: '',
    image: '',
  })

  const [error, setError ] = useState('')


  //!On Mount
  useEffect(() => {

    (!isAuthenticated() || !userIsOwner() && navigate(`/api/posts/${postId}`))

    const getPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${postId}`)
        setFormFields(data)
      } catch (error) {
        console.log(error)
      }
    }
    getPost()
  }, [postId, navigate])

  //!Execution

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Changes submitted!')
    try {
      const { data } = await axios.put(`/api/posts/${postId}`, formFields, setHeaders())
      console.log('Response Data --> ', data)
      navigate(`/api/posts/${postId}`)
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

  )
}

export default EditPost