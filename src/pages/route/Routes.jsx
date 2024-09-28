import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import Layout from '../../components/CustomLayout'
import Dashboard from '../dashboard/Dashboard'
import Login from '../auth/Login'
import PageNotFound from '../pageNotFound/PageNotFound'
import SmsDutyStartForm from '../dashboard/duty/sms/startDuty/SmsDutyStartForm'
import SmsDutyEnd from '../dashboard/duty/sms/endDuty/SmsDutyEnd'
import SmsBloomInspection from '../dashboard/duty/sms/bloomInspection/SmsBloomInspection'
import ShiftReports from '../dashboard/duty/sms/shiftReports/ShiftReports'
import SmsHeatList from '../dashboard/duty/sms/heatList/SmsHeatList'
import SmsCheckList from '../dashboard/duty/sms/checkList/SmsCheckList'
import SmsVerification from '../dashboard/duty/sms/verification/SmsVerification'
import SmsHeatSummary from '../dashboard/duty/sms/heatSummary/SmsHeatSummary'
import VisualInspectionForm from '../dashboard/duty/visualInspection/VisualInspectionForm'
import {ActiveTabProvider} from '../../context/dashboardActiveTabContext'
import LayoutWithDashboard from './LayoutWithDashboard'

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route element = {<PrivateRoutes />}>
        
          <Route path='/' element={<Layout />} >
            <Route index element={ <Dashboard />} />
            <Route path='/sms'>
              <Route index element={<SmsDutyStartForm />} />
              <Route path='heatSummary' element={<SmsHeatSummary />} />
              <Route path='dutyStart' element={<SmsDutyStartForm />} />
              <Route path='dutyEnd' element={<SmsDutyEnd />} />
              <Route path='bloomInspection' element={<SmsBloomInspection />} />
              <Route path='shiftReports'>
                <Route index element={<ShiftReports />} />
                <Route path='heatList' element={<SmsHeatList />} />
                <Route path='checkList' element={<SmsCheckList />} />
                <Route path='verification' element={<SmsVerification />} />
              </Route>
            </Route>

            <Route path='/visualInspection'>
              <Route path='inspection' element={<VisualInspectionForm />} />
            </Route>
          </Route>
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes>
       */}

<Routes>
    <Route element={<PrivateRoutes />}>
      <Route path='/' element={<LayoutWithDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path='/sms'>
          <Route index element={<SmsDutyStartForm />} />
          <Route path='heatSummary' element={<SmsHeatSummary />} />
          <Route path='dutyStart' element={<SmsDutyStartForm />} />
          <Route path='dutyEnd' element={<SmsDutyEnd />} />
          <Route path='bloomInspection' element={<SmsBloomInspection />} />
          <Route path='shiftReports'>
            <Route index element={<ShiftReports />} />
            <Route path='heatList' element={<SmsHeatList />} />
            <Route path='checkList' element={<SmsCheckList />} />
            <Route path='verification' element={<SmsVerification />} />
          </Route>
        </Route>

        <Route path='/visualInspection'>
          <Route path='inspection' element={<VisualInspectionForm />} />
        </Route>
      </Route>
    </Route>

    <Route path='/login' element={<Login />} />
    <Route path='*' element={<PageNotFound />} />
  </Routes>
    </BrowserRouter>
  )
}

export default RoutesComponent
