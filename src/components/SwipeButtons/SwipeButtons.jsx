import React from 'react'
import './SwipeButtons.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { IconButton } from '@material-tailwind/react'


export default function SwipeButtons({handleLike, handleDislike}) {
  return (
    <div className='swipeButtons'>
        <IconButton className='rounded-full rewind' variant='outlined' ripple={true} size='lg'>
            <FontAwesomeIcon icon={faBackward} style={{color: "#004db3",}} size='xl'/>
        </IconButton> 
        <IconButton className='rounded-full dislike' variant='outlined' ripple={true} size='lg' onClick={handleDislike}>
            <FontAwesomeIcon icon={faXmark} style={{color: "#ff0000",}} size='xl'/>
        </IconButton>
        <IconButton className='rounded-full like' variant='outlined' ripple={true} size='lg' onClick={handleLike}>
            <FontAwesomeIcon icon={faHeart} style={{color: "#00c73c",}} size='xl'/>
        </IconButton>
    </div>
  )
}
