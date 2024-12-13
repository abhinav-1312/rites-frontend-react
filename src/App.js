import React, { useEffect } from 'react';
import Routes from './pages/route/Routes';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getOngoingSmsDutyDtls } from './store/slice/smsDutySlice';
import { getOngoingRollingDutyDtls } from './store/slice/rollingDutySlice';
import { getOngoingViDutyDtls } from './store/slice/viDutySlice';

axios.defaults.baseURL="http://localhost:8080"

function App() {
  const dispatch = useDispatch();


  const {token} = useSelector(state => state.auth);

  useEffect(() => {
    if(token){
      dispatch(getOngoingSmsDutyDtls());
      dispatch(getOngoingRollingDutyDtls());
      dispatch(getOngoingViDutyDtls());
    }
  }, [dispatch, token])

  return (
    <Routes />
  );
}

export default App;
