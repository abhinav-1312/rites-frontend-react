import React, { useState } from 'react'

import { message } from 'antd'
import SubHeader from '../../../../../components/SubHeader'
import FormBody from '../../../../../components/FormBody'
import FormInputItem from '../../../../../components/FormInputItem'
import FormDropdownItem from '../../../../../components/FormDropdownItem'
import Btn from '../../../../../components/Btn'
import FormContainer from '../../../../../components/FormContainer'
import TextAreaComponent from '../../../../../components/TextAreaComponent'
import data from "../../../../../utils/db.json";
import GeneralInfo from '../../../../../components/GeneralInfo'

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
    <hr className='bg-black' />
    <section>
        <FormBody
            initialValues={formData}
            className=' md:grid md:grid-cols-2 gap-x-8 bloom-inspection-form'
            onFinish={handleFormSubmit}
        >
            <FormInputItem label='Cast Number' name='castNo' onChange={handleChange} />
            <FormInputItem type='number' label='Prime Blooms Count' name='primeBloomsCount' onChange={handleChange} />
            <FormInputItem type='number' label='CO Blooms Count' name='coBloomsCount' onChange={handleChange} />
            <FormDropdownItem label='Bloom Identification' name='bloomIdentification' dropdownArray={bloomIdentificationList} visibleField={'value'} valueField={'key'} onChange={handleChange} />
            <FormInputItem label='Bloom Length' name='bloomLength' onChange={handleChange} />
            <FormInputItem label='Surface Condition' name='surfaceCondition' onChange={handleChange} />
            <FormInputItem type='number' label='Prime Blooms Rejected Count' name='primeBloomsRejectedCount' onChange={handleChange} />
            <FormInputItem type='number' label='CO Blooms Rejected Count' name='coBloomsRejectedCount' onChange={handleChange} />
            <TextAreaComponent label='Remarks' name='remark' onChange={handleChange} className='col-span-2'/>
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
