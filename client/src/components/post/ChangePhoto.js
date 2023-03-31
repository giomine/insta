import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ImageUploadField from './ImageUploadField.js'
// import ProfileUpload from './ProfileUpload'

const ChangePhoto = () => {

  const navigate = useNavigate()
  const { id } = useParams()

  const [ error, setError ] = useState('')
  const [ photo, setPhoto ] = useState('')
  const [ newPhoto, setNewPhoto] = useState({
    image: '',
  })

  useEffect(() => {
    
    const getPhoto = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${id}`)
        setPhoto(data)
        console.log('getPhoto ->', data)
      } catch (error) {
        setError(error)
      }
    }
    getPhoto()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(newPhoto)
    try {
      await axios.put(`/api/profile/${id}/edit-picture`, newPhoto)
      navigate('/profile')
    } catch (error) {
      setError(error)
    }
  }

  // const handleChange = (e) => {
  //   setNewPhoto({ newPhoto: e.target.value })
  // }

  return (
    <>
      <div className='form-container'>
        <div className="form-border">
          <form action="" onSubmit={handleSubmit}>
            <h2>Add profile picture</h2>

            <ImageUploadField 
              setFormFields={setNewPhoto}
              formFields={newPhoto}
            />

            {/* <label htmlFor="image">
              <textarea name='image' cols="21" rows="2" placeholder="add new photo" value={newPhoto.profilePhoto} onChange={handleChange} />
            </label> */}

            {/* <img style={{ height: '220px' }} src={newPhoto ? newPhoto : photo.profilePhoto} alt="" /> */}
            
            <button type="submit">Submit</button>
            {error && <p className='text-center'>{error}</p>}
          </form>
        </div>
      </div>
    </>

  )
}

export default ChangePhoto