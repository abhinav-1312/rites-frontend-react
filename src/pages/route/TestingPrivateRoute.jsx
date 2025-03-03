import { message } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const TestingPrivvateRoute = () => {

    const {dutyId} = useSelector(state => state.qctDuty);

    if(!dutyId){
        message.error("No ongoing Testing duty. Please start a duty.")
    }

  return (
        <Navigate to='/testing/startDuty' />
    // <Navigate to='/qct/startDuty' />
  )
}

export default TestingPrivvateRoute