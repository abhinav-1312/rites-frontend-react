import React, { useState } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import FormContainer from "../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import data from "../../../../../utils/frontSharedData/VisualInspection/VI.json";
import TabList from "../../../../../components/DKG_TabList";
import visualHomeTabs from '../../../../../utils/frontSharedData/VisualInspection/VIHome';
import { message, Checkbox, Divider } from 'antd';
import FormBody from "../../../../../components/DKG_FormBody";
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import Btn from "../../../../../components/DKG_Btn";
import { useNavigate } from 'react-router-dom'

const { visualInspectionGeneralInfo, checkBoxItem } = data;

const Home = () => {
    const navigate = useNavigate();
    const [remarks, setRemarks] = useState('')
    const [checkedValues, setCheckedValues] = useState([])

    const handleFormSubmit = () => {
        message.success("Duty End Called")
        navigate('/')
    }

  return (
    <FormContainer>
        <SubHeader title="Visual - Home" link="/" />
        <GeneralInfo data={visualInspectionGeneralInfo} />

        <section className="mt-6">
            <TabList tabList={visualHomeTabs} />
        </section>

        <Divider className="mt-6 mb-1" />

        <FormBody initialValues={remarks} onFinish={handleFormSubmit}>
            <Checkbox.Group options={checkBoxItem.map(item => ({key: item.key, label: item.value, value: item.key }))} value={checkedValues} onChange={(checkedValues) => setCheckedValues(checkedValues)} />
            
            <Divider />

            <FormInputItem placeholder='Enter Remarks' onChange={(_, value) => setRemarks(value)} name='remarks' required/>
            <div className='flex justify-center'>
                <Btn htmlType='submit' className='w-36'>End Duty</Btn>
            </div>
        </FormBody>
    </FormContainer>
  )
}

export default Home