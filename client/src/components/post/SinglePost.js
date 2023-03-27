import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { isAuthenticated } from '../../helpers/auth'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const SinglePost = () => {

  const [post, setPost] = useState(null)

  const { id } = useParams()
  console.log('Params ---->', id)

  const [formFields, setFormFields] = useState({
    comment: '',
  })

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(`/api/posts/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(`/api/posts/${id}`)
        console.log('data', data)
        setPost(data)
      } catch (err) {
        console.log(err)
      }
    }
    getPost()
  }, [])

  return (
    <main className='single-post-page'>
      <Container>
        <Row>
          {post &&
            <>
              <Col>
                <img src={post.image} alt={post.caption} />
              </Col>
              <Col>
                <h2>{post.owner.username}</h2>
                <h2>{post.caption}</h2>
                <h2>{post.comments}</h2>
              </Col>
            </>
          }
        </Row>
      </Container>
      <h1>Single Post Page</h1>
      <Col as="form" onSubmit={handleSubmit}>
        <label htmlFor="comment">Comment</label>
        <input type="text" name="comment" placeholder="enter a comment here" onChange={handleChange} value={formFields.comment} />
        <button>submit</button>
      </Col>

    </main>

  )
}

export default SinglePost