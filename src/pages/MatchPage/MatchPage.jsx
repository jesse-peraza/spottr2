import React, {useState, useEffect} from 'react'
import { Typography, IconButton, Avatar, List, ListItem, ListItemPrefix, Card } from '@material-tailwind/react'
import './MatchPage.css'
import * as profilesAPI from '../../utilities/profiles-api'

export default function MatchPage({closeDrawerRight}) {

  const [matches, setMatches] = useState([])
  const [hasMatches, setHasMatches] = useState(false)

  useEffect( function() {
    async function displayMatches() {
      const fetchMatches = await profilesAPI.getMatches()
      setMatches(fetchMatches)
      console.log(fetchMatches)
      if (fetchMatches.length) setHasMatches(true)
    }
    displayMatches()
  }, [])

const matchList = matches.map((match, idx) => {
  <ListItem>
    <ListItemPrefix>
      <Avatar variant="circular" alt="pfp" src={match.photos[0]} />
    </ListItemPrefix>
    <Typography variant="h6" color="blue-gray">
      {match.name}
    </Typography>
    <Typography variant="small" color="gray" className="font-normal">
      {match.age}
    </Typography>
  </ListItem>
})

  return (
    <>
      <>
      <div className="mb-6 flex items-center justify-between heading-container">
        <div className="match-subhead pl-10">
          <Typography variant="h5" color="blue-gray">
            Matches
          </Typography>
        </div>
        <div className="message-subhead">
          <Typography variant="h5" color="blue-gray">
            Messages
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={closeDrawerRight}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      </>
      <Card className='w-96'>
        <List>
        { hasMatches? matchList :
          <ListItem>
            <Typography>
              No Matches Yet!
            </Typography>
          </ListItem>
        }
        </List>
      </Card>
    </>
  )
}
