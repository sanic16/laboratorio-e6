import React from 'react'
import AuthComponent from '../components/AuthComponent'
import ChartJsExample from '../components/ChartJsExample'


const Dashboard = () => {
  return (
    <div className='h-[calc(100vh-104px)] flex items-center justify-center'>
        <AuthComponent/>
        <ChartJsExample/>
    </div>
  )
}

export default Dashboard