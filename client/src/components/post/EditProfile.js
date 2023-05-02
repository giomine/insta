import ProfileUpload from './ProfileUpload.js'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditProfile = () => {

  // ! Photo Upload
  const navigate = useNavigate()
  const { id } = useParams()

  const [ error, setError ] = useState('')
  const [ photo, setPhoto ] = useState('')
  const [ newPhoto, setNewPhoto] = useState({
    image: '',
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    
    const getPhoto = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${id}`)
        setPhoto(data)
        // console.log('getPhoto ->', data)
      } catch (error) {
        setError(error)
      }
    }
    getPhoto()
  }, [])

  // ! Edit bio

  const [ bio, setBio ] = useState('')
  const [ newBio, setNewBio] = useState({
    bio: '',
  })

  useEffect(() => {
    
    const getBio = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${id}/edit`)
        setBio(data)
        // console.log(data)
      } catch (error) {
        setError(error)
      }
    }
    getBio()
  }, [])


  const handleChangeBio = (e) => {
    setNewBio({ bio: e.target.value })
  }

  // ! Sumbit both profile and bio
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(newPhoto)
    try {
      await axios.put(`/api/profile/${id}/edit-picture`, newPhoto)
      await axios.put(`/api/profile/${id}/edit`, newBio)
      navigate('/profile')
    } catch (error) {
      setError(error)
    }
  }

  return (
    <>
      <h1 style={{ marginTop: '30px' }}>Edit profile</h1>
      
      <div className='form-container'>
        <div style={{ marginTop: '-30px' }} className="form-border">

          <form action="" onSubmit={handleSubmit}>
            <h3>Add profile picture</h3>

            <ProfileUpload 
              setFormFields={setNewPhoto}
              formFields={newPhoto}
            />

            

            {error && <p className='text-center'>{error}</p>}

            <h3 style={{ margin: '30px 0 0' }}>Edit bio</h3>

            <label htmlFor="bio">
              <input name='bio' placeholder={bio ? bio : 'Edit bio'} value={newBio.bio} onChange={handleChangeBio} />
            </label>
            
            <button type="submit">Submit</button>
            {error && <p className='text-center'>{error}</p>}
          </form>

        </div>
      </div>
      
    </>
  )
}


export default EditProfile