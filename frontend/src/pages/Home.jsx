import React from 'react'
import Counter from '../components/Counter'

const Home = () => {
  return (
    <div className='md:h-[calc(100vh-104px)] flex flex-col justify-center'>
        <Counter/>
    </div>
  )
}

export default Home