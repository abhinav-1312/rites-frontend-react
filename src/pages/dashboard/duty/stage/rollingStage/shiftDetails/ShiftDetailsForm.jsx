import React, { useState } from "react";
import SubHeader from "../../../../../../components/DKG_SubHeader";
import data from "../../../../../../utils/frontSharedData/VisualInspection/VI.json";
import FormBody from "../../../../../../components/DKG_FormBody";
import { message } from "antd";
import CustomDatePicker from "../../../../../../components/DKG_CustomDatePicker";
import FormDropdownItem from "../../../../../../components/DKG_FormDropdownItem";
import Btn from "../../../../../../components/DKG_Btn";
import FormContainer from "../../../../../../components/DKG_FormContainer";
import { useNavigate } from 'react-router-dom'

const { millList, shiftList, railGradeList, railSectionList } = data;

const ShiftDetailsForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: '', shift: '', mill: '', railGrade: '', railSection: ''
    });

    const handleFormSubmit = () => {
        message.success("Form submission triggered.");
        navigate('/stage/home');
    };

    const handleChange = (fieldName, value) => {
        setFormData((prev) => {
          return {
            ...prev,
            [fieldName]: value,
          };
        });
    };

  return (
    <FormContainer>
        <SubHeader title="Stage - Shift Details" link="/" />

        <FormBody initialValues={formData} onFinish={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-x-2">
                <CustomDatePicker label="Date" name="date" value={formData.date} onChange={handleChange} required />
                <FormDropdownItem label="Shift" name="shift" dropdownArray={shiftList} visibleField="value" valueField="key" onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <FormDropdownItem label='Mill' name='mill' dropdownArray={millList} valueField='key' visibleField='value' onChange={handleChange} required />
                <FormDropdownItem label="Rail Grade" name='railGrade' dropdownArray={railGradeList} visibleField='value' valueField='key' onChange={handleChange} required/>
            </div>

            <div className="grid grid-cols-1 gap-x-2">
                <FormDropdownItem label="Rail Section" name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} required />
            </div>

            <Btn htmlType="submit" className="flex justify-center mx-auto">
                Start Duty
            </Btn>
        </FormBody>
    </FormContainer>
  )
}

export default ShiftDetailsForm