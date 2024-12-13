import React, { useState, useEffect } from 'react'
import FormContainer from '../../../../../components/DKG_FormContainer'
import SubHeader from '../../../../../components/DKG_SubHeader'
import GeneralInfo from '../../../../../components/DKG_GeneralInfo'
import data from "../../../../../utils/frontSharedData/calibration/calibration.json";
import FormBody from '../../../../../components/DKG_FormBody';
import FormDropdownItem from '../../../../../components/DKG_FormDropdownItem';
import CustomDatePicker from "../../../../../components/DKG_CustomDatePicker"
import { Divider, Table, Form, message } from 'antd';
import Btn from "../../../../../components/DKG_Btn"
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../../../components/DKG_IconBtn';
import { FilterFilled, PlusOutlined } from "@ant-design/icons";
import { apiCall, handleChange } from '../../../../../utils/CommonFunctions';
import { useSelector } from 'react-redux';
import { DeleteOutlined }from '@ant-design/icons';

const { instrumentMapping: sampleData, calibrationGeneralInfo, railSectionList, detailList, serialNumberList, calResultList } = data;

const BulkCalibrationForm = () => {
  const [instrumentCategoryList, setInstrumentCategoryList] = useState([])
  const [instrumentList, setInstrumentList] = useState([]);
  const navigate = useNavigate();
  const [info, setInfo] = useState([
    {
      key: '1',
      serialNumber: '',
    },
  ]);

  const [formData, setFormData] = useState({
    instrumentCategory: null, instrument: null,  detail: null, railSection: null, serialNumber: null, calibrationResult: null, calibrationValidUpto: null,
  })

  const populateData = () => {
    const instrumentCategoryList = Object.keys(sampleData).map(inst => {
      return {
        key: inst,
        value: inst
      }
    })
    setInstrumentCategoryList([...instrumentCategoryList])
  }

  useEffect(()=> {
    populateData()
  }, [populateData])

  const calibrationGeneralInfo = useSelector((state) => state.calibrationDuty);
  const { token } = useSelector((state) => state.auth);

  const [form] = Form.useForm();

  useEffect(()=>{
    if(sampleData[formData.instrumentCategory]){
        const instrumentList = sampleData[formData.instrumentCategory].map(inst => {
        return {
            key: inst,
            value: inst
        }
        })
        setInstrumentList([...instrumentList])
    }
  }, [formData.instrumentCategory, instrumentCategoryList])

  // const handleChange = (fieldName, value) => {
  //   setFormData(prev=>{
  //     return {
  //       ...prev,
  //       [fieldName]: value
  //     }
  //   })
  // }

  const handleAddRow = () => {
    const newRow = {
      key: `${info.length + 1}`,
      serialNumber: '',
    };
    setInfo([...info, newRow]);
  };

  const handleSelectChange = (value, key) => {
    const updatedData = info.map((row) => {
      if (row.key === key) {
        return { ...row, serialNumber: value };
      }
      return row;
    });
    setInfo(updatedData);
  };

  const bulkColumns = [
    {
      title: 'S.No.',
        dataIndex: 'key',
        key: 'key',
        render: (text, record, index) => index + 1,
    },
    {
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      render: (text, record) => (
        <FormDropdownItem name='serialNumber' placeholder='Select serial number' dropdownArray={serialNumberList} visibleField='value' valueField='key' onChange={handleSelectChange} required/>
      )
    }
  ]

  const handleClick = async () => {
    try {
      await apiCall("POST", "/calibration/saveBulkCalibration", token, {
        ...formData,
        dutyId: calibrationGeneralInfo.dutyId
      });
      message.success("Bulk Calibration Data saved succesfully.");
      navigate("/calibration/list");
    } catch (error) {}
  }

  return (
    <FormContainer>
      <SubHeader title='Bulk Re-Calibration List' link='/calibration/list' />
      <GeneralInfo data={calibrationGeneralInfo} />

      <Form initialValues={formData} form={form} layout="vertical">
        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          <div className='flex items-center gap-x-2'>
            <FilterFilled />
            <FormDropdownItem label='Instrument Category' name="instrumentCategory" formField="instrumentCategory" dropdownArray={instrumentCategoryList} valueField='key' visibleField='value' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} className='w-full' required />
          </div>

          <div className='flex items-center gap-x-2'>
            <FilterFilled />         
            <FormDropdownItem label ='Instrument' name='instrument' formField="instrument" dropdownArray={instrumentList} valueField='key' visibleField='value' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} className='w-full' required />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-x-4'>
          {/* <div className='flex items-center gap-x-2'>
            <FilterFilled />
            <FormDropdownItem label ='Instrument Detail' name='instrumentDetail' dropdownArray={detailList} valueField={'key'} visibleField={'value'} onChange = {handleChange} className='w-full' />
          </div> */}
          {
            (formData?.instrumentCategory === 'Gauge (Working)' || formData?.instrumentCategory === 'Gauge (Master)') && 
              <div className='flex items-center gap-x-2'>
                <FilterFilled />
                <FormDropdownItem label='Rail Section' name='railSection' dropdownArray={railSectionList} visibleField='value' valueField='key' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} className='w-full' />
              </div>
          }
        </div>
      </Form>

      <Divider className='mt-0 mb-2' />

      {
        formData?.instrumentCategory != null || formData?.instrument != null
      }

      <Table columns={bulkColumns} dataSource={info} bordered pagination={false} />
      <div className='flex justify-center mt-4'>
        <IconBtn
          icon={PlusOutlined}
          text="Add Row / Instrument"
          className="-mt-4 w-fit"
          onClick={handleAddRow}
        />
      </div>

      <div className='grid grid-cols-1 gap-2'>   
        <FormDropdownItem label ='Cal. Result' name='calibrationResult' formField="calibrationResult" dropdownArray={calResultList} valueField='key' visibleField='value' onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
        {
          (formData?.calibrationResult === 'OK' || formData?.calibrationResult === 'Not OK') && 
          <CustomDatePicker label='Cal. Valid upto Date' name='calibrationValidUpto' defaultValue={formData?.calibrationValidUpto} onChange={(fieldName, value) => handleChange(fieldName, value, setFormData)} required />
        }
      </div>

      <div className='flex justify-center'>
        <Btn onClick={handleClick}>Save</Btn>
      </div>
    </FormContainer>
  )
}

export default BulkCalibrationForm