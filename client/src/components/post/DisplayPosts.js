const DisplayPosts = ({ _id, username, caption, image }) => {

  return (
    <>
      <div className='post-card' key={_id}>
        <div className='username'>
          <div className="profile-picture"></div>
          <h4>{username}</h4>
        </div>
        <div className='post-image' style={{ backgroundImage: `url('${image}')` }}></div>
        {/* <div className="thing">
          <div className="username">{username}</div>
          <div className="caption">{caption}</div>
        </div> */}
        <div className="thing">
          <div className='caption'>{caption}</div>
        </div>
      </div>
    </>
  )
}

export default DisplayPosts