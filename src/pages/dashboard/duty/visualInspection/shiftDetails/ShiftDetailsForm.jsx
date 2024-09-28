import React, { useEffect, useState } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import data from "../../../../../utils/frontSharedData/VisualInspection/VI.json";
import FormBody from "../../../../../components/DKG_FormBody";
import { message } from "antd";
import CustomDatePicker from "../../../../../components/DKG_CustomDatePicker";
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import FormDropdownItem from "../../../../../components/DKG_FormDropdownItem";
import Btn from "../../../../../components/DKG_Btn";
import FormContainer from "../../../../../components/DKG_FormContainer";
import { useNavigate } from 'react-router-dom'
import SelectSearch from "../../../../../components/DKG_SelectSearch";

const { millMaping: sampleData, millsMaping: secSampleData, shiftList, railGradeList, railSectionList } = data;

const ShiftDetailsForm = () => {
    const [millDropdownList, setMillDropdownList] = useState([]);
    const [lineNumberDropdownList, setLineNumberDropdownList] = useState([]);
    const [stdRailLengthList, setStdRailLengthList] = useState([])
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: '', shift: '', mill: '', lineNumber: '', railGrade: '', railSection: '', stdRailLength: '', otherIE: '', rclIE: ''
    });

    const populateData = () => {
        const millDropdownList = Object.keys(sampleData).map( mill => {
          return {
            key: mill,
            value: mill
          }
        })
        setMillDropdownList([...millDropdownList])
    }

    useEffect(()=> {
        populateData()
    }, [])
    
    useEffect(()=>{
    if(sampleData[formData.mill]){
        const lineNumberDropdownList = sampleData[formData.mill].map(mill => {
        return {
            key: mill,
            value: mill
        }
        })
        setLineNumberDropdownList([...lineNumberDropdownList])
    }
    }, [formData.mill, millDropdownList])

    const handleFormSubmit = () => {
        message.success("Form submission triggered.");
        navigate('/visual/home');
    };

    useEffect(()=>{
        if(secSampleData[formData.mill]){
          const stdRailLengthList = secSampleData[formData.mill].map(mill => {
            return {
              key: mill,
              value: mill
            }
          })
          setStdRailLengthList([...stdRailLengthList])
        }
    }, [formData.mill, millDropdownList])

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
        <SubHeader title="Visual Inspection - Shift Details" link="/" />

        <FormBody initialValues={formData} onFinish={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-x-2">
                <CustomDatePicker label="Date" name="date" value={formData.date} onChange={handleChange} required />
                <FormDropdownItem label="Shift" name="shift" dropdownArray={shiftList} visibleField="value" valueField="key" onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <FormDropdownItem label='Mill' name='mill' dropdownArray={millDropdownList} valueField={'key'} visibleField={'value'} onChange={handleChange} required />
                <FormDropdownItem label ='Line Number' name='lineNumber' dropdownArray={lineNumberDropdownList} valueField={'key'} visibleField={'value'} onChange = {handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <FormDropdownItem label="Rail Grade" name='railGrade' dropdownArray={railGradeList} visibleField='value' valueField='key' onChange={handleChange} required/>
                <FormDropdownItem label="Rail Section" name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-x-2">
                <FormDropdownItem label="Std. offered Rail Length" name='stdRailLength' dropdownArray={stdRailLengthList} visibleField={'value'} valueField={'key'} onChange={handleChange} required />
                <SelectSearch label='Add Other IE' placeholder='Search a IE' name='otherIE' value={formData.otherIE} onChange={handleChange} required />
            </div>
            
            <FormInputItem label='Add Name of RCL IE' name='rclIE' value={formData.rclIE} onChange={handleChange} required/>
            <Btn htmlType="submit" className="flex justify-center mx-auto">
                Save Inspection Data
            </Btn>
        </FormBody>
    </FormContainer>
  )
}

export default ShiftDetailsForm