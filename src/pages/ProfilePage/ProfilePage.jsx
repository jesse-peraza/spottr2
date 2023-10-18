import React, {useState, useEffect} from 'react';
import { Carousel, Typography, IconButton } from "@material-tailwind/react";
import TinderCard from 'react-tinder-card';
import * as profilesAPI from '../../utilities/profiles-api'
import './ProfilePage.css'

export default function ProfilePage() {
  const [profile, setProfile] = useState({})

  useEffect(function () {
    async function getCurrentProfile() {
      const currentProfile = await profilesAPI.getProfile()
      setProfile(currentProfile)
    }
    getCurrentProfile()
  }, [])



  return (
    <div className='profileCard'>
      <div className="profileContainer">
        <TinderCard
          className='swipe'
          preventSwipe={['up', 'down', 'left', 'right']}
        >
          <div className='card'>
            <Carousel
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill("").map((_, i) => (
                    <span
                      key={i}
                      className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                        activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                      }`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              )}
              prevArrow={({ handlePrev }) => (
                <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handlePrev}
                className="!absolute top-2/4 left-4 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </IconButton>     
              )}
              nextArrow={({ handleNext }) => (
                <IconButton
                variant="text"
                color="white"
                size="lg"
                onClick={handleNext}
                className="!absolute top-2/4 !right-4 -translate-y-2/4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </IconButton>     
              )}
            >
              {profile?.photos?.map((photo, idx) => {
                return (
                  <img src={photo} alt='' className='h-full w-full object-cover'/>
              )})}
            </Carousel>
            <Typography variant="h2" className='name'><strong>{profile.name}</strong> {profile.age}</Typography>
            <div className="about-div">
              <Typography variant="h4">About</Typography>
              <p>{profile.about}</p>
            </div> 
            <div className="goal-div">
                <Typography variant="h4">Fitness Goal</Typography>
                <p>{profile.fitnessGoal}</p>
            </div>
            <div className="style-div">
                <Typography variant="h4">Fitness Style</Typography>
                <p>{profile.fitnessStyle}</p>
            </div>
            <div className="level-div">
                <Typography variant="h4">fitnessLevel</Typography>
                <p>{profile.fitnessLevel}</p>
            </div>
          </div>
        </TinderCard>
      </div>
    </div>
  )
}
