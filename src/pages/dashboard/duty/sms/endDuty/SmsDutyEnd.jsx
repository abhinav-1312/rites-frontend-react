import React, { useState } from 'react'
import {EditOutlined, FileSearchOutlined, EyeOutlined, PieChartOutlined}from '@ant-design/icons';
import { message } from 'antd';
import FormContainer from '../../../../../components/DKG_FormContainer';
import SubHeader from '../../../../../components/DKG_SubHeader';
import GeneralInfo from '../../../../../components/DKG_GeneralInfo';
import IconBtn from '../../../../../components/DKG_IconBtn';
import TabList from '../../../../../components/DKG_TabList';
import FormBody from '../../../../../components/DKG_FormBody';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import Btn from '../../../../../components/DKG_Btn';
import data from "../../../../../utils/db.json"


const {smsGeneralInfo }=data;

const smsDutyEndTabs = [
  {
    title: 'SMS Summary',
    icon: <FileSearchOutlined />,
    link: "/sms/heatSummary"
  },
  {
    title: 'Bloom Inspection',
    icon: <EyeOutlined />,
    link: "/sms/bloomInspection"
  },
  {
    title: 'Shift Reports',
    icon: <PieChartOutlined />,
    link: "/sms/shiftReports"
  },
]

const SmsDutyEnd = () => {
  const [remarks, setRemarks] = useState('')

  const handleFormSubmit = () => {
    message.success("Duty End Called")
  }
  return (
    <FormContainer className='flex flex-col gap-4 md:gap-8'>
    <SubHeader title='SMS - Duty End' link='/' />
    <GeneralInfo data={smsGeneralInfo}>
        <div className='absolute top-0 right-0'>
          <IconBtn icon={EditOutlined} onClick={() => message.success("Clicked")} />
        </div>
    </GeneralInfo>

      <section>
        <TabList tabList={smsDutyEndTabs} />
      </section>

      <section>
        <FormBody
          initialValues={remarks}
          onFinish={handleFormSubmit}
        >
          <FormInputItem placeholder='Enter Remarks' onChange={(_, value) => setRemarks(value)} name='remarks'/>
            <div className="text-center">
              <Btn htmlType='submit'>End Duty</Btn>
            </div>
        </FormBody>
      </section>
      
    </FormContainer>
  )
}

export default SmsDutyEnd
