import { useState } from 'react'



const CreatePost = () => {

  const [ formFields, setFormFields ] = useState({
    caption: '',
    image: '',
    owner: '',
  })

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formFields)
  }

  return (
    <div className='form-container'>
      <div className="form-border">
        <h1>Create Post Page</h1>
        <form action="" onSubmit={handleSubmit}>

          <label htmlFor="caption"></label>
          <input type="text" name="caption" placeholder="write caption" value={formFields.caption} onChange={handleChange} />
          
          <label htmlFor="image"></label>
          <input type="text" name="image" placeholder="image upload will go here" value={formFields.image} onChange={handleChange} />
          
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePost