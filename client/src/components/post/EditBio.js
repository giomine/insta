import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditBio = () => {

  const navigate = useNavigate()
  const { id } = useParams()


  const [ formFields, setFormFields] = useState({
    bio: '',
  })

  const [ error, setError ] = useState('')
  const [ newBio, setNewBio ] = useState(null)

  useEffect(() => {
    
    const getBio = async () => {
      try {
        const { data } = await axios.get(`/api/profile/${id}`)
        setNewBio(data.bio)
        console.log(data.bio)
      } catch (error) {
        setError(error)
      }
    }
    getBio()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formFields)
    try {
      await axios.put(`/api/profile/${id}`, formFields)
      navigate('/profile')
    } catch (error) {
      setError(error)
    }
  }

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  return (
    <>
      <div className='form-container'>
        <div className="form-border">
          <form action="" onSubmit={handleSubmit}>
            <h2>Edit bio</h2>

            <label htmlFor="bio">
              <input name='bio' placeholder={newBio} value={formFields.bio} onChange={handleChange} />
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