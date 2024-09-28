import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoutes";
import LayoutWithDashboard from "./LayoutWithDashboard";
import Login from "../auth/Login";
import PageNotFound from "../pageNotFound/PageNotFound";
import SmsDutyEnd from "../dashboard/duty/sms/endDuty/SmsDutyEnd";
import SmsBloomInspection from "../dashboard/duty/sms/bloomInspection/SmsBloomInspection";
import ShiftReports from "../dashboard/duty/sms/shiftReports/ShiftReports";
import SmsHeatList from "../dashboard/duty/sms/heatList/SmsHeatList";
import SmsCheckList from "../dashboard/duty/sms/checkList/SmsCheckList";
import SmsVerification from "../dashboard/duty/sms/verification/SmsVerification";
import SmsHeatSummary from "../dashboard/duty/sms/heatSummary/SmsHeatSummary";
import VIShiftDetailsForm from "../dashboard/duty/visualInspection/shiftDetails/ShiftDetailsForm";
import Home from "../dashboard/duty/visualInspection/home/Home";
import VIShiftSummary from "../dashboard/duty/visualInspection/shiftSummary/VIShiftSummary";
import VisualInspectionForm from "../dashboard/duty/visualInspection/inspection/VisualInspectionForm";
import StageShiftDetailsForm from "../dashboard/duty/stage/rollingStage/shiftDetails/ShiftDetailsForm";
import StageHome from "../dashboard/duty/stage/rollingStage/home/Home";
import NDTStartDutyForm from "../dashboard/duty/ndt/shiftDetails/StartDutyForm";
import NDTHome from "../dashboard/duty/ndt/home/Home";
import NCalibrationForm from "../dashboard/duty/ndt/calibration/NCalibrationForm";
import NReport from "../dashboard/duty/ndt/report/NReport";
import SmsDutyStartForm from "../dashboard/duty/sms/startDuty/SmsDutyStartForm";

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

            <Route path='/visual'>
              <Route index element={<VIShiftDetailsForm />} />
              <Route path='startDuty' element={<VIShiftDetailsForm />} />
              <Route path='home' element={<Home />} />
              <Route path='inspection' element={<VisualInspectionForm />} />
              <Route path='summary' element={<VIShiftSummary />} />
            </Route>

            <Route path='/stage'>
              <Route index element={<StageShiftDetailsForm />} />
              <Route path='startDuty' element={<StageShiftDetailsForm />} />
              <Route path='home' element={<StageHome />} />
            </Route>

            <Route path='/ndt'>
              <Route index element={<NDTStartDutyForm />} />
              <Route path='startDuty' element={<NDTStartDutyForm />} />
              <Route path='home' element={<NDTHome />} />
              <Route path='calibration' element={<NCalibrationForm  />} />
              <Route path='report' element={<NReport />} />
            </Route>
          </Route>
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />

      </Routes> */}

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<LayoutWithDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="/sms">
              <Route index element={<SmsDutyStartForm />} />
              <Route path="heatSummary" element={<SmsHeatSummary />} />
              <Route path="dutyStart" element={<SmsDutyStartForm />} />
              <Route path="dutyEnd" element={<SmsDutyEnd />} />
              <Route path="bloomInspection" element={<SmsBloomInspection />} />
              <Route path="shiftReports">
                <Route index element={<ShiftReports />} />
                <Route path="heatList" element={<SmsHeatList />} />
                <Route path="checkList" element={<SmsCheckList />} />
                <Route path="verification" element={<SmsVerification />} />
              </Route>
            </Route>

            <Route path="/visual">
              <Route index element={<VIShiftDetailsForm />} />
              <Route path="startDuty" element={<VIShiftDetailsForm />} />
              <Route path="home" element={<Home />} />
              <Route path="inspection" element={<VisualInspectionForm />} />
              <Route path="summary" element={<VIShiftSummary />} />
            </Route>

            <Route path="/ndt">
              <Route index element={<NDTStartDutyForm />} />
              <Route path="startDuty" element={<NDTStartDutyForm />} />
              <Route path="home" element={<NDTHome />} />
              <Route path="calibration" element={<NCalibrationForm />} />
              <Route path="report" element={<NReport />} />
            </Route>

            <Route path="/stage">
              <Route index element={<StageShiftDetailsForm />} />
              <Route path="startDuty" element={<StageShiftDetailsForm />} />
              <Route path="home" element={<StageHome />} />
            </Route>
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
