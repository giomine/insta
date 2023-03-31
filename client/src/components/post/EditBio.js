import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditBio = () => {

  const navigate = useNavigate()
  const { id } = useParams()

  const [ error, setError ] = useState('')
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(newBio)
    try {
      await axios.put(`/api/profile/${id}/edit`, newBio)
      navigate('/profile')
    } catch (error) {
      setError(error)
    }
  }

  const handleChange = (e) => {
    setNewBio({ bio: e.target.value })
  }

  return (
    <>
      <div className='form-container'>
        <div className="form-border">
          <form action="" onSubmit={handleSubmit}>
            <h2>Edit bio</h2>

            <label htmlFor="bio">
              <input name='bio' placeholder={bio} value={newBio.bio} onChange={handleChange} />
            </label>
            
            <button type="submit">Submit</button>
            {error && <p className='text-center'>{error}</p>}
          </form>
        </div>
      </div>
    </>

  )
}

export default EditBio