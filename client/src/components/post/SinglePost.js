import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isAuthenticated, getToken, userIsOwner } from '../../helpers/auth'
import DisplayPosts from './DisplayPosts'
import SpinnerComponent from '../common/Spinner'


const SinglePost = () => {

  const navigate = useNavigate()
  const { id } = useParams()

  const [posts, setPosts] = useState(null)
  const [ user, setUser ] = useState(null)
  const [ linkUrl, setLinkUrl ] = useState()
  const [error, setError ] = useState('')

  const [formFields, setFormFields] = useState({  //! maybe rename to comment field if thats what this is? 
    text: '',
    // owner: 'anon',
  })

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    console.log(formFields)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`/api/posts/${id}/comments`, formFields, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      formFields.text = ''
    } catch (err) {
      setError(err)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('DELETING')
      navigate('/profile')
    } catch (err) {
      setError(err)
    }
  }

  const getLink = () => {
    try {

      // console.log('both', user, posts.owner.username)
      // user === posts.owner.username ? console.log('match') : console.log('no')
      // linkUrl = (user === posts.owner.username) ? '/profile' : `/profile/${posts.owner.id}`
      setLinkUrl((user === posts.owner.username) ? '/profile' : `/profile/${posts.owner.id}`)
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${id}`)
        // console.log('post owner ---->', data.owner.username)
        setPosts(data)
        getLink()
      } catch (err) {
        setError(err)
      }
    }
    getPost()
  }, [formFields, posts, linkUrl])

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        // console.log(data.username)
        // console.log('user --->', data.username)
        setUser(data.username)
      } catch (err){
        setError(err)
        // setError(err)
      }
    }
    getProfile()
  }, [])


  return (
    <main className='homepage single-post-page'>
      {posts ?
        <div className='direction'>
          <div className='block1'>
            <DisplayPosts
              id={posts.id}
              image={posts.image}
              // link={linkUrl}
              // username={posts.owner.username}
            />
          </div>

          <div className='block2'>
            <div className='block2-top'>
              <div className='single-post-username'>
                <div className='single-post-username'>
                  <div style={{ backgroundImage: `url('${posts.owner.profilePhoto}')` }} className='profile-picture'></div>
                  <Link to={linkUrl}>
                    <h4>{posts.owner.username}</h4>
                  </Link>  
                </div>
                {isAuthenticated() && userIsOwner(posts) &&
                <div className='two'>
                  <Link to={`/posts/${posts._id}/edit`} >
                    <button>Edit</button>
                  </Link>
                  <button onClick={handleDelete}>Delete</button>
                </div>
                }
              </div>
              <div className='single-post-caption'>{posts.caption}</div>
            </div>

            <div className='block2-mid'>
              <h4>Comments</h4>
              {posts.comments.length > 0 ?
                <>
                  {posts.comments.map(comment => {
                    const { text, owner, createdAt } = comment
                    // console.log(owner.username, text, createdAt)
                    return (
                      <div key={posts.id} className='comment'>
                        <div className='single-post-username'><div style={{ backgroundImage: `url('${owner.profilePhoto}')` }}  className='profile-picture'></div><>{owner.username}</></div>
                        <div className='comment-margin'>{text}</div>
                        <div className='comment-margin'>{createdAt.slice(0, 10).split('-').reverse().join('-')}</div>
                      </div>
                    )
                  })}
                </>
                :
                <>Be the first to comment!</>
              }
            </div>

            <div className='block2-bottom'>
              <form onSubmit={handleSubmit}>
                <input type="text" name="text" placeholder={`Leave a comment for ${posts.owner.username}`} onChange={handleChange} value={formFields.text} />
              </form>
              {/* {isAuthenticated() && userIsOwner(posts) &&
                <>
                  <Link to={`/api/posts/${id}/edit`}>
                    <button>edit</button>
                  </Link>
                  <button onClick={handleDelete}>Delete</button>
                </>

              } */}
            </div>
          </div>
        </div>
        : 
        <>
          {
            error ?
              // <p className='text-center'>{error.message}</p>
              <p className='text-center'>Post not found</p>
              :
              <SpinnerComponent />
          }
        </>
      }
    </main>

  )
}

export default SinglePost