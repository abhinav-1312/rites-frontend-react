import React, { useState } from "react";
import SubHeader from "../../../../../../components/DKG_SubHeader";
import FormContainer from "../../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../../components/DKG_GeneralInfo";
import data from "../../../../../../utils/frontSharedData/rollingStage/Stage.json";
import TabList from "../../../../../../components/DKG_TabList";
import stageHomeTabs from "../../../../../../utils/frontSharedData/rollingStage/StageHome";
import { message, Divider } from 'antd';
import FormBody from "../../../../../../components/DKG_FormBody";
import FormInputItem from "../../../../../../components/DKG_FormInputItem";
import Btn from "../../../../../../components/DKG_Btn";
import { useNavigate } from 'react-router-dom'

const { rollingStageGeneralInfo } = data;

const Home = () => {
    const navigate = useNavigate();
    const [remarks, setRemarks] = useState('')

    const handleFormSubmit = () => {
        message.success("Duty End Called")
        navigate('/')
    }

  return (
    <FormContainer>
        <SubHeader title="Stage - Home" link="/stage/home" />
        <GeneralInfo data={rollingStageGeneralInfo} />

        <section className="mt-6">
            <TabList tabList={stageHomeTabs} />
        </section>

        <Divider className="mt-6 mb-1" />

        <FormBody initialValues={remarks} onFinish={handleFormSubmit}>
            <FormInputItem placeholder='Enter Remarks' onChange={(_, value) => setRemarks(value)} name='remarks' required/>
            <div className='flex justify-center'>
                <Btn htmlType='submit' className='w-36'>End Duty</Btn>
            </div>
        </FormBody>
    </FormContainer>
  )
}

export default Home