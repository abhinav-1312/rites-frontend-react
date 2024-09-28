import React, { useState } from "react";
import SubHeader from "../../../../../components/DKG_SubHeader";
import FormContainer from "../../../../../components/DKG_FormContainer";
import GeneralInfo from "../../../../../components/DKG_GeneralInfo";
import data from "../../../../../utils/frontSharedData/ndt/ndt.json";
import { message, Divider, Checkbox } from 'antd';
import FormBody from "../../../../../components/DKG_FormBody";
import FormInputItem from "../../../../../components/DKG_FormInputItem";
import Btn from "../../../../../components/DKG_Btn";
import { useNavigate } from 'react-router-dom'
import CustomTimePicker from "../../../../../components/DKG_CustomTimePicker"
import { PlusOutlined }from '@ant-design/icons';
import IconBtn from '../../../../../components/DKG_IconBtn';

const { ndtGeneralInfo, checkBoxItems } = data;

const NCalibrationForm = () => {
  const [checkedValues, setCheckedValues] = useState([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    {
      dataList: [
        {
          checkedValues: [], calTime: '', calSpeed: '', rclRep: '', remarks: ''
        }
      ],
      shiftRemarks: ''
    }
  );

  const handleChange = (fieldName, value) => {
    setFormData(prev => {
      return {
        ...prev,
        [fieldName]: value
      }
    })
  }

  const handleFormSubmit = () => {
    navigate('/ndt/home')
    message.success('Form Submit Called')
  }

  const handleAddCalibrationFields = () => {
    setFormData(prev => {
      return {
        ...prev,
        dataList: [
          ...prev.dataList,
          { checkedValues: [], calTime: '', calSpeed: '', rclRep: '', remarks: '' }
        ]
      }
    });

    setCheckedValues(checkedValues);
  };

  const handleNDTRoundValueChange = (index, fieldName, value) => {
    setFormData(prev => {
      const prevDataList = [...prev.dataList]
      prevDataList[index][fieldName] = value
      return {
        ...prev, 
        dataList: [...prevDataList]
      }
    });

    setCheckedValues(checkedValues)
  };

  return (
    <FormContainer>
        <SubHeader title="NDT - Calibration" link="/ndt/home" />
        <GeneralInfo data={ndtGeneralInfo} />

        <FormBody initialValues={formData} onFinish={handleFormSubmit} >
            {
            formData.dataList.map((record, index) => (
                <>                    
                    <div className='flex flex-col flex-wrap mt-4' key={index}>
                        {/* <section className='grid grid-cols-1'>
                            <Checkbox.Group
                                options={checkBoxItems.map(item => ({key: item.key, label: item.value, value: item.key }))}
                                value={checkedValues}
                                onChange={(fieldName, value) => handleNDTRoundValueChange(checkedValues, index, fieldName, value)}
                                className='mb-6'
                            />
                        </section> */}

                        <div className="grid grid-cols-2 gap-x-2">
                            <CustomTimePicker label='Cal. Completion Time' name='calTime' key={record.id} value={formData?.calTime} onChange={(fieldName, value) => handleNDTRoundValueChange(index, fieldName, value)} required />
                            <FormInputItem label='Calibration Speed (m/s)' name='calSpeed' key={record.id} value={formData.calSpeed} onChange={(fieldName, value) => handleNDTRoundValueChange(index, fieldName, value)} required/>
                        </div>

                        <div className="grid grid-cols-2 gap-x-2">
                            <FormInputItem label='RCL Rep.' name='rclRep' key={record.id} value={formData.rclRep} onChange={(fieldName, value) => handleNDTRoundValueChange(index, fieldName, value)} required/>
                            <FormInputItem label='Remarks for this round' key={record.id} placeholder='Enter Remarks' onChange={(fieldName, value) => handleNDTRoundValueChange(index, fieldName, value)} name='remarks' required/>
                        </div>
                    </div>
                </>
            ))
            }
            
            <IconBtn icon={PlusOutlined} text='Add Calibration Round' onClick={handleAddCalibrationFields} />
            
            <Divider />

            <div className='mt-6'>
                <FormInputItem label='Remarks' placeholder='Enter Remarks' onChange={handleChange} name='shiftRemarks' required/>
                <div className='flex justify-center mt-8'>
                    <Btn htmlType='submit'>Save</Btn>
                </div>
            </div>
        </FormBody>
    </FormContainer>
  )
}

export default NCalibrationForm