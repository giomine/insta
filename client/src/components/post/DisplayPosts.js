const DisplayPosts = ({ _id, username, caption, image }) => {

  return (
    <>
      <div className='post-card' key={_id}>
        <div className='username'><h4>{username}</h4></div>
        <div className='post-image' style={{ backgroundImage: `url('${image}')` }}></div>
        <div className='caption'>{caption}</div>
      </div>
    </>
  )
}

export default DisplayPosts