import React, { useState } from 'react'
import FormContainer from '../../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../../components/DKG_SubHeader'
import GeneralInfo from '../../../../../../components/DKG_GeneralInfo'
import data from "../../../../../../utils/frontSharedData/rollingStage/Stage.json";
import FormBody from '../../../../../../components/DKG_FormBody';
import { Divider, message } from 'antd';
import { useNavigate } from 'react-router-dom'
import FormInputItem from '../../../../../../components/DKG_FormInputItem';
import FormDropdownItem from '../../../../../../components/DKG_FormDropdownItem';
import Btn from '../../../../../../components/DKG_Btn';

const { rollingControl60E1GeneralInfo, sampleLocationList, headList, asyList, footToeList, crownProfileList, fishingHeightList, footFlatnessList } = data;

const RollingControl60E1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sampleNumber: '2', heatNumber: '076825', timing: '11:02', height: '', flange: '', weight: '', web: '', head: '', asy: '', footToe: '', crownProfile: '', fishingHeight: '', footFlatness: '', remarks: ''
  });

  const handleChange = (fieldName, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [fieldName]: value,
      };
    });
  };

  const handleFormSubmit = () => {
    message.success("Form submission triggered.");
    navigate('/stage/rollingControl');
  };

  return (
    <FormContainer>
      <SubHeader title="Rolling Control Sample Dimensions - 60E1" link="/stage/rollingControl" />
      <GeneralInfo data={rollingControl60E1GeneralInfo} />

      <FormBody initialValues={formData} onFinish={handleFormSubmit}>
        <div className="grid grid-cols-2 gap-x-2">
          <FormInputItem label='Sample No.' name='sampleNumber' value={formData.sampleNumber} onChange={handleChange} disabled/>
          <FormInputItem label='Heat No.' name='heatNumber' value={formData.heatNumber} onChange={handleChange} required/>
        </div>

        <div className="grid grid-cols-2 gap-x-2">
          <FormInputItem label='Timing' name='timing' value={formData.timing} onChange={handleChange} required/>
          <FormDropdownItem label="Sample Location" name="sampleLocation" dropdownArray={sampleLocationList} visibleField="value" valueField="key" onChange={handleChange} required />
        </div>

        <Divider className='mt-0 mb-4' />

        <div className="grid grid-cols-2 gap-x-2">
          <FormInputItem label='Height' name='height' value={formData.height} onChange={handleChange} required/>
          <FormInputItem label='Flange' name='flange' value={formData.flange} onChange={handleChange} required/>
        </div>

        <div className="grid grid-cols-2 gap-x-2">
          <FormInputItem label='Weight' name='weight' value={formData.weight} onChange={handleChange}/>
          <FormInputItem label='Web (mm)' name='web' value={formData.web} onChange={handleChange} required/>
        </div>

        <div className="grid grid-cols-2 gap-x-2">
          <FormDropdownItem label="Head" name="head" dropdownArray={headList} visibleField="value" valueField="key" onChange={handleChange} required />
          <FormDropdownItem label="Asy" name="asy" dropdownArray={asyList} visibleField="value" valueField="key" onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-x-2">
          <FormDropdownItem label="Foot Toe" name="footToe" dropdownArray={footToeList} visibleField="value" valueField="key" onChange={handleChange} required />
          <FormDropdownItem label="Crown Profile" name="crownProfile" dropdownArray={crownProfileList} visibleField="value" valueField="key" onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-x-2">
          <FormDropdownItem label="Fishing Height" name="fishingHeight" dropdownArray={fishingHeightList} visibleField="value" valueField="key" onChange={handleChange} required />
          <FormDropdownItem label="Foot Flatness" name="footFlatness" dropdownArray={footFlatnessList} visibleField="value" valueField="key" onChange={handleChange} required />
        </div>

        <Divider className='mb-4 mt-0' />

        <FormInputItem label='Remarks' name='remarks' value={formData.remarks} onChange={handleChange} required/>

        <Btn htmlType="submit" className="flex justify-center mx-auto">
          Save
        </Btn>
      </FormBody>
    </FormContainer>
  )
}

export default RollingControl60E1