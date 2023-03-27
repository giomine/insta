import axios from 'axios'

const ImageUploadField = ({ formFields, setFormFields }) => {
  const handleUpload = async (e) => {
    const cloudName = 'duhpvaov2'
    const uploadPreset = 'insta_image'

    const image = e.target.files[0]
    console.log(image)
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', uploadPreset)

    try {
      const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData)
      console.log(data)
      setFormFields({ ...formFields, image: data.secure_url })
    } catch (err) { 
      console.log(err)
    }
  }

  return (
    <div className='field'>
      {/* <label>Image</label> */}
      { formFields.image ? 
        <img style={{ height: '100px' }} src={formFields.image} /> 
        : 
        <input type="file" onChange={handleUpload}/>}
    </div>
  )
}



export default ImageUploadField