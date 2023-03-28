import { Buffer } from 'buffer'
import { useNavigate } from 'react-router-dom'

const tokenName = 'user-token'

//get the token from local storage
export const getToken = () => localStorage.getItem(tokenName)

//set the token in local storage
export const setToken = (token) => localStorage.setItem(tokenName, token)

// decode the payload
export const getPayload = () => {
  const token = getToken()
  // console.log('Token --->', token)
  if (!token) return false
  const splitToken = token.split('.')
  const payloadString = splitToken[1]
  return JSON.parse(Buffer.from(payloadString, 'base64'))
}

// check the expiration time
export const isAuthenticated = () => {
  const payload = getPayload()
  // console.log('payload --->',payload)
  if (!payload) return false
  const timeNow = Date.now() / 1000
  return (payload.exp > timeNow) ? true : false
}

// remove the token from local storage and navigate to /login
export const handleLogout = (navigate) => {
  localStorage.removeItem(tokenName)
  navigate('/login')
}

export const setHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  }
}

// check if the token payload "sub" matches the post's "addedBy._id"

export const userIsOwner  = (post) => {
  // console.log('entered userIsOwner')
  const payload = getPayload()
  // console.log('Payload', payload)
  if (!payload) return false
  if (post){
    const ownerId = post.owner ? post.owner.id : null
    const addedById = post.addedBy ? post.addedBy._id : null
    return payload.sub === ownerId || payload.sub === addedById

  }
}
