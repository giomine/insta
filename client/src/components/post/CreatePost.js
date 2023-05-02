import { useState, useEffect } from 'react'
import ImageUploadField from './ImageUploadField'
import axios from 'axios'
import { getToken } from '../../helpers/auth'
import { useNavigate } from 'react-router-dom'


const CreatePost = () => {

  const navigate = useNavigate()

  const [ formFields, setFormFields ] = useState({
    caption: '',
    image: '',
    owner: '',
  })

  const [ error, setError ] = useState('')

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // console.log(formFields)
      // console.log('new response')
      const response = await axios.post('/api/posts', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      // console.log(response)
      navigate('/')
    } catch (err) {
      // console.log(err)
      setError('Please fill both fields and make sure you are logged in to create a post :)')
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='form-container'>
      <div className="form-border">
        <form action="" onSubmit={handleSubmit}>
          <h2>Create post</h2>

          < ImageUploadField
            setFormFields={setFormFields}
            formFields={formFields}
          />

          <label htmlFor="caption">
            <textarea name='caption' cols="21" rows="2" placeholder="write caption" value={formFields.caption} onChange={handleChange} />
          </label>
          
          <button type="submit">Post</button>
          {error && <p className='text-center'>{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default CreatePost