import {useState, useEffect} from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import SwipeButtons from '../../components/SwipeButtons/SwipeButtons';


export default function HomePage() {

  return (
    <>
      <div>
        <h1>HomePage</h1>
        <ProfileCard />
        <SwipeButtons />
      </div>
    </>
  );
}