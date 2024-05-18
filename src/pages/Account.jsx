import React from 'react'
import SavedShow from '../components/SavedShow'

const Account = () => {
  return (
    <>
    <div className='w-full text-white'>
    <img className=' w-full h-[400px] object-cover' src='https://assets.nflxext.com/ffe/siteui/vlv3/41c789f0-7df5-4219-94c6-c66fe500590a/34c6507d-e8e8-4585-867f-704036b8353b/VN-en-20240513-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='/' />
    <div className='bg-black/60 fixed top-0 left-0 w-full h-[550px]'></div>
    <div className='absolute top-[20%] p-4 md:p-8'>
      <h1 className='text-3xl md:text-5xl font-bold'>My Shows</h1>
    </div>
    </div>
    <SavedShow />
    </>
  )
}

export default Account
