

import { useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//Components

import Home from './components/Home.js'
import Profile from './components/Profile.js'
import EditBio from './components/post/EditBio.js'
import CreatePost from './components/post/CreatePost.js'
import DeletePost from './components/post/DeletePost.js'
// import DisplayPosts from './components/post/DisplayPosts.js'
import EditPost from './components/post/EditPost.js'
import SinglePost from './components/post/SinglePost.js'
import Login from './components/auth/Login.js'
import Register from './components/auth/Register.js'
// import Error from './components/common/Error.js'
import PageNavbar from './components/common/PageNavbar.js'
import PageNotFound from './components/common/PageNotFound.js'
import OtherProfiles from './components/OtherProfiles.js'
import Footer from './components/common/Footer.js'
// import Spinner from './components/common/Spinner.js'

const App = () => {
  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get('/api/posts/')
  //   }
  //   getData()
  // })

  return (
    <div className='main-container'>
      <BrowserRouter>
        <PageNavbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id/edit" element={<EditBio />} />
          <Route path="/posts" element={<CreatePost />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/posts/:id" element={<DeletePost />} />
          {/* <Route path="/posts" element={<DisplayPosts />} /> */}
          <Route path="/posts/:id/edit" element={<EditPost />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<OtherProfiles />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
