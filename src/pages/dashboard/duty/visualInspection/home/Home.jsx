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
import { useDispatch, useSelector } from "react-redux";
import { endViDuty } from '../../../../../store/slice/viDutySlice';
import { handleChange } from "../../../../../utils/CommonFunctions";

const { visualInspectionGeneralInfo } = data;

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({shiftRemarks: null, isChecked: true})

    const handleFormSubmit = async () => {
        await dispatch(endViDuty(formData)).unwrap();
        navigate('/')
    }

    const viGeneralInfo = useSelector(state => state.viDuty);

  return (
    <FormContainer>
        <SubHeader title="Visual - Home" link="/" />
        <GeneralInfo data={viGeneralInfo} />

        <section className="mt-6">
            <TabList tabList={visualHomeTabs} />
        </section>

        <Divider className="mt-0 mb-0" />

        <FormBody initialValues={formData} onFinish={handleFormSubmit}>
            <Checkbox onChange={(field, value) => handleChange(field, value, setFormData)} defaultChecked>Mark right if other IEs confirmation are done</Checkbox>
            
            <Divider className="mt-8" />

            <FormInputItem placeholder='Enter Remarks' onChange={(field, value) => handleChange(field, value, setFormData)} name='shiftRemarks' required/>
            <div className='flex justify-center'>
                <Btn htmlType='submit' className='w-36'>End Duty</Btn>
            </div>
        </FormBody>
    </FormContainer>
  )
}

export default Home