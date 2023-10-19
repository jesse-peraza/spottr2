import {useState, useEffect} from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import SwipeButtons from '../../components/SwipeButtons/SwipeButtons';


export default function HomePage({setProfile}) {

  return (
    <>
      <div>
        <ProfileCard setProfile={setProfile}/>
      </div>
    </>
  );
}