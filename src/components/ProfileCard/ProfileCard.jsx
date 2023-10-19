import './ProfileCard.css';
import { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { Typography, Carousel, IconButton } from '@material-tailwind/react';
import * as profilesAPI from '../../utilities/profiles-api'
import SwipeButtons from '../SwipeButtons/SwipeButtons';

export default function ProfileCard({setProfile}) {
    const [userProfiles, setUserProfiles] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(0)
    const [matched, setMatched] = useState(false)
    const [currentMatch, setCurrentMatch] = useState({})

    useEffect(function() {
        async function getProfileList() {
            const profileList = await profilesAPI.displayProfiles()
            setUserProfiles(profileList)
            console.log(userProfiles)
            setCurrentIdx(0)
        }
        getProfileList()
    },[])

    async function handleLike() {
        console.log(userProfiles[currentIdx]._id)
        const myProfile = await profilesAPI.sendLike(userProfiles[currentIdx]._id)
        setProfile(myProfile)
        if (userProfiles[currentIdx].likes.includes(myProfile._id)) {
            setMatched(true)
            setCurrentMatch(userProfiles[currentIdx])
            await profilesAPI.sendMatch(userProfiles[currentIdx]._id)
            console.log(myProfile)
        }
        setCurrentIdx(currentIdx+1)
    }

    async function handleDislike() {
        console.log(userProfiles[currentIdx])
        await profilesAPI.sendDislike(userProfiles[currentIdx]._id)
        setCurrentIdx(currentIdx+1)
    }




    async function swiped (direction, nameToDelete) {
        console.log('removing: ' + nameToDelete);
        if (direction === 'right') {
            handleLike()
        }
        if (direction === 'left') {
            handleDislike()
        }
    }

    async function outOfFrame (name) {
        console.log(name + ' left the screen!');
    }

    const profileCards = userProfiles.map((userProfile, idx) => (
        <TinderCard
            className='swipe'
            key={userProfiles.name}
            preventSwipe={['up', 'down']}
            onSwipe={(dir) => swiped(dir, userProfiles.name, idx)}
            onCardLeftScreen={() => outOfFrame(userProfiles.name, idx)}
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
                    {userProfile?.photos?.map((photo, idx) => {
                        return (
                        <img src={photo} alt='' className='h-full w-full object-cover'/>
                    )})}
                </Carousel>
                <Typography variant="h2" className='name'><strong>{userProfile.name}</strong> {userProfile.age}</Typography>
                <div className="about-div">
                    <Typography variant="h4">About</Typography>
                    <p>{userProfile.about}</p>
                </div> 
                <div className="goal-div">
                    <Typography variant="h4">Fitness Goal</Typography>
                    <p>{userProfile.fitnessGoal}</p>
                </div>
                <div className="style-div">
                    <Typography variant="h4">Fitness Style</Typography>
                    <p>{userProfile.fitnessStyle}</p>
                </div>
                <div className="level-div">
                    <Typography variant="h4">Fitness Level</Typography>
                    <p>{userProfile.fitnessLevel}</p>
                </div>
            </div>
        </TinderCard>
    ))

    return (
        <>
        <div className='profileCard'>
            <div className="profileContainer">
                {profileCards[currentIdx]}
            </div>
        </div>
        <SwipeButtons handleLike={handleLike} handleDislike={handleDislike}/>
        </>
    )
}
