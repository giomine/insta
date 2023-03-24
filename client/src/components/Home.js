import DisplayPosts from './post/DisplayPosts.js'

const Home = () => {

  // useEffect(() => {
  // }, [])


  return (
    <>
      <h1>Home Page</h1>
      <div className='homepage'>
        <DisplayPosts />
      </div>
    </>
  )
}

export default Home