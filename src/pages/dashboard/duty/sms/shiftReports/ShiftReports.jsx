import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FireOutlined, CheckCircleOutlined, CheckSquareOutlined } from '@ant-design/icons';
import SubHeader from '../../../../../components/SubHeader'
import TabList from '../../../../../components/TabList';
import Btn from '../../../../../components/Btn';
import GeneralInfo from '../../../../../components/GeneralInfo';
import data from '../../../../../utils/db.json'
import FormContainer from '../../../../../components/FormContainer';

const {smsGeneralInfo} = data

const smsDutyEndTabs = [
  {
    title: 'Report - Heat List',
    icon: <FireOutlined />,
    link: "/sms/shiftReports/heatList"
  },
  {
    title: 'Report - Check List',
    icon: <CheckCircleOutlined />,
    link: "/sms/shiftReports/checkList"
  },
  {
    title: 'Report - Verification',
    icon: <CheckSquareOutlined />,
    link: "/sms/shiftReports/verification"
  },
]

const ShiftReports = () => {
  const navigate = useNavigate()
  return (
    <FormContainer className='flex flex-col gap-4'>
      <SubHeader title='SMS - Shift Reports' link='/sms/dutyEnd' />
      <section>
        <GeneralInfo data={smsGeneralInfo} />
      </section>
      <section>
        <TabList tabList={smsDutyEndTabs} />
      </section>
      <section className='flex-1 flex justify-center items-end'>
        <Btn onClick={() => navigate(-1)}> Go Back </Btn>
      </section>


    </FormContainer>
  )
}

export default ShiftReports
