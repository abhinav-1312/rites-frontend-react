import React, { useState } from 'react'
import { message } from 'antd'
import data from "../../../../../utils/db.json";
import SubHeader from '../../../../../components/DKG_SubHeader'
import GeneralInfo from '../../../../../components/DKG_GeneralInfo'
import FormContainer from '../../../../../components/DKG_FormContainer'
import TextAreaComponent from "../../../../../components/DKG_TextAreaComponent"
import FormBody from '../../../../../components/DKG_FormBody';
import FormInputItem from '../../../../../components/DKG_FormInputItem';
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem';
import Btn from '../../../../../components/DKG_Btn';
import FormNumericInputItem from "../../../../../components/DKG_FormNumericInputItem"

const { smsGeneralInfo } = data;

const bloomIdentificationList = [
    {
        key: 'satisfactory',
        value: 'Satisfactory'
    },
    {
        key: 'unsatisfactory',
        value: 'Unsatisfactory'
    }
]

const SmsBloomInspection = () => {
    const [newHeat, setNewHeat] = useState('')
    const [bloomLength, setBloomLength] = useState('')
    const [formData, setFormData] = useState({
        castNo: '',
        primeBloomsCount: null,
        coBloomsCount: null,
        bloomIdentification: null,
        bloomLength: null,
        surfaceCondition: '',
        primeBloomsRejectedCount: null,
        coBloomsRejectedCount: null,
        remark: ''
    })
    const handleChange = (fieldName, value) => {
        setFormData(prev => {
            return {
                ...prev,
                [fieldName]: value
            }
        })
    }

    const handleFormSubmit = () => {
        message.success('Submit button called.')
    }
  return (
    <FormContainer>
    <SubHeader link={'/sms/dutyEnd'} title='SMS - Bloom Inspection' />
    <GeneralInfo data={smsGeneralInfo} />
    <section>
        <FormBody
            initialValues={formData}
            className=' md:grid md:grid-cols-2 gap-x-8 bloom-inspection-form'
            onFinish={handleFormSubmit}
        >
            <FormNumericInputItem
                label='Cast Number'
                minLength={6}
                maxLength={6}
                value={newHeat}
                onChange={setNewHeat}
                required
            />
            <FormInputItem type='number' label='Prime Blooms Count' name='primeBloomsCount' onChange={handleChange} required />
            <FormInputItem type='number' label='CO Blooms Count' name='coBloomsCount' onChange={handleChange} required />
            <FormDropdownItem label='Bloom Identification' name='bloomIdentification' dropdownArray={bloomIdentificationList} visibleField={'value'} valueField={'key'} onChange={handleChange} required />
            <FormNumericInputItem
                label='Bloom Length'
                value={bloomLength}
                onChange={setBloomLength}
                required
            />
            <FormInputItem label='Surface Condition' name='surfaceCondition' onChange={handleChange} required />
            <FormInputItem type='number' label='Prime Blooms Rejected Count' name='primeBloomsRejectedCount' onChange={handleChange} required />
            <FormInputItem type='number' label='CO Blooms Rejected Count' name='coBloomsRejectedCount' onChange={handleChange} required />
            <TextAreaComponent label='Remarks' name='remark' onChange={handleChange} className='col-span-2' required />
            <div className="text-center">
                <Btn htmlType='submit'>Submit</Btn>
            </div>
        </FormBody>
    </section>
    <section>
    
    </section>
    </FormContainer>
  )
}

export default SmsBloomInspection
