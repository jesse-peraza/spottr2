import React, {useState, useRef} from 'react'
import * as profilesAPI from '../../utilities/profiles-api'
import {Card, Input, Button, Typography, Select, option, Textarea} from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom';

export default function CreateProfilePage({user}) {
  const [formData, setFormData] = useState({
    age: '', 
    gender: '',
    about: '',
    fitnessGoal: '',
    fitnessStyle: '',
    fitnessLevel: ''
})
  const fileInputRef = useRef()
  const [photo, setPhoto] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const MAX_LENGTH = 4;

  function uploadMultipleFiles(evt){
    if (Array.from(evt.target.files).length > MAX_LENGTH) {
      evt.preventDefault();
      alert(`Cannot upload more than ${MAX_LENGTH} photos`);
      fileInputRef.current.value = ''
      return;
    } 
    setPhoto(evt.target.files)
    console.log(evt.target.files)
  }

  function handleChange(evt) {
    setFormData({...formData, [evt.target.name]: evt.target.value})
    console.log(formData)
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    console.log(formData)
    try {
      const newProfileData = {...formData, user: user._id}
      const profile = await profilesAPI.createProfile({data: formData, user: user._id})
      const photoFormData = new FormData();
      let photoArr = []
      console.log(photo)
      for (let i=0; i < photo.length; i ++) {
        photoFormData.append('photo', photo[i]);
      }
      const newPhoto = await profilesAPI.uploadPhoto(photoFormData);
      navigate('/')
    } catch(err) {
      console.log(err)
      setError('Creation Failed - Try Again')
    }
  }

  return (
    <div className="pfp-container">
    <Card color="transparent" shadow={false}>
      <Typography variant='h3' color='black'>
        Create Your Profile
      </Typography>
      <Typography variant='h5' color='gray'>
        Let's get to know you.
      </Typography>
      <form autoComplete='off' className="mt-8 mb-2 pfp-form" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-6">
          <Input type="text" name="name" label="Name" value={formData.name} onChange={handleChange} required/>
          <Input type="number" name="age" label="Age" min={'18'} value={formData.age} onChange={handleChange} required/>
          <select variant="outlined" label="select Gender" name="gender" value={formData.gender} onChange={handleChange}>
            <option>Choose Gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
          <Textarea variant="outlined" label="About You" name="about" value={formData.about} onChange={handleChange} required/>
          <select variant="outlined" label="Fitness Goal" name="fitnessGoal" value={formData.fitnessGoal} onChange={handleChange}>
            <option>Choose Fitness Goal</option>
            <option value="Figuring it out!">Figuring it out!</option>
            <option value="Training for functionality">Training for functionality</option >
            <option value="Getting stronger">Getting stronger</option>
            <option value="Getting big">Getting big</option>
            <option value="Getting lean">Getting lean</option>
            <option value="Endurance">Endurance</option>
          </select>
          <select variant="outlined" label="Fitness Style" name="fitnessStyle" value={formData.fitnessStyle} onChange={handleChange}>
            <option>Choose Fitness Style</option>
            <option value="Running">Running</option>
            <option value="Bodybuilding">Bodybuilding</option>
            <option value="Powerlifting">Powerlifting</option>
            <option value="Cross-Training">Cross-Training</option>
            <option value="All around">All around</option>
          </select>
          <select variant="outlined" label="Fitness Level" name="fitnessLevel" value={formData.fitnessLevel} onChange={handleChange}>
            <option>Choose Fitness Level</option>
            <option value="Getting started">Getting started</option>
            <option value="Novice">Novice</option>
            <option value="1-3 years experience">1-3 years experience</option>
            <option value="3+ years experience">3+ years experience</option>
          </select>
          <div class="flex items-center justify-center w-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" 
                type="file"
                class="hidden"
                ref={fileInputRef}
                onChange={(e) => uploadMultipleFiles(e)} 
                accept=".jpg,.jpeg,.png,.heif,.heifs.heic,.heics.avci,.avcs.avif,.HIF"
                multiple required
              />
            </label>
          </div> 
        </div>
        <Button className="mt-6" color="blue" type="submit">Create Profile</Button>
      </form>
      <p>{error}</p>
    </Card>
    </div>
  )
}

