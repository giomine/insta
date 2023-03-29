import { useState } from 'react'
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
      console.log(formFields)
      console.log('new response')
      const response = await axios.post('/api/posts', formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log(response)
      navigate('/')
    } catch (err) {
      console.log(err)
      setError('Please fill both fields and make sure you are logged in to create a post :)')
    }
  }

  return (
    <div className='form-container'>
      <div className="form-border">
        <form action="" onSubmit={handleSubmit}>
          <h1>Create Post</h1>

          < ImageUploadField
            setFormFields={setFormFields}
            formFields={formFields}
          />

          {/* <label htmlFor="caption"></label> */}
          {/* <input type="text" name="caption" placeholder="write caption" value={formFields.caption} onChange={handleChange} /> */}
          <label htmlFor="caption">
            <textarea name='caption' cols="21" rows="2" placeholder="write caption" value={formFields.caption} onChange={handleChange} />
          </label>
          
          {/* <label htmlFor="image"></label>
          <input type="text" name="image" placeholder="image upload will go here" value={formFields.image} onChange={handleChange} /> */}
          
          <button type="submit">Post</button>
          { error ? <p>{error}</p> : '' }
        </form>
      </div>
    </div>
  )
}

export default CreatePost