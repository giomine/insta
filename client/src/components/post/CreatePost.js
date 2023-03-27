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
    }
  }

  return (
    <div className='form-container'>
      <div className="form-border">
        <form action="" onSubmit={handleSubmit}>
          <h1>Create Post Page</h1>

          <label htmlFor="caption"></label>
          <input type="text" name="caption" placeholder="write caption" value={formFields.caption} onChange={handleChange} />
          
          {/* <label htmlFor="image"></label>
          <input type="text" name="image" placeholder="image upload will go here" value={formFields.image} onChange={handleChange} /> */}

          < ImageUploadField
            setFormFields={setFormFields}
            formFields={formFields}
          />
          
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost