import React from 'react'
import { useSelector } from 'react-redux'

const AuthComponent = () => {
  const auth = useSelector(state => state.auth.isAuth)

  return (
    <div className='w-96 bg-red-800 text-white h-40
    flex flex-col items-center justify-evenly text-xl font-bold rounded-lg
    shadow-red-800/75 shadow-2xl'>
        <p className='bg-white text-red-800 p-4 text-2xl'>You state is {auth ? 'Authenticated' : 'Not Authenticated'}</p>
        <p>
            {auth ? 'Enjoy your dashboard' : 'Please login to access your dashboard' }
        </p>
    </div>
  )
}

export default AuthComponent