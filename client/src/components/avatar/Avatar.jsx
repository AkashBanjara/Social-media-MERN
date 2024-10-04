 import React from 'react'
import "./Avatar.scss"
import userImg from "../../assets/user.png"

const Avatar = ({src}) => {
  return (
    <div className='Avatar'>
        <img src={src ? src : userImg } alt="user avatar" />

    </div>
  )
}

export default Avatar